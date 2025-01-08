"use client";
import React, {useState} from 'react';
import Button from "@/components/shared/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Loader2, X} from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {formLabelClasses, inputClasses} from "@/components/company/email-card";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

const formSchema = z.object({

});

function Claim(props) {
    const isUserLoggedIn = false;
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false); // Add a loading state
    const router = useRouter();

    const handleClaim = () => {
        if (isUserLoggedIn) {
            setIsOpen(true);
        } else {
            router.push("/login");
        }
    };

    const handleDialogClose = () => {
        setIsOpen(false);
    };

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = form;

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setIsOpen(false); // Close the dialog after submission
        }, 2000);
    };


    return (
        <>
            <Button
                secondary
                className="!bg-transparent !text-gray-700 border lg:text-[16px] text-[14px] !font-semibold !border-gray-200 lg:!h-[48px] lg:w-[190px] h-9 w-[270px]"
                onClick={handleClaim}
            >
                Claim this Business
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Claim Business</DialogTitle>
                        <DialogDescription>
                            Please provide your message to claim this business.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField
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
                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="h-9 min-w-40"
                                    >
                                        {loading ? "Submitting..." : "Submit"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Claim;