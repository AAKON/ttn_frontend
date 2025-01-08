import React, {useState} from "react";
import {Loader2} from "lucide-react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import Button from "@/components/shared/button";
import {X} from "lucide-react";
import {useToast} from "@/hooks/use-toast";
import {submitCompanyEmail} from "@/services/contact/submitForm";

// Input style
export const inputClasses =
    "mt-[6px] focus-visible:ring-0 focus-visible:ring-offset-0";
export const formLabelClasses = "text-gray-900 text-sm font-normal";


// Define the schema with Zod
const formSchema = z.object({
    email: z.string().email({message: "Invalid email address."}),
    subject: z.string().optional(),
    message: z.string().min(5, {message: "Message is required."}),
});

const EmailCard = ({companyId, setemail}) => {
    const {toast} = useToast();
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        setemail(false);
    };

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            subject: "",
            message: "",
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);
        const modifiedFormData = {
            company_id: companyId,
            ...data
        }
        try {
            const result = await submitCompanyEmail(modifiedFormData, toast);
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

    return (
        <Card className="rounded-sm">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=""
                >
                    <CardHeader className="flex-row items-start justify-between px-4">
                        <CardTitle>Email us</CardTitle>
                        <CardDescription onClick={handleClick} className="cursor-pointer">
                            <X className="text-[16px]"/>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-4 pb-3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className={formLabelClasses}>Enter you email</FormLabel>
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
                    </CardContent>
                    <CardContent className="px-4 pb-3">
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className={formLabelClasses}>Subject</FormLabel>
                                    <FormControl>
                                        <Input
                                            className={inputClasses}
                                            placeholder="Enter subject"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardContent className="px-4 pb-3">
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
                    </CardContent>

                    <CardFooter className="mt-2.5">
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
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};

export default EmailCard;
