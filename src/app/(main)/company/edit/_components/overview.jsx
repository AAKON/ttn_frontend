

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formLabelClasses, inputClasses } from "@/utils/input-style";

import { companyBasicReq } from "@/services/company";

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-50";

const formSchema = z.object({
  manpower: z.string().min(1, {
    message: "Manpower is required",
  }),
  production_capacity: z.string().min(1, {
    message: "Production capacity is required",
  }),
  no_of_machines: z.string().min(1, {
    message: "Number of machines is required",
  }),
  moq: z.string().min(1, {
    message: "MOQ is required",
  }),
  lead_time: z.string().min(1, {
    message: "Lead time is required",
  }),
  delivery_terms: z.string().min(1, {
    message: "Delivery terms is required",
  }),
  payment_policy: z.string().min(1, {
    message: "Payment policy is required",
  }),

});

const OverviewForm = () => {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        manpower: "",
        production_capacity: "",
        no_of_machines: "",
        moq: "",
        lead_time: "",
        delivery_terms: "", 
        payment_policy: ""
    },
  });


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
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="manpower"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>Manpower</FormLabel>
                  <FormControl>
                    <Input
                      className={inputStyle}
                      placeholder="Lorem ipsum"
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
              name="production_capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>Production capacity</FormLabel>
                  <FormControl>
                    <Input
                      className={inputStyle}
                      placeholder="02 tons"
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
              name="no_of_machines"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>No of machines</FormLabel>
                  <FormControl>
                    <Input
                      className={inputStyle}
                      placeholder="Lorem ipsum"
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
              name="moq"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>MOQ</FormLabel>
                  <FormControl>
                    <Input
                      className={inputStyle}
                      placeholder="500 Piece/Pieces (Min. Order)"
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
              name="lead_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>Lead Time</FormLabel>
                  <FormControl>
                    <Input
                      className={inputStyle}
                      placeholder="90 Days"
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
              name="delivery_terms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>delivery terms</FormLabel>
                  <FormControl>
                    <Input
                      className={inputStyle}
                      placeholder="FOB /C&F/CIF"
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
              name="payment_policy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>Payment Policy</FormLabel>
                  <FormControl>
                    <Input
                      className={inputStyle}
                      placeholder="LC/TT/Bank Transfer"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default OverviewForm;