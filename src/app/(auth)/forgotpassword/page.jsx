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
import {useToast} from "@/hooks/use-toast";
import {forgotPassword} from "@/services/auth/auth";
import {Checkmark} from "@/icons";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import {ResetPW} from "@/components/auth/reset/resetPW";
import ResetSuccess from "@/components/auth/reset/resetSuccess";

const formSchema = z.object({
    email: z.string().min(3,{ message: 'Must have at least 3 character' }).email({
        message: 'Must be a valid email',
    })
})


export default function ForgotPassword() {

    const { toast } = useToast();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState('');
    const [isUserFound, setIsUserFound] = useState(false);
    const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);

    const handleResetSuccess = (success) => {
        setResetPasswordSuccess(success); // Update the parent's state
        console.log('Reset Password Success:', success);
    };

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        },
    });

    const handleSubmit = async (data) => {
        setSubmittedEmail(data.email);
        setIsSubmitted(true);
        try {
            const result = await forgotPassword(data, toast);
            if (result.status && result.code === 200) {
                setIsUserFound(true);
            }
        } catch (error) {
            console.log('Error in find user:', error.message);
        }

    }

    return (
        <div className="container mx-auto">
            <div className="auth-wrap flex flex-col justify-center items-center">
                {!isUserFound && !resetPasswordSuccess && <AuthHeader logo={'/icons/key.svg'} />}
                {isUserFound && !resetPasswordSuccess && <AuthHeader logo={'/icons/lock-auth.svg'} />}
                {resetPasswordSuccess && <AuthHeader logo={'/icons/check-auth.svg'} />}

                {!isUserFound && !resetPasswordSuccess && (
                <div className="w-full sm:w-[360px] mx-auto">
                    <div className="text-center pt-2">
                        <h1 className="auth_title">Forgot password?</h1>
                        <p className="gray-500 pt-3">No worries, we’ll send you reset instructions.</p>
                    </div>
                    <div className="auth-form pt-10">
                        <Form  {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)}>
                                <div className="grid grid-cols-1 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className="afrm-label">Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email"
                                                           className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-0 outline-0"
                                                           placeholder="Enter your email" {...field} />
                                                </FormControl>
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
                )}
                {isUserFound && !resetPasswordSuccess && (
                    <ResetPW getEmail={submittedEmail} onResetSuccess={handleResetSuccess} />
                )}
                {resetPasswordSuccess && <ResetSuccess />}
            </div>
        </div>
    );
}
  