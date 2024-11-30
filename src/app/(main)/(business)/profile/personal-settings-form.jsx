"use client";
import Image from "next/image";
import Visa_card from "/public/icons/visa_icon.svg";
import Cvv_icon from "/public/icons/cvv_icon.svg";
import Fb_icon from "/public/icons/facebook_icon.svg";
import Linkedin_icon from "/public/icons/linkedin_icon.svg";
import Telegram_icon from "/public/icons/telegram_icon.svg";
import calender_icon from "/public/icons/calender-icon.svg";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

import Button from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { formLabelClasses, inputClasses } from "@/utils/input-style";
import { FacebookFIcon } from "@/components/icons";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const PersonalSettingsForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      // email: "",
      // password: "",
      // new_password: "",
      // name_on_card: "",
      // card_number: "",
      // exp_date: "",
      // cvv: "",
      // facebook_link: "",
      // linkedin_link: "",
      // telegram_link: "",
    },
  });

  const modifyFormData = (data) => {
    const name = data?.name;
    // const email =  data?.email;
    // const password = data.password.trim();
    // const new_password = data.new_password.trim();
    // const name_on_card = data?.name_on_card;
    // const card_number = data?.card_number;
    // const exp_date = data?.exp_date;
    // const cvv = data?.cvv;
    // const facebook_link = data?.facebook_link;
    // const linkedin_link = data?.linkedin_link;
    // const telegram_link = data?.telegram_link;
    // const message = data?.message.trim();
    // Return the modified data
    return {
      name,
      // email,
      // password,
      // new_password,
      // name_on_card,
      // card_number,
      // exp_date,
      // cvv,
      // facebook_link,
      // linkedin_link,
      // telegram_link,
    };
  };

  const submitPersonalSettingsForm = async (data, toast) => {
    // Your API call or form submission logic
    return { status: true, code: 200 };
  };

  // Function to handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    const modifiedFormData = modifyFormData(data);
    try {
      const result = await submitPersonalSettingsForm(modifiedFormData, toast);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ul className="grid grid-cols-1 gap-3 lg:gap-8">
          <li>
            <p className="text-md font-semibold text-gray-500 pb-4">
              Change personal Information
            </p>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={formLabelClasses}>Name</FormLabel>
                    <FormControl>
                      <Input
                        className={`${inputClasses} bg-gray-100`}
                        placeholder="Bashar bro"
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
                    <FormLabel className={formLabelClasses}>
                      Your Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={`${inputClasses} bg-gray-100`}
                        placeholder="Tour email here"
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
            <p className="text-md font-semibold text-gray-500 pb-4">
              Change Password
            </p>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={formLabelClasses}>
                      Previous password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={`${inputClasses} bg-gray-100`}
                        placeholder="*********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={formLabelClasses}>
                      New Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={`${inputClasses} bg-gray-100`}
                        placeholder="*********"
                        type="password"
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
            <p className="text-md font-semibold text-gray-500 pb-4">
              Payment info
            </p>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
              <FormField
                control={form.control}
                name="name_on_card"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={formLabelClasses}>
                      Name On Card
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={`${inputClasses} bg-gray-100`}
                        placeholder="Bashar bro"
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
                name="card_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={formLabelClasses}>
                      Card Number
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className={`${inputClasses} bg-gray-100 pl-14`}
                          placeholder="Bashar bro"
                          type="text"
                          {...field}
                        />
                        <Image
                          src={Visa_card}
                          alt="Visa_card"
                          className="bg-white h-6 w-8 rounded-sm absolute top-1/2 -translate-y-1/2 left-2 text-gray-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="exp_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={formLabelClasses}>Exp Date</FormLabel>
                    <FormControl>
                      <div className="relative ">
                        <Input
                          className={`${inputClasses} bg-gray-100 pl-14`}
                          placeholder="Bashar bro"
                          type="date"
                          {...field}
                        />
                        <Image
                          src={calender_icon}
                          alt="Visa_card"
                          className="bg-white h-6 w-8 rounded-sm absolute top-1/2 -translate-y-1/2 left-2 text-gray-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={formLabelClasses}>CVV</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className={`${inputClasses} bg-gray-100 pl-14`}
                          placeholder="3547"
                          {...field}
                        />
                        <Image
                          src={Cvv_icon}
                          alt="Visa_card"
                          className="bg-white h-6 w-8 rounded-sm absolute top-1/2 -translate-y-1/2 left-2 text-gray-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </li>
          <li>
            <p className="text-md font-semibold text-gray-500 pb-4">
              Update social links
            </p>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
              <FormField
                control={form.control}
                name="facebook_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={formLabelClasses}>Facebook</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className={`${inputClasses} bg-gray-100 pr-16`}
                          placeholder="https://www.facebook.com/basahar"
                          {...field}
                        />
                        <Image
                          src={Fb_icon}
                          alt="FB icon"
                          className="bg-white h-6 w-8 rounded-sm absolute top-1/2 -translate-y-1/2 right-2 text-gray-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={formLabelClasses}>Linkedin</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className={`${inputClasses} bg-gray-100 pr-16`}
                          placeholder="https://www.facebook.com/basahar"
                          {...field}
                        />
                        <Image
                          src={Linkedin_icon}
                          alt="linkedin icon"
                          className="bg-white h-6 w-8 rounded-sm absolute top-1/2 -translate-y-1/2 right-2 text-gray-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telegram_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={formLabelClasses}>Telegram</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className={`${inputClasses} bg-gray-100 pr-14`}
                          placeholder="https://www.facebook.com/basahar"
                          {...field}
                        />
                        <Image
                          src={Telegram_icon}
                          alt="Visa_card"
                          className="bg-white h-6 w-8 rounded-sm absolute top-1/2 -translate-y-1/2 right-2 text-gray-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <Button secondary type="button" onClick={() => form.reset()}>
            Cancel
          </Button>
          {/* Submit Button */}
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Save Settings"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PersonalSettingsForm;
