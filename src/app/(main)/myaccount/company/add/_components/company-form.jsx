"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Loader2 } from "lucide-react";
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
import CustomSelectTags from "@/components/ui/customSelectTags";
import DropDownTags from "@/components/ui/dropDownTags";
import FileUploadPreview from "@/components/ui/file-upload-preview";
import { useRouter } from "next/navigation";

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-50";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  moto: z.string().optional(),
  business_category_id: z.number({
    required_error: "Please select an category.",
  }),
    certificates: z
    .array(z.number())
    .min(1, { message: "Please add at least one certificates." }),
  tags: z.string().optional(),
  company_website: z.string().optional(),
  location_id: z.number({ required_error: "Please select location." }),
  manpower: z.string().optional(),
  about: z.string().optional(),
  profile_pic: z.string().optional(),
});

const CompanyForm = ({ preData }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [fileData, setFileData] = useState(null); // File object
  const [loading, setLoading] = useState(false);

  // Options for the select dropdown
  const tagOptions =
    preData?.certificates?.map((item) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const handleImageChange = ({ file }) => {
    setFileData((prev) => ({ ...prev, imageFile: file }));
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      moto: "",
      business_category_id: "",
      tags: "",
        certificates: [],
      company_website: "",
      location_id: "",
      manpower: "",
      about: "",
      profile_pic: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  // Function to handle form submission
  const onSubmit = async (data) => {
    const {
      name,
      moto,
      business_category_id,
        certificates,
      tags,
      company_website,
      location_id,
      manpower,
      about,
    } = data;
    const formData = new FormData();

    formData.append("name", name);
    formData.append("moto", moto);
    formData.append("business_category_id", business_category_id);
      certificates.forEach((item, index) => {
      formData.append(`certificates[${index}]`, item);
    });
    formData.append("tags", tags);
    formData.append("company_website", company_website);
    formData.append("location_id", location_id);
    formData.append("manpower", manpower);
    formData.append("about", about);
    if (fileData?.imageFile) {
      formData.append("profile_pic", fileData.imageFile);
    }

    setLoading(true);
    try {
      const result = await companyBasicReq(formData, toast);
      if (result.status && result.code === 200) {
        reset();
        router.push("/myaccount/company");
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
        <div className="flex justify-start">
          <FileUploadPreview onImageChange={handleImageChange} />
        </div>
        <div className="grid grid-cols-1 gap-3 lg:gap-3">
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
              name="moto"
              render={({ field }) => (
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="tags"
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
              name="business_category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>Category</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`focus:ring-0 focus:ring-offset-0 focus:ring-offset-none text-gray-900 h-9 font-normal bg-gray-50`}
                      >
                        <SelectValue
                          placeholder="Select Category"
                          className="text-gray-400 font-normal text-sm"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {preData?.categories?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name="certificates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Certificates</FormLabel>
                <DropDownTags
                  value={field.value}
                  onChange={field.onChange}
                  options={tagOptions}
                />
                <FormMessage>{errors.tags?.message}</FormMessage>
              </FormItem>
            )}
          />
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
              name="location_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>Location</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`focus:ring-0 focus:ring-offset-0 focus:ring-offset-none text-gray-900 h-9 font-normal bg-gray-50`}
                      >
                        <SelectValue
                          placeholder="Select location"
                          className="text-gray-400 font-normal text-sm"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {preData?.locations?.map((location) => (
                        <SelectItem
                          key={location.id}
                          value={String(location.id)}
                        >
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="manpower"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>Company size</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger
                        className={`focus:ring-0 focus:ring-offset-0 focus:ring-offset-none text-gray-900 h-9 font-normal bg-gray-50`}
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

          <FormField
            control={form.control}
            name="about"
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
