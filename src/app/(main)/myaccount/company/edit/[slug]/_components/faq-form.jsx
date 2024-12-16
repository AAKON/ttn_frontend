"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

import Button from "@/components/shared/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formLabelClasses, inputClasses } from "@/utils/input-style";
import { Textarea } from "@/components/ui/textarea";
import { DeleteIcon } from "@/icons";

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-50";
const textareaStyle =
  inputClasses + " " + "h-9 bg-gray-50 resize-none !h-auto min-h-[154px]";

const formSchema = z.object({
  questionAnswers: z.array(
    z.object({
      question: z.string().min(1, { message: "Question is required" }),
      answer: z.string().min(1, { message: "Answer is required" }),
    })
  ),
});

const FaqForm = () => {
  const [existingQuestions, setExistingQuestions] = useState([]);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionAnswers: [{ question: "", answer: "" }],
    },
  });

  const { control, handleSubmit } = form;

  const { fields, append } = useFieldArray({
    control,
    name: "questionAnswers",
  });

  const onSubmit = async (data) => {
    console.log("Submitted FAQ Data:", data);
    toast({ description: "FAQ saved successfully." });
  };

  // Add new card to existing questions
  const handleDone = () => {
    const data = form.getValues("questionAnswers");

    // Check if all fields have valid values
    const isValid = data.every(
      (item) => item.question.trim() !== "" && item.answer.trim() !== ""
    );

    if (!isValid) {
      toast({
        description: "Please fill in all questions and answers before adding.",
        variant: "destructive",
      });
      return;
    }

    // Add valid data to the existing questions list
    setExistingQuestions((prev) => [...prev, ...data]);
    form.reset({ questionAnswers: [{ question: "", answer: "" }] });
  };

  // Remove a specific card from the list
  const handleRemoveCard = (index) => {
    setExistingQuestions((prev) =>
      prev.filter((_, cardIndex) => cardIndex !== index)
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-3 lg:gap-3">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1">
              <h4 className="text-md font-medium pb-6 text-gray-900">
                Question #{index + 1}
              </h4>
              {/* Question Field */}
              <FormField
                control={control}
                name={`questionAnswers.${index}.question`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyle}>Question</FormLabel>
                    <FormControl>
                      <Input
                        className={inputStyle}
                        placeholder="Enter your question"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Answer Field */}
              <FormField
                control={control}
                name={`questionAnswers.${index}.answer`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyle}>Answer</FormLabel>
                    <FormControl>
                      <Textarea
                        className={textareaStyle}
                        placeholder="Enter the answer"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        {/* Add and Done Buttons */}
        <div className="flex justify-end">
          <Button secondary className="h-9 w-[200px]" type="button" onClick={handleDone}>
            Done
          </Button>
        </div>

        {/* Existing Questions */}
        <div>
          <p className="text-sm text-gray-900 pb-4">Existing Questions</p>
          <ul className="grid grid-cols-1 gap-4">
            {existingQuestions.map((item, index) => (
              <li key={index}>
                <h6 className="grid grid-cols-[1fr_auto] gap-2">
                  <span className="text-md font-medium pb-2 text-gray-900">
                    {item.question}
                  </span>
                  <Button
                    secondary
                    className="size-7 !p-1 !rounded-none border-none"
                    type="button"
                    onClick={() => handleRemoveCard(index)}
                  >
                    <DeleteIcon stroke="#F04438" />
                  </Button>
                </h6>
                <p className="text-gray-500">{item.answer}</p>
              </li>
            ))}
          </ul>
        </div>

      </form>
    </Form>
  );
};

export default FaqForm;
