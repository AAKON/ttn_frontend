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
import {companyBasicReq} from "@/services/company";
import TagsInput from "@/components/ui/tagsInput";
import CompanyDragAndDropImage from "./_componets/company-image";

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-100";

const formSchema = z.object({
  image: z.string().optional(),
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  moto: z.string().optional(),
  business_category_id: z.string({ required_error: "Please select an category." }),
  compliance: z.array(z.string()).min(1, { message: "Please add at least one compliance." }),
  tags: z.string().optional(),
  company_website: z.string().optional(),
  location_id: z.string({ required_error: "Please select location." }),
  manpower: z.string().optional(),
  about: z.string().optional(),
});

const CompanyForm = () => {
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

    const { control, handleSubmit, formState: { errors } } = form;

  // Function to handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
      console.log(data, 'get fff data');
      try {
          const result = await companyBasicReq(data, toast);
          if (result.status && result.code === 200) {
              //form reset
          }
      } catch (error) {
          console.log('Error in registration:', error.message);
      }
      finally {
          setLoading(false);
      }

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-start">
            <CompanyDragAndDropImage onImageChange={(image) => form.setValue("image", image)} />
          </div>
          <div className="grid grid-cols-1 gap-3 lg:gap-3">
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                  <FormField
                      control={form.control}
                      name="name"
                      render={({field}) => (
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
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="moto"
                      render={({field}) => (
                          <FormItem>
                              <FormLabel className={labelStyle}>Company Motto</FormLabel>
                              <FormControl>
                                  <Input
                                      className={inputStyle}
                                      placeholder="Tour tagline here"
                                      type="text"
                                      {...field}
                                  />
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
              </div>
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                  <FormField
                      control={form.control}
                      name="tags"
                      render={({field}) => (
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
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="business_category_id"
                      render={({field}) => (
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
                                      <SelectItem value="1">Apparel</SelectItem>
                                      <SelectItem value="2">Clothing</SelectItem>
                                  </SelectContent>
                              </Select>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
              </div>
              <FormField
                  control={control}
                  name="compliance"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Compliance</FormLabel>
                          <TagsInput
                              value={field.value}   // Controlled value
                              onChange={field.onChange}  // Update state on change
                          />
                          <FormMessage>{errors.tags?.message}</FormMessage>
                      </FormItem>
                  )}
              />

              <div className="grid grid-cols-1 gap-3 lg:grid-cols-[4fr_2fr_1fr]">
                  <FormField
                      control={form.control}
                      name="company_website"
                      render={({field}) => (
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
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="location_id"
                      render={({field}) => (
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
                                      <SelectItem value="1">Australia</SelectItem>
                                      <SelectItem value="2">New Work</SelectItem>
                                  </SelectContent>
                              </Select>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="manpower"
                      render={({field}) => (
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
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
              </div>

              <FormField
                  control={form.control}
                  name="about"
                  render={({field}) => (
                      <FormItem>
                          <FormLabel className={labelStyle}>About us</FormLabel>
                          <FormControl>
                              <Textarea
                                  className={inputStyle}
                                  placeholder="Enter a description"
                                  {...field}
                              />
                          </FormControl>
                          <FormMessage/>
                      </FormItem>
                  )}
              />
          </div>

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
                          <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
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
