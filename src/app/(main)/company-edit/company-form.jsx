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
import { Loader2 } from "lucide-react";
import { formLabelClasses, inputClasses } from "@/utils/input-style";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-100";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  category: z.string({ required_error: "Please select an category." }),
  tags: z.array(z.string()).min(1, { message: "Please add at least one tag." }),
  company_website: z.string().optional(),
  company_location: z.string().optional(),
  company_size: z.string().optional(),
  about_us: z.string().optional(),
});

const CompanyForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "apparel",
      tags: ["Sedex", "Ekotex", "Leed Gold"],
      company_website: "",
      company_location: "",
      company_size: "",
      about_us: "",
    },
  });

  const modifyFormData = (data) => {
    const name = data?.name;
    const category = data?.category;
    const tags = data?.tags;
    const company_website = data?.company_website;
    const company_location = data?.company_location;
    const company_size = data?.company_size;
    const about_us = data?.about_us;
    return {
      name,
      category,
      tags,
      company_website,
      company_location,
      company_size,
      about_us,
    };
  };

  const submitCompanyForm = async (data, toast) => {
    // Your API call or form submission logic
    console.log(data);

    return { status: true, code: 200 };
  };

  //   Add new tag
//   const addTag = () => {
//     if (newTag.trim() && !form.getValues("tags").includes(newTag.trim())) {
//       form.setValue("tags", [...form.getValues("tags"), newTag.trim()]);
//       setNewTag("");
//     }
//   };

  //   Remove tag
  const removeTag = (tagToRemove) => {
    form.setValue(
      "tags",
      form.getValues("tags").filter((tag) => tag !== tagToRemove)
    );
  };

  // Function to handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    const modifiedFormData = modifyFormData(data);
    try {
      const result = await submitCompanyForm(modifiedFormData, toast);
      if (result?.status && result?.code === 200) {
        toast({
          title: "Success!",
          description: "Form submitted successfully.",
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: result?.message || "Something went wrong.",
        });
      }
    } catch (error) {
      toast({ title: "Error", description: "Form submission failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ul className="grid grid-cols-1 gap-3 lg:gap-3">
          <li>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyle}>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        className={inputStyle}
                        placeholder="CodeBlue Clothing Pvt Ltd"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyle}>Company Motto</FormLabel>
                    <FormControl>
                      <Input
                        className={inputStyle}
                        placeholder="Tour tagline here"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </li>

          <li>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyle}>Tags</FormLabel>
                    <FormControl>
                      <Input
                        className={inputStyle}
                        placeholder="Used Clothes/Used Shoes/Used Bags/Mixed Rags"
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
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyle}>Category</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger
                          className={`focus:ring-0 focus:ring-offset-0 focus:ring-offset-none text-gray-900 h-9 font-normal bg-gray-100`}
                        >
                          <SelectValue
                            placeholder="Select Category"
                            className="text-gray-400 font-normal text-sm"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="apparel">Apparel</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </li>

          <li>
            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel>Compliance</FormLabel>
                  <div className={`h-[46px] mt-2 ${inputStyle}`}>
                    {/* Display Tags */}
                    <div className="flex flex-wrap gap-2">
                      {form.getValues("tags").map((tag, index) => (
                        <Badge
                          key={index}
                          className="flex h-7 items-center gap-2 text-sm px-2 py-1 rounded-sm bg-transparent border border-gray-300 text-gray-900 font-normal"
                        >
                          {tag}
                          <span
                            onClick={() => removeTag(tag)}
                            className="p-1 hover:bg-transparent text-gray-900 cursor-pointer"
                          >
                            ×
                          </span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </li>

          <li>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[4fr_2fr_1fr]">
              <FormField
                control={form.control}
                name="company_website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyle}>Company Website</FormLabel>
                    <FormControl>
                      <Input
                        className={inputStyle}
                        placeholder="www.companyurl.com"
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
                name="company_location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyle}>Location</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger
                          className={`focus:ring-0 focus:ring-offset-0 focus:ring-offset-none text-gray-900 h-9 font-normal bg-gray-100`}
                        >
                          <SelectValue
                            placeholder="Select Category"
                            className="text-gray-400 font-normal text-sm"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="australia">Australia</SelectItem>
                        <SelectItem value="new_work">New Work</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyle}>Company size</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger
                          className={`focus:ring-0 focus:ring-offset-0 focus:ring-offset-none text-gray-900 h-9 font-normal bg-gray-100`}
                        >
                          <SelectValue
                            placeholder="Select Category"
                            className="text-gray-400 font-normal text-sm"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1000-10000">1000-10000</SelectItem>
                        <SelectItem value="10000-20000">10000-20000</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </li>

          <li>
            <FormField
              control={form.control}
              name="about_us"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>About us</FormLabel>
                  <FormControl>
                    <Textarea
                      className={inputStyle}
                      placeholder="Enter a description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />  
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex justify-start">
          {/* Submit Button */}
          <Button
            secondary
            type="submit"
            disabled={loading}
            className="w-[200px] h-9"
          >
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
  );
};

export default CompanyForm;
