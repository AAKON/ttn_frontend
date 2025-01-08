import React, {useState} from "react";
import {Loader2} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {Textarea} from "@/components/ui/textarea";
import Button from "@/components/shared/button";
import {X} from "lucide-react";
import {Input} from "@/components/ui/input";
import {formLabelClasses, inputClasses} from "@/components/company/email-card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {useToast} from "@/hooks/use-toast";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {submitCompanyReport} from "@/services/contact/submitForm";


// Define the schema with Zod
const formSchema = z.object({
    name: z.string().min(3, {message: "Name is required."}),
    email: z.string().email({message: "Invalid email address."}),
    subject: z.string().optional(),
    phone: z.string().optional(),
    message: z.string().min(5, {message: "Message is required."}),
});


const ReportCard = ({companyId, setreport}) => {
    const {toast} = useToast();
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        setreport(false);
    };

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
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
            const result = await submitCompanyReport(modifiedFormData, toast);
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
                    <CardHeader className="space-y-4">
                        <div className="flex items-start justify-between">
                            <CardTitle>Report</CardTitle>
                            <CardDescription onClick={handleClick} className="cursor-pointer">
                                <X className="text-[16px]"/>
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="px-4 pb-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className={formLabelClasses}>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className={inputClasses}
                                            placeholder="Enter your name"
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
                            name="phone"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className={formLabelClasses}>Phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            className={inputClasses}
                                            placeholder="Enter phone"
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
                                "Submit Report"
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};

function ReportContent() {
    return (
        <div className="flex gap-2">
            <Checkbox
                id="terms1"
                className="px-0 py-0 h-4 w-4 bg-transparent border-gray-400 data-[state=checked]:bg-transparent data-[state=checked]:text-black data-[state=checked]:text-xs"
            />
            <div className="grid gap-1.5">
                <Label
                    htmlFor="terms1"
                    className="text-sm text-gray-700 font-medium leading-[20px]"
                >
                    Your reason here
                </Label>
                <p className="text-sm text-gray-600 font-medium leading-[20px]">
                    Save my login details for next time.
                </p>
            </div>
        </div>
    );
}

export default ReportCard;
