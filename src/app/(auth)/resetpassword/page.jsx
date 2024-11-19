'use client'
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import Link from "next/link";
import {AuthHeader} from "@/shared";
import Button from "@/components/ui/button";
import {Input} from "@/components/ui/input"
import React, { useState } from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage
} from "@/components/ui/form"
import {Arrowback} from "@/components/icons/arrowback";
import {BackLink} from "@/components/auth/backLink";
import {Checkmark} from "@/icons";

const formSchema = z
    .object({
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' })
            .regex(/[^A-Za-z0-9]/, {
                message: 'Password must contain a special character',
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });


export default function ResetPassword() {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState('');
    const [isValidLength, setIsValidLength] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);
    // Password validation function
    const validatePassword = (value) => {
        setIsValidLength(value.length >= 8);
        setHasSpecialChar(/[^A-Za-z0-9]/.test(value));
    };


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: '',
        },
    });

    const handleSubmit = async (data) => {
        setSubmittedEmail(data.email);
        setIsSubmitted(true);
        console.log('submitted')
    }

    return (
        <div className="container mx-auto">
            <div className="auth-wrap flex flex-col justify-center items-center">
                {isSubmitted ? (
                    <AuthHeader logo={'/icons/check-auth.svg'} />
                ) : (
                    <AuthHeader logo={'/icons/lock-auth.svg'} />
                )}
                {!isSubmitted ? (
                <div className="w-full sm:w-[360px] mx-auto">
                    <div className="text-center pt-2">
                        <h1 className="auth_title">Set new password</h1>
                        <p className="gray-500 pt-3">Your new password must be different to previously used passwords.</p>
                    </div>
                    <div className="auth-form pt-10">
                        <Form  {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)}>
                                <div className="grid grid-cols-1 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className="afrm-label">Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password"
                                                           placeholder="********"
                                                           className="text-[#667085] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-0 outline-0" {...field}
                                                           {...form.register("password", {
                                                               onChange: (e) => validatePassword(e.target.value),
                                                           })}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className="afrm-label">Confirm password</FormLabel>
                                                <FormControl>
                                                    <Input type="password"
                                                           placeholder="********"
                                                           className="text-[#667085] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-0 outline-0" {...field}

                                                    />
                                                </FormControl>
                                                <FormDescription className="p-0 !m-0 pt-3">
                                                    <span className="flex flex-col gap-1">
                                                        <span className="flex items-center gap-2">
                                                            <span
                                                                className={`flex justify-center items-center w-4 h-4 rounded-full ${
                                                                    isValidLength ? 'bg-green-500' : 'bg-[#D0D5DD]'
                                                                }`}>
                                                                <Checkmark/>
                                                            </span>
                                                            <span className="text-[#667085] text-sm">Must be at least 8 characters</span>
                                                        </span>
                                                        <span className="flex items-center gap-2">
                                                            <span
                                                                className={`flex justify-center items-center w-4 h-4 rounded-full ${
                                                                    hasSpecialChar ? 'bg-green-500' : 'bg-[#D0D5DD]'
                                                                }`}>
                                                                <Checkmark/>
                                                            </span>
                                                            <span className="text-[#667085] text-sm">Must contain one special character</span>
                                                        </span>
                                                    </span>
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <Button className="w-full mt-2" type="submit">
                                        Reset password
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                    <div className="pt-8">
                        <BackLink title="Back to log in" link="/login" />
                    </div>
                </div>
                ) : (
                <div className="w-full sm:w-[360px] mx-auto">
                    <div className="text-center pt-2">
                        <h1 className="auth_title">Password reset</h1>
                        <p className="gray-500 pt-3">Your password has been successfully reset. Click below to log in magically.</p>
                    </div>
                    <div className="auth-form pt-8">
                        <div className="flex flex-col gap-8">
                            <Link href="/login"
                                  className="w-full font-semibold text-base rounded-lg leading-[44px] bg-primary text-white mt-2 block text-center"
                                  type="submit">
                                Continue
                            </Link>
                            <BackLink title="Back to log in" link="/login" />
                        </div>
                    </div>
                </div>
                    )}
            </div>
        </div>
    )
        ;
}
  