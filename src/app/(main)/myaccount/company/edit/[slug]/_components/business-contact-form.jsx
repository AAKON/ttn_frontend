"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";

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
import { Link2Icon, Loader2 } from "lucide-react";
import { formLabelClasses, inputClasses } from "@/utils/input-style";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { companyBasicReq, companyBusinessContactReq } from "@/services/company";
import TagsInput from "@/components/ui/tagsInput";
import { Link } from "@/icons";
import { LinkIcon } from "@/components/icons/linkIcon";
import LocationPicker from "./location-picker";

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-50";

const formSchema = z.object({
  address: z.string().min(2, {
    message: "Required.",
  }),
  email: z
    .string()
    .min(3, { message: "Must have at least 3 character" })
    .email({
      message: "Must be a valid email",
    }),
  whatsapp: z.string().optional(),
  phone: z.string().min(3, { message: "Enter a phone number" }),
  website: z.string().optional(),
  location: z.string().optional(),
});

const BusinessContactForm = ({ slug }) => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      email: "",
      whatsapp: "",
      phone: "",
      website: "",
      location: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  // Function to handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    const formData = {
      address: data?.address,
      email: data?.email,
      whatsapp: data?.whatsapp,
      phone: data?.phone,
      website: data?.website,
      location: {
        lat: "23.34554334",
        lng: "93.2234736",
      },
    };
    try {
      const result = await companyBusinessContactReq(slug, formData, toast);
      if (result.status && result.code === 200) {
        //form reset
      }
    } catch (error) {
      console.log("Error in submitting:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-3 lg:gap-3">
          <div className="grid grid-cols-1">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>Address</FormLabel>
                  <FormControl>
                    <Input
                      className={inputStyle}
                      placeholder="Lorem ipsum dolor"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>Email</FormLabel>
                  <FormControl>
                    <Input
                      className={inputStyle}
                      placeholder="contact@codeblueindia.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>Whatsapp</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className={inputStyle + " pr-10"}
                        placeholder="link"
                        type="text"
                        {...field}
                      />
                      <LinkIcon className="absolute right-2 top-1/2 -translate-y-1/2" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>Phone</FormLabel>
                  <FormControl>
                    <Input
                      className={inputStyle}
                      placeholder="+919810211006"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>Website</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className={inputStyle + " pr-10"}
                        placeholder="www.abcdcompany.com"
                        type="text"
                        {...field}
                      />
                      <LinkIcon className="absolute right-2 top-1/2 -translate-y-1/2" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1">
            <LocationPicker form={form} labelStyle={labelStyle} />
          </div>
          <Button type="submit" secondary disabled={loading} className="h-9">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BusinessContactForm;
