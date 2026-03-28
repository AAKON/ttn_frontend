import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Checkmark} from "@/icons";
import Button from "@/components/shared/button";
import Link from "next/link";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useToast} from "@/hooks/use-toast";
import {regAuth} from "@/services/auth/auth";
import {useRouter} from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import {Loader2} from "lucide-react";

const formSchema = z.object({
    first_name: z
        .string()
        .min(2, {message: "Must have at least 2 character"}),
    last_name: z
        .string()
        .min(2, {message: "Must have at least 2 character"}),
    email: z
        .string()
        .min(3, {message: "Must have at least 3 character"})
        .email({
            message: "Must be a valid email",
        }),
    password: z
        .string()
        .min(8, {message: "Password must be at least 8 characters long"})
        .regex(/[^A-Za-z0-9]/, {
            message: "Password must contain a special character",
        }),
    password_confirmation: z
        .string()
        .min(8, {message: "Password must be at least 8 characters long"})
        .regex(/[^A-Za-z0-9]/, {
            message: "Password must contain a special character",
        }),
})
.refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"], // Target the confirmation field
    message: "Passwords do not match",
});

export const Seller = () => {
    const {toast} = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: ""
        },
    });

    const [isValidLength, setIsValidLength] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);
    const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);

    // Password validation function
    const validatePassword = (password, confirmPassword) => {
        setIsValidLength(password.length >= 8);
        setHasSpecialChar(/[^A-Za-z0-9]/.test(password));
        setDoPasswordsMatch(password === confirmPassword);
    };

    const handleSubmit = async (data) => {
        setLoading(true);
        const postData = {
            user_type: "seller",
            ...data
        };
        try {
            const result = await regAuth(postData, toast);
            if (result.status && result.code === 200) {
                router.push("/login");
            }
        } catch (error) {
            console.log("Error in registration:", error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="w-full sm:w-[480px] mx-auto pb-20">
            <div className="text-center pt-2">
                <h1 className="auth_title">Create an account</h1>
                <p className="gray-500 pt-3">Sub text goes or stays here</p>
            </div>
            <div className="auth-form pt-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="first_name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="afrm-label">First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-[#667085] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-0 outline-0"
                                                    placeholder="Enter your first name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="last_name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="afrm-label">Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-[#667085] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-0 outline-0"
                                                    placeholder="Enter your last name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="afrm-label">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                className="text-[#667085] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-0 outline-0"
                                                placeholder="Enter your email"
                                                {...field}
                                            />
                                        </FormControl>
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
                                            <Input
                                                type="password"
                                                placeholder="********"
                                                className="text-[#667085] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-0 outline-0"
                                                {...field}
                                                {...form.register("password", {
                                                    onChange: (e) => {
                                                        const password = e.target.value;
                                                        const confirmPassword = form.getValues("password_confirmation");
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
                                name="password_confirmation"
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
                                                {...form.register("password_confirmation", {
                                                    onChange: (e) => {
                                                        const confirmPassword = e.target.value;
                                                        const password = form.getValues("password");
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
                            <Button className="w-full mt-2" type="submit">
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                        Please wait
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                            <p className="text-gray-500 text-md text-center">or</p>
                            <Button secondary className="w-full" type="button" onClick={() => signIn("google", { callbackUrl: "/" })}>
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
                        href="/login"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};
