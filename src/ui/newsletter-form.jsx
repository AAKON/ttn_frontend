"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

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
import {
  formLabelClasses,
  inputClasses,
} from "@/app/(main)/contact/_contact-us-form";
import { submitContactForm } from "@/services/contact/submitForm";
import { reqNewsletter } from "@/services/common";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";

// Define Zod schema for email validation
const formSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email.",
  }),
});

function NewsletterForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Set up the form with validation schema
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission
  const onSubmitNewsletter = async (data) => {
    //console.log("submitted==n");
    try {
      const result = await reqNewsletter(data, toast);
      if (result?.status && result?.code === 200) {
        form.reset();
      } else {
        console.log("Error in form submission:", result?.message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitNewsletter)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={formLabelClasses}>Email</FormLabel>
              <div className="flex gap-1.5 flex-col md:flex-row">
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  className={`w-auto h-12 ${inputClasses}`}
                  placeholder="Enter your email"
                  {...field}
                />
                <Button
                  secondary
                  style={{ height: "48px" }}
                  disabled={loading}
                  type="submit"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </div>
              {/* Display validation error message */}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default NewsletterForm;
