"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

import Button from "@/components/ui/button";
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
import { companyBasicReq } from "@/services/company";
import TagsInput from "@/components/ui/tagsInput";
import { Link } from "@/components/icons";
import { LinkIcon } from "@/components/icons/linkIcon";
import LocationPicker from "./location-picker";

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-50";

const formSchema = z.object({
  image: z.string().optional(),
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  moto: z.string().optional(),
  business_category_id: z.string({
    required_error: "Please select an category.",
  }),
  compliance: z
    .array(z.string())
    .min(1, { message: "Please add at least one compliance." }),
  tags: z.string().optional(),
  company_website: z.string().optional(),
  location_id: z.string({ required_error: "Please select location." }),
  manpower: z.string().optional(),
  about: z.string().optional(),
});

const BusinessContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      name: "",
      moto: "",
      business_category_id: "",
      tags: "",
      compliance: ["Sedex", "Ekotex", "Leed Gold"],
      company_website: "",
      location_id: "",
      manpower: "",
      about: "",
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
    console.log(data, "get fff data");
    try {
      const result = await companyBasicReq(data, toast);
      if (result.status && result.code === 200) {
        //form reset
      }
    } catch (error) {
      console.log("Error in registration:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        </div>
      </form>
    </Form>
  );
};

export default BusinessContactForm;
