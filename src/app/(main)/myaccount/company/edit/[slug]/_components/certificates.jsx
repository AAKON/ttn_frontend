'use client'
import React, {useEffect, useState} from 'react';
import Button from "@/components/shared/button";
import {useToast} from "@/hooks/use-toast";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {z} from "zod";
import {Loader2} from "lucide-react";
import FaqSkeleton from "@/components/shared/skelton/FaqMakerSkeleton";
import DropDownTags from "@/components/ui/dropDownTags";
import {companyCertificateReq, getCompanyBasic} from "@/services/company";

const formSchema = z.object({
    certificates: z
        .array(z.any())
        .min(1, {message: "Please add at least one certificates."}),
});

function MyCertificates({slug, basic, preData}) {
    const [loading, setLoading] = useState(false);
    const {toast} = useToast();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            certificates: [],
        },
    });
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: {errors},
    } = form;

    // Options for the select dropdown
    const tagOptions =
        preData?.certificates?.map((item) => ({
            label: item.name,
            value: item.id,
        })) || [];

    const initialCompliances =
        (basic?.certificates &&
            Array.isArray(basic?.certificates) &&
            basic?.certificates.length > 0 &&
            basic?.certificates?.map((item) => ({
                label: item.name,
                value: item.id,
            }))) ||
        [];

    useEffect(() => {
        if (basic) {
            if (basic?.certificates) {
                setValue("certificates", initialCompliances || []);
            }
        }
    }, [basic, setValue]);

    // Function to handle form submission
    const onSubmit = async (data) => {

        setLoading(true);
        const {
            certificates
        } = data;
        const formData = new FormData();
        // Normalize the data to extract values
        const normalizedCompliances = certificates.map((item) =>
            typeof item === "object" ? item.value : item
        );
        normalizedCompliances.forEach((value, index) => {
            formData.append(`certificates[${index}]`, value);
        });

        try {
            const result = await companyCertificateReq(slug, formData, toast);
            if (result.status && result.code === 200) {
                // reset({file: null});
                await getCompanyBasic(slug);
            }
        } catch (error) {
            console.log("Error in certificate create:", error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-100">

            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormField
                        control={control}
                        name="certificates"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Certificates</FormLabel>
                                <DropDownTags
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={tagOptions}
                                />
                                <FormMessage>{errors.tags?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="mt-4 h-9">
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                Please wait
                            </>
                        ) : (
                            "Done"
                        )}
                    </Button>
                </form>
            </Form>

        </div>);
}

export default MyCertificates;