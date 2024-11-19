import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";
import {Input} from "@/components/ui/input";
import {Checkmark} from "@/icons";
import Button from "@/components/ui/button";
import {BackLink} from "@/components/auth/backLink";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {resetPassword} from "@/services/auth/auth";
import {useToast} from "@/hooks/use-toast";

const formSchema = z
    .object({
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' })
            .regex(/[^A-Za-z0-9]/, {
                message: 'Password must contain a special character',
            }),
        password_confirmation: z.string(),
        otp: z.string().min(6, {
            message: "OTP must be 6 characters.",
        }),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: 'Passwords do not match',
        path: ['password_confirmation'],
    });

export const ResetPW = ({getEmail, onResetSuccess }) => {

    const { toast } = useToast();
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
            password_confirmation: '',
            otp: ""
        },
    });

    const handleResetPW = async (data) => {

        const postData = {
            email: getEmail,
            ...data,
        }

        try {
            const result = await resetPassword(postData, toast);
            if (result.status && result.code === 200) {
                onResetSuccess(true);
            }
        }catch (error){
            console.log('Error in reset password:', error.message);
        }

    }

    return (
        <div className="w-full sm:w-[360px] mx-auto">
            <div className="text-center pt-2">
                <h1 className="auth_title">Set new password</h1>
                <p className="gray-500 pt-3">Your new password must be different to previously used
                    passwords.</p>
            </div>
            <div className="auth-form pt-10">
                <Form  {...form}>
                    <form onSubmit={form.handleSubmit(handleResetPW)}>
                        <div className="grid grid-cols-1 gap-4">
                            <FormField
                                control={form.control}
                                name="otp"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>One-Time Password</FormLabel>
                                        <FormControl>
                                            <InputOTP maxLength={6} {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0}/>
                                                    <InputOTPSlot index={1}/>
                                                    <InputOTPSlot index={2}/>
                                                    <InputOTPSlot index={3}/>
                                                    <InputOTPSlot index={4}/>
                                                    <InputOTPSlot index={5}/>
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormDescription>
                                            Please enter OTP sent to your email.
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
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
                                name="password_confirmation"
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
                <BackLink title="Back to log in" link="/login"/>
            </div>
        </div>
    )
}