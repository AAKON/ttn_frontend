"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import DropDownTags from "@/components/ui/dropDownTags";

const formSchema = z.object({
    compliances: z
        .array(z.number())
        .min(1, { message: "Please add at least one compliance." }),
});

const tagOptions = [
    { label: "JavaScript", value: 1 },
    { label: "TypeScript", value: 2 },
    { label: "React", value: 3 },
    { label: "Next.js", value: 4 },
    { label: "Vue.js", value: 5 },
];

export default function FormWithDropdown() {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            compliances: [],
        },
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = form;

    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={control}
                    name="compliances"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Compliance</FormLabel>
                            <FormControl>
                                <DropDownTags
                                    value={field.value} // Sync with react-hook-form state
                                    onChange={field.onChange} // Update state on change
                                    options={tagOptions} // Pass the select options
                                />
                            </FormControl>
                            <FormMessage>{errors.compliances?.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Submit
                </button>
            </form>
        </Form>
    );
}
