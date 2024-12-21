"use client";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Button from "@/components/shared/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// Form Components ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import {submitContactForm} from "@/services/contact/submitForm";

// Define the schema with Zod
const formSchema = z.object({
  company_name: z.string().min(2, { message: "Company Name is required." }),
  name: z.string().min(3, { message: "Name is required." }),
  designation: z.string().optional(),
  email: z.string().email({ message: "Invalid email address." }),
  countryCode: z.string().optional(),
  phoneNumber: z.string().optional(),
  message: z.string().min(10,{ message: "Message is required." }),
  terms: z.boolean().refine((value) => value, {
    message: "You must agree to the privacy policy.",
  }),
});

const Forms = () => {
  const [code, setcode] = useState("");
  const [listOpen, setlistOpen] = useState(false);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const HandleEachList = (e) => {
    setlistOpen(false);
    setcode(e.target.innerText);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      name: "",
      designation: "",
      email: "",
      countryCode: "US",
      phoneNumber: "",
      message: "",
      terms: true,
    },
  });

  const modifyFormData = (data) => {
    const company_name = data?.company_name;
    const name = data?.name;
    const designation = data?.designation;
    const email = data?.email;
    const phone = `${data.countryCode}-${data.phoneNumber}`.trim();
    const message = data?.message;
    const terms = data?.terms;
    // Return the modified data
    return {
      company_name,
      name,
      designation,
      email,
      phone,
      message,
      terms
    };
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const modifiedFormData = modifyFormData(data);

    try {
      const result = await submitContactForm(modifiedFormData, toast);
      if (result?.status && result?.code === 200) {
        toast({
          title: "Success",
          description: "Your message has been sent successfully.",
          variant: "success",
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: result?.message || "Failed to send the message.",
          variant: "error",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:w-[474px] lg:w-[630px] xl:w-[685px]"
      >
        <div className="bg-white lg:mt-0 mt-16 flex flex-col gap-y-4 w-full shadow-card-shadow p-4 xl:p-8 rounded-2xl">
          <h4 className="font-semibold text-2xl xl:text-3xl text-gray-900 md:pb-3 xl:pb-6 pb-6 text-center">
            Get in touch
          </h4>
          {/* Company name */}
          <div>
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="formLabelClasses">
                    Company Name*
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="input_style"
                      placeholder="Enter your company name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex sm:flex-row gap-y-4 flex-col md:flex-col xl:flex-row  items-center justify-between w-full">
            {/* Your name */}
            <div className="sm:basis-[48%] w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="formLabelClasses">
                      Your Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="input_style"
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Designation */}
            <div className="sm:basis-[48%] w-full">
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="formLabelClasses">
                      Designation
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="input_style"
                        placeholder="Enter your designation"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex sm:flex-row flex-col gap-y-4  xl:flex-row md:flex-col  items-center justify-between w-full">
            {/* Your email */}
            <div className="sm:basis-[48%] w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="formLabelClasses">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="input_style"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Phone number */}
            <div className="sm:basis-[48%] w-full">
              <FormField
                control={form.control}
                name="countryCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="formLabelClasses">
                      Phone Number
                    </FormLabel>
                    <div className="grid grid-cols-[auto_1fr]">
                      {/* Country Code Dropdown */}
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-tr-none rounded-br-none focus:ring-0 focus:ring-offset-0 focus:outline-0 border border-r-0 border-gray-200 text-gray-500 text-base font-normal">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem
                            className={"text-bass !text-gray-900"}
                            value="US"
                          >
                            US
                          </SelectItem>
                          <SelectItem
                            className={"text-bass !text-gray-900"}
                            value="CA"
                          >
                            CA
                          </SelectItem>
                          <SelectItem
                            className={"text-bass !text-gray-900"}
                            value="GB"
                          >
                            GB
                          </SelectItem>
                          <SelectItem
                            className={"text-bass !text-gray-900"}
                            value="BD"
                          >
                            BD
                          </SelectItem>
                          {/* Add more countries as needed */}
                        </SelectContent>
                      </Select>

                      {/* Phone Number Input */}
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormControl className="flex-1">
                            <Input
                              className="input_style !border-l-0 !rounded-tl-none !rounded-bl-none"
                              placeholder="+880 1234567890"
                              {...field}
                            />
                          </FormControl>
                        )}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Message */}
          <div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="formLabelClasses">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      className="input_style resize-none min-h-[128px]"
                      placeholder="Enter your message..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* terms and condition */}
          <div className="flex items-center gap-x-2 lg:gap-x-3">
            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    id="terms"
                    className="p-1 bg-transparent border border-gray-200 checked:!border-brand-600"
                  />
                )}
              />
              <label
                htmlFor="terms"
                className="font-normal text-sm lg:text-base text-gray-600"
              >
                You agree to our friendly{" "}
                <Link href="/privacy-policy" className="underline">
                  privacy policy.
                </Link>
              </label>
            </div>
          </div>
          {/* Send message */}
          <Button type="submit" disabled={loading} className="xl:mt-7 mt-3">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Send message"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Forms;
