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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkmark } from "@/icons";
import Button from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";

const formSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Must have at least 3 character" })
    .email({
      message: "Must be a valid email",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain a special character",
    }),
});

export const Talent = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isValidLength, setIsValidLength] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  // Password validation function
  const validatePassword = (value) => {
    setIsValidLength(value.length >= 8);
    setHasSpecialChar(/[^A-Za-z0-9]/.test(value));
  };

  const handleSubmit = async (data) => {};
  return (
    <div className="w-full sm:w-[360px] mx-auto pb-20">
      <div className="text-center pt-2">
        <h1 className="auth_title">Create an account</h1>
        <p className="gray-500 pt-3">Sub text goes or stays here</p>
      </div>
      <div className="auth-form pt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="afrm-label">Your Name</FormLabel>
                    <FormControl>
                      <Input
                        className="text-[#667085] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-0 outline-0"
                        placeholder="Kang the conquerer"
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
                    <FormLabel className="afrm-label">
                      Enter your email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="text-[#667085] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-0 outline-0"
                        placeholder="basharvai@textile.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="afrm-label">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a password"
                        className="text-[#667085] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-0 outline-0"
                        {...field}
                        {...form.register("password", {
                          onChange: (e) => validatePassword(e.target.value),
                        })}
                      />
                    </FormControl>
                    <FormDescription className="p-0 !m-0 pt-3">
                      <span className="flex flex-col gap-1">
                        <span className="flex items-center gap-2">
                          <span
                            className={`flex justify-center items-center w-4 h-4 rounded-full ${
                              isValidLength ? "bg-green-500" : "bg-[#D0D5DD]"
                            }`}
                          >
                            <Checkmark />
                          </span>
                          <span className="text-[#667085] text-sm">
                            Must be at least 8 characters
                          </span>
                        </span>
                        <span className="flex items-center gap-2">
                          <span
                            className={`flex justify-center items-center w-4 h-4 rounded-full ${
                              hasSpecialChar ? "bg-green-500" : "bg-[#D0D5DD]"
                            }`}
                          >
                            <Checkmark />
                          </span>
                          <span className="text-[#667085] text-sm">
                            Must contain one special character
                          </span>
                        </span>
                      </span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full mt-2" type="submit">
                Get started
              </Button>
              <p className="text-gray-500 text-md text-center">or</p>
              <Button secondary className="w-full" type="button">
                <Image
                  src="/icons/google-icon.svg"
                  width={20}
                  height={20}
                  alt="google icon"
                />
                <span>Sign up with Google</span>
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="pt-8 text-center">
        <p className="frm_cr">
          Already have an account?{" "}
          <Link
            className="text-primary text-base font-semibold"
            href="/sign-up"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};
