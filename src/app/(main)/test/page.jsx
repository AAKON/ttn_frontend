"use client";
import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import Button from "@/components/shared/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formLabelClasses, inputClasses } from "@/utils/input-style";

// Define Zod Schema
const schema = z.object({
  groups: z.array(
    z.object({
      select: z.string().min(1, "Required"),
      text: z.string().min(1, "Required"),
    })
  ),
});

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " h-9 bg-gray-50";

const RepeatableInputGroup = () => {
  const form = useForm({
    defaultValues: { groups: [{ select: "", text: "" }] },
    resolver: zodResolver(schema),
  });

  const { control, handleSubmit, formState } = form;
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "groups",
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center space-x-4">
            {/* Select Input */}
            <FormField
              control={control}
              name={`groups.${index}.select`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>Select</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="focus:ring-0 focus:ring-offset-0 text-gray-900 h-9 font-normal bg-gray-50">
                        <SelectValue
                          placeholder="Select Option"
                          className="text-gray-400 font-normal text-sm"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage>
                    {errors.groups?.[index]?.select?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* Text Input */}
            <FormField
              control={control}
              name={`groups.${index}.text`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>Text</FormLabel>
                  <FormControl>
                    <Input
                      className={inputStyle}
                      placeholder="Enter text"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {errors.groups?.[index]?.text?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* Delete Button */}
            <Button variant="destructive" onClick={() => remove(index)}>
              Delete
            </Button>
          </div>
        ))}

        {/* Add New Group Button */}
        <Button
          type="button"
          onClick={() =>
            append({
              select: "",
              text: "",
            })
          }
        >
          Add New Group
        </Button>

        {/* Submit Button */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default RepeatableInputGroup;
