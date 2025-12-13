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
import { uploadProductReq } from "@/services/product";
import DragDropFile from "@/components/shared/DragDropFile";

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-50 !mt-[6px]";

const formSchema = z.object({
  product_category_id: z.string().min(1,{
    message: "Please select an category.",
  }),
  name: z.string().min(3, { message: "Product name is required" }),
  price_min: z.coerce.number().min(1, { message: "Minimum price is required" }),
  price_max: z.coerce.number().optional(),
  moq: z.coerce.number().optional(),
  file: z
    .any()
    .refine((val) => val && val.length > 0, "Product image is required"),
});

const ProductsForm = ({ productCategories, slug, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_category_id: "",
      file: [],
      name: "",
      price_min: "",
      price_max: "",
        moq: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = form;

  // Function to handle form submission
  const onSubmit = async (data) => {
    setLoading(true);

    const {
      name,
      product_category_id,
      price_min,
      price_max,
        moq
    } = data;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("product_category_id", product_category_id);
    if(price_max){
        formData.append("price_range", `${price_min}-${price_max}`);
    }else {
        formData.append("price_range", `${price_min}`);
    }
    formData.append("moq", moq);
    if (data.file && data.file.length > 0) {
      formData.append("image", data.file[0]);
    }

    try {
      const result = await uploadProductReq(slug, formData, toast);
      if (result.status && result.code === 200) {
        reset({ file: null, product_category_id: null });
        onSuccess();
      }
    } catch (error) {
      console.log("Error in product create:", error.message);
    } finally {
      setLoading(false);
    }
  };

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
              <FormLabel className={labelStyle}>
                Category <span className="text-red-600">*</span>
              </FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
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
                  {productCategories &&
                    productCategories.length > 0 &&
                    productCategories?.map((category) => (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col">
            <FormLabel className={`${labelStyle} mb-3`}>
              Product Image <span className="text-red-600">*</span>
            </FormLabel>
            <DragDropFile
              name="file"
              control={control}
              defaultValue={watch("file")}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>
                    Product Title <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={inputStyle}
                      placeholder="Enter product title"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-nowrap gap-2 items-stretch">
              <FormField
                control={form.control}
                name="price_min"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyle}>
                      Product Price (Min){" "}
                      <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={inputStyle}
                        placeholder="Your Product Price"
                        type="number"
                        {...field}
                        onBlur={() => {
                          const maxPrice = form.watch("price_max");
                          const minPrice = field.value;
                          if (
                            minPrice &&
                            maxPrice &&
                            Number(minPrice) >= Number(maxPrice)
                          ) {
                            form.setError("price_min", {
                              type: "validate",
                              message: "Min price must be less than max price",
                            });
                          } else {
                            form.clearErrors("price_min");
                            form.clearErrors("price_max");
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-2.5 flex item-center">
                <div
                  className={`h-[1px] bg-gray-300 self-center w-full ${
                    form.formState.errors.price_min ||
                    form.formState.errors.price_max
                      ? "mt-[-15px]"
                      : "mt-[30px]"
                  }`}
                ></div>
              </div>
              <FormField
                control={form.control}
                name="price_max"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyle}>
                      Product Price (Max){" "}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={inputStyle}
                        placeholder="Your Product Price"
                        type="number"
                        {...field}
                        onBlur={() => {
                          const minPrice = form.watch("price_min");
                          const maxPrice = field.value;
                          if (
                            minPrice &&
                            maxPrice &&
                            Number(maxPrice) <= Number(minPrice)
                          ) {
                            form.setError("price_max", {
                              type: "validate",
                              message:
                                "Max price must be greater than min price",
                            });
                          } else {
                            form.clearErrors("price_min");
                            form.clearErrors("price_max");
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
              <FormField
                  control={form.control}
                  name="moq"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel className={labelStyle}>
                              Minimum Order Quantity (MOQ)
                          </FormLabel>
                          <FormControl>
                              <Input
                                  className={inputStyle}
                                  placeholder="500 Piece/Pieces (Min. Order)"
                                  type="number"
                                  {...field}
                              />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
              />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end">
          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="h-9 w-[200px]"
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

export default ProductsForm;
