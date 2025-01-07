"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
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
import Button from "@/components/shared/button";
import { DeleteIcon } from "@/icons";
import { DropdownSelect } from "./dropdown-select";

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-50";

const formSchema = z.object({
  countries: z
    .array(
      z.object({
        country: z.string().nonempty({ message: "Select a country." }),
        percentage: z.string().nonempty({ message: "Enter a percentage." }),
      })
    )
    .min(1, { message: "At least one row is required." }),
});

const BusinessInsightForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      countries: [{ country: "", percentage: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "countries",
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr_36px]"
          >
            {/* Country Field */}
            <FormField
              control={form.control}
              name={`countries.${index}.country`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>Country</FormLabel>
                  <FormControl>
                    <DropdownSelect
                      {...field}
                      className={inputStyle}
                      placeholder={"Select a country"}
                      data={["Australia", "New Zealand", "India"]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Percentage Field */}
            <FormField
              control={form.control}
              name={`countries.${index}.percentage`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>Percentage</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={inputStyle}
                      placeholder="50%"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Delete Button */}
            <Button
              secondary
              type="button"
              onClick={() => remove(index)}
              className="size-9 gap-0 !p-1 mt-[32px]"
            >
              <DeleteIcon stroke="#F04438" />
            </Button>
          </div>
        ))}

        {/* Add New Country Button */}
        <Button
          secondary
          icon
          type="button"
          className="h-9 w-full"
          onClick={() => append({ country: "", percentage: "" })}
        >
          Add new Country
        </Button>

        {/* <Button secondary type="submit" className="w-full h-9">
          Done
        </Button> */}
      </form>
    </Form>
  );
};

export default BusinessInsightForm;
