"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import React, {useEffect, useState} from "react";

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
import {companyFaqReq, delCompanyFaq, getCompanyFaqs} from "@/services/company";
import {Loader2} from "lucide-react";
import ConfirmDeleteDialogSm from "@/app/(main)/myaccount/company/edit/[slug]/_components/confirmDeleteDialogSm";
import FaqSkeleton from "@/components/shared/skelton/FaqMakerSkeleton";

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-50";
const textareaStyle =
  inputClasses + " " + "h-9 bg-gray-50 resize-none !h-auto min-h-[154px]";

const formSchema = z.object({
    question: z.string().min(3, { message: "Question is required" }),
    answer: z.string().min(3, { message: "Answer is required" }),
});

const FaqForm = ({slug}) => {
    const [loading, setLoading] = useState(false);
    const [faqData, setFaqData] = useState(null);
    const [error, setError] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        question: "", answer: ""
    },
  });

  const { control, setValue, reset, handleSubmit } = form;

    const fetchFaqs = async () => {
        try {
            setLoading(true);
            const response = await getCompanyFaqs(slug);
            setFaqData(response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, [slug]);


  const onSubmit = async (data) => {
      setLoading(true);
      const { question, answer  } = data;
      const formData = new FormData();
      formData.append("question", question);
      formData.append("answer", answer);

      try {
          const result = await companyFaqReq(slug, formData, toast);

          if (result.status && result.code === 200) {
              reset();
              fetchFaqs();
          }
      } catch (error) {
          console.log("Error in create :: faq", error.message);
      } finally {
          setLoading(false);
      }

  };

  // Remove a specific card from the list

    const handleRemove = async (id) => {
        setIsDeleting(true);
        try {
            const response = await delCompanyFaq(id, slug, toast);
            if (response) {
                setOpenDialog(false);
                fetchFaqs();
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsDeleting(false);
        }
    };


  return (
      <div className="space-y-4">
          <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 gap-3 lg:gap-3">
                      <div className="grid grid-cols-1 gap-3">
                          <h4 className="text-md font-medium pb-2 text-gray-900">
                              Question
                          </h4>
                          {/* Question Field */}
                          <FormField
                              control={control}
                              name="question"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel className={labelStyle}>Question</FormLabel>
                                      <FormControl>
                                          <Input
                                              className={inputStyle}
                                              placeholder="Enter question"
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
                              name="answer"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel className={labelStyle}>Answer</FormLabel>
                                      <FormControl>
                                          <Textarea
                                              className={textareaStyle}
                                              placeholder="Enter answer"
                                              type="text"
                                              {...field}
                                          />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                      </div>
                  </div>

                  {/* Add and Done Buttons */}
                  <div className="flex justify-end">
                      <Button type="submit" secondary className="h-9 w-[200px]" disabled={loading}>
                          {loading ? (
                              <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Please wait
                              </>
                          ) : (
                              "Done"
                          )}
                      </Button>
                  </div>
              </form>
          </Form>

          {/* Existing Questions */}
          {loading ? (
                <FaqSkeleton />
          ) : (
              <>
                  {faqData && Array.isArray(faqData) && faqData.length > 0 && (
                      <div>
                          <p className="text-sm text-gray-900 pb-4">Existing Questions</p>
                          <ul className="grid grid-cols-1 gap-4">
                              {faqData.map((item) => (
                                  <li key={item?.id}>
                                      <h6 className="grid grid-cols-[1fr_auto] gap-2">
                    <span className="text-md font-medium pb-2 text-gray-900">
                      {item?.question}
                    </span>
                                          <ConfirmDeleteDialogSm
                                              open={openDialog}
                                              setOpen={setOpenDialog}
                                              onConfirm={() => handleRemove(item?.id)}
                                              isDeleting={isDeleting}
                                          />
                                      </h6>
                                      <p className="text-gray-500">{item?.answer}</p>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  )}
              </>
          )}
      </div>
  );
};

export default FaqForm;
