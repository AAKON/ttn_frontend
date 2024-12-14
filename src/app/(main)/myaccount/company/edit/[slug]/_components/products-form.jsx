"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
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
import DragDropUploadImage from "@/components/ui/drag-drop-upload";
import FileUploadPreview from "@/components/ui/file-upload-preview";
import { uploadProductReq } from "@/services/product";

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-50";

const formSchema = z.object({
  product_category_id: z.number({
    required_error: "Please select an category.",
  }),
  tag: z.string().optional(),
  name: z.string().optional(),
  price_range: z.string().optional(),
  image: z.string().optional(),
});

const ProductsForm = ({ preData, slug }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [fileData, setFileData] = useState(null); // File object

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_category_id: "",
      tag: "",
      image: "",
      name: "",
      price_range: "",
    },
  });

  const handleImageChange = ({ file }) => {
    console.log("on file");
    setFileData((prev) => ({ ...prev, imageFile: file }));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  // Function to handle form submission
  const onSubmit = async (data) => {
    const { name, product_category_id, price_range } = data;
    console.log(data, "get fff data");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("product_category_id", product_category_id);
    formData.append("price_range", price_range);
    if (fileData) {
      formData.append("image", fileData.imageFile);
    }

    try {
      const result = await uploadProductReq(slug, formData, toast);
      if (result.status && result.code === 200) {
        //form reset
      }
    } catch (error) {
      console.log("Error in product create:", error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(fileData, "gt fileData");

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <p className="font-semibold leading-7 text-xl text-gray-900 pb-4">
          Products/Services
        </p>
        <FormField
          control={form.control}
          name="product_category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelStyle}>Category</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))}>
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
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col">
          <FormLabel className={`${labelStyle} mb-3`}>Product Image</FormLabel>
          <DragDropUploadImage onImageChange={handleImageChange} />
        </div>

        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelStyle}>Tag</FormLabel>
              <FormControl>
                <Input
                  className={inputStyle}
                  placeholder="Cap"
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelStyle}>Product name</FormLabel>
              <FormControl>
                <Input
                  className={inputStyle}
                  placeholder="Your Product Name"
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
          name="price_range"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelStyle}>Product Price</FormLabel>
              <FormControl>
                <Input
                  className={inputStyle}
                  placeholder="Your Product Price"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {/* Add new button */}
          <Button
            secondary
            icon
            type="button"
            className="h-9"
            onClick={(e) => {
              console.log("Add new Product");
            }}
            disabled
          >
            Add new Product
          </Button>
          {/* Submit Button */}
          <Button secondary type="submit" disabled={loading} className="h-9">
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

export default ProductsForm;
