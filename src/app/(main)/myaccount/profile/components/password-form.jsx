"use client";
import 'react-phone-input-2/lib/style.css'
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import React, {useState} from "react";

import {updateUserPasswordReq} from "@/services/auth/auth";

import Button from "@/components/shared/button";
import {
    Form,
    FormControl, FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Loader2} from "lucide-react";
import {toast} from "@/hooks/use-toast";
import {Checkmark} from "@/icons";

const formSchema = z
    .object({
        current_password: z.string().min(8, {message: "Confirm Password is required"}),
        new_password: z
            .string()
            .min(8, {message: "Password must be at least 8 characters long"})
            .regex(/[^A-Za-z0-9]/, {
                message: "Password must contain a special character",
            }),
        new_password_confirmation: z
            .string()
            .min(8, {message: "Password must be at least 8 characters long"})
            .regex(/[^A-Za-z0-9]/, {
                message: "Password must contain a special character",
            }),
    })
    .refine((data) => data.new_password === data.new_password_confirmation, {
        path: ["password_confirmation"],
        message: "Passwords do not match",
    });

const ChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [isValidLength, setIsValidLength] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);
    const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            current_password: "",
            new_password: "",
            new_password_confirmation: "",
        },
    });

    // Password validation function
    const validatePassword = (new_password, new_password_confirmation) => {
        setIsValidLength(new_password.length >= 8);
        setHasSpecialChar(/[^A-Za-z0-9]/.test(new_password));
        setDoPasswordsMatch(new_password === new_password_confirmation);
    };


    // Function to handle form submission
    const onSubmit = async (data) => {
        setLoading(true);
        const {current_password, new_password, new_password_confirmation} = data;

        const formData = new FormData();
        formData.append('current_password', current_password);
        formData.append('new_password', new_password);
        formData.append('new_password_confirmation', new_password_confirmation);

        try {
            const result = await updateUserPasswordReq(formData, toast);
            if (result.status && result.code === 200) {
                form.reset();
            }
        } catch (error) {
            console.log("Error in : ", error.message);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="pt-1 pb-4 lg:pt-2 lg:pb-8 sm:max-w-xl">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-4">
                        <FormField
                            control={form.control}
                            name="current_password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="afrm-label">Current Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="********"
                                            className="text-[#667085] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-0 outline-0"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="new_password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="afrm-label">New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="********"
                                            className="text-[#667085] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-0 outline-0"
                                            {...field}
                                            {...form.register("new_password", {
                                                onChange: (e) => {
                                                    const password = e.target.value;
                                                    const confirmPassword = form.getValues("new_password_confirmation");
                                                    validatePassword(password, confirmPassword);
                                                }
                                            })}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="new_password_confirmation"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="afrm-label">
                                        Confirm password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="********"
                                            className="text-[#667085] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-0 outline-0"
                                            {...field}
                                            {...form.register("new_password_confirmation", {
                                                onChange: (e) => {
                                                    const confirmPassword = e.target.value;
                                                    const password = form.getValues("new_password");
                                                    validatePassword(password, confirmPassword);
                                                }
                                            })}
                                        />
                                    </FormControl>
                                    <FormDescription className="p-0 !m-0 pt-3">
                            <span className="flex flex-col gap-1">
                              <span className="flex items-center gap-2">
                                <span
                                    className={`flex justify-center items-center w-4 h-4 rounded-full ${
                                        isValidLength
                                            ? "bg-green-500"
                                            : "bg-[#D0D5DD]"
                                    }`}
                                >
                                  <Checkmark/>
                                </span>
                                <span className="text-[#667085] text-sm">
                                  Must be at least 8 characters
                                </span>
                              </span>
                              <span className="flex items-center gap-2">
                                <span
                                    className={`flex justify-center items-center w-4 h-4 rounded-full ${
                                        hasSpecialChar
                                            ? "bg-green-500"
                                            : "bg-[#D0D5DD]"
                                    }`}
                                >
                                  <Checkmark/>
                                </span>
                                <span className="text-[#667085] text-sm">
                                  Must contain one special character
                                </span>
                              </span>
                                <span className="flex items-center gap-2">
                                <span
                                    className={`flex justify-center items-center w-4 h-4 rounded-full ${
                                        doPasswordsMatch
                                            ? "bg-green-500"
                                            : "bg-[#D0D5DD]"
                                    }`}
                                >
                                  <Checkmark/>
                                </span>
                                <span className="text-[#667085] text-sm">
                                  Passwords match
                                </span>
                              </span>
                            </span>
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end gap-2 mt-1 lg:mt-2">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="px-[62px]"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                        Please wait
                                    </>
                                ) : (
                                    "Change Password"
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ChangePassword;
