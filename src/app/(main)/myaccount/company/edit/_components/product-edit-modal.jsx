"use client";
import { EditIcon } from "@/components/icons";
import Button from "@/components/shared/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

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
import { companyBasicReq } from "@/services/company";
import TagsInput from "@/components/ui/tagsInput";
import PhotoUploadBox from "./photo-upload-box";

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-50";

const formSchema = z.object({
  categories: z
    .array(z.string())
    .min(1, { message: "Please add at least one category." }),
  product_card_image: z.string().optional(),
  tag: z.string().optional(),
  product_name: z.string().optional(),
  product_price: z.string().optional(),
});

const ProductEditModal = ({
  children = (
    <Button secondary type="button">
      <EditIcon stroke="#667085" />
    </Button>
  ),
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[1000px] z-[9999] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click update when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ProductsForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ProductsForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: ["Cap", "Yarn", "T-shirt", "Jacket"],
      tag: "",
      product_card_image: "",
      product_name: "",
      product_price: "",
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
        <FormField
          control={control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <TagsInput
                value={field.value} // Controlled value
                onChange={field.onChange} // Update state on change
              />
              <FormMessage>{errors.categories?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="product_card_image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Card</FormLabel>
              <PhotoUploadBox handleFileChange={field.onChange} />
            </FormItem>
          )}
        />

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
          name="product_name"
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
          name="product_price"
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
        <div className="grid grid-cols-1 gap-3">
          {/* Submit Button */}
          <Button type="submit" disabled={loading} className="h-9">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Update Product"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductEditModal;
