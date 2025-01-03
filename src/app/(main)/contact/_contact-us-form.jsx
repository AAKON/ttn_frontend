"use client";
import {Loader2} from "lucide-react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import Button from "@/components/shared/button";
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
import {Checkbox} from "@/components/ui/checkbox";
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from "@/components/ui/select";
import React, {useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {Label} from "@/components/ui/label";
import {submitContactForm} from "@/services/contact/submitForm";

// Define the schema with Zod
const formSchema = z.object({
    company_name: z.string().min(2, {message: "Company Name is required."}),
    fname: z.string().optional(),
    lname: z.string().optional(),
    email: z.string().email({message: "Invalid email address."}),
    countryCode: z.string().optional(),
    phoneNumber: z.string().optional(),
    message: z.string().optional(),
    interest: z.array(z.string()).optional(),
});

// Input style
export const inputClasses =
    "block w-full border border-gray-200 rounded-md px-2 py-2 focus-visible:ring-0  focus-visible:ring-offset-0";
export const formLabelClasses = "text-gray-900 font-medium";

function ContactUsForm() {
    const {toast} = useToast();
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company_name: "",
            fname: "",
            lname: "",
            email: "",
            countryCode: "US",
            phoneNumber: "",
            message: "",
            interest: [],
        },
    });

    const modifyFormData = (data) => {
        const company_name = data?.company_name;
        const email = data?.email;
        const message = data?.message;
        const name = `${data.fname} ${data.lname}`.trim();
        const phone = `${data.countryCode}-${data.phoneNumber}`.trim();
        const interests = data.interest.join(", ");
        // Return the modified data
        return {
            company_name,
            email,
            message,
            name,
            phone,
            interests,
        };
    };

    const onSubmit = async (data) => {
        setLoading(true);
        const modifiedFormData = modifyFormData(data);

        try {
            const result = await submitContactForm(modifiedFormData, toast);
            if (result?.status && result?.code === 200) {
                form.reset();
            } else {
                console.log("Error in form submission:", result?.message);
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const interests = [
        "Company Listing",
        "Buying/Sourcing Partnership",
        "Seller/Vendor Partnership",
        "Digital Company Audit",
        "Branding & Marketing",
        "Media Partnership",
        "Agent/Trading Partnership",
        "Business Consultation",
        "Business Claim",
        "Support",
        "thers"
    ]

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6 p-4"
            >


                <FormField
                    control={form.control}
                    name="interest"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className={formLabelClasses}>Interest</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                            >
                                <FormControl>
                                    <SelectTrigger
                                        className="focus:ring-0 focus:ring-offset-0 focus:outline-0 rounded-lg border border-gray-200 text-gray-500 text-base font-normal">
                                        <SelectValue placeholder="Select interest"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {interests.map((item, index) => (
                                        <SelectItem
                                            key={index}
                                            className={"text-bass !text-gray-900"}
                                            value={item}
                                        >
                                            {item}
                                        </SelectItem>))}
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                {/* Company Name */}
                <FormField
                    control={form.control}
                    name="company_name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className={formLabelClasses}>Company Name*</FormLabel>
                            <FormControl>
                                <Input
                                    className={inputClasses}
                                    placeholder="Company Name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {/* First Name and Last Name */}
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="fname"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={formLabelClasses}>First Name</FormLabel>
                                <FormControl>
                                    <Input
                                        className={inputClasses}
                                        placeholder="First Name"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lname"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={formLabelClasses}>Last Name</FormLabel>
                                <FormControl>
                                    <Input
                                        className={inputClasses}
                                        placeholder="Last Name"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className={formLabelClasses}>Email*</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    className={inputClasses}
                                    placeholder="Enter your email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {/* Phone Number */}
                <FormField
                    control={form.control}
                    name="countryCode"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className={formLabelClasses}>Phone Number</FormLabel>
                            <div className="grid grid-cols-[auto_1fr]">
                                {/* Country Code Dropdown */}
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger
                                            className="rounded-tr-none rounded-br-none focus:ring-0 focus:ring-offset-0 focus:outline-0 border border-r-0 border-gray-200 text-gray-500 text-base font-normal">
                                            <SelectValue placeholder="Select"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem
                                            className={"text-bass !text-gray-900"}
                                            value="US"
                                        >
                                            US
                                        </SelectItem>
                                        <SelectItem
                                            className={"text-bass !text-gray-900"}
                                            value="CA"
                                        >
                                            CA
                                        </SelectItem>
                                        <SelectItem
                                            className={"text-bass !text-gray-900"}
                                            value="GB"
                                        >
                                            GB
                                        </SelectItem>
                                        <SelectItem
                                            className={"text-bass !text-gray-900"}
                                            value="BD"
                                        >
                                            BD
                                        </SelectItem>
                                        {/* Add more countries as needed */}
                                    </SelectContent>
                                </Select>

                                {/* Phone Number Input */}
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({field}) => (
                                        <FormControl className="flex-1">
                                            <Input
                                                className={`!border-l-0 !rounded-tl-none !rounded-bl-none ${inputClasses}`}
                                                placeholder="+880 1234567890"
                                                {...field}
                                            />
                                        </FormControl>
                                    )}
                                />
                            </div>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {/* Message */}
                <FormField
                    control={form.control}
                    name="message"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className={formLabelClasses}>Message</FormLabel>
                            <FormControl>
                                <Textarea
                                    className={`resize-none min-h-[128px] ${inputClasses}`}
                                    placeholder="Enter your message..."
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button type="submit" disabled={loading} className="w-full text-white">
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                            Please wait
                        </>
                    ) : (
                        "Send"
                    )}
                </Button>
            </form>
        </Form>
    );
}

export default ContactUsForm;
