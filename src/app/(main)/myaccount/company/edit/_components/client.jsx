'use client'
import React, {useEffect, useState} from 'react';
import Button from "@/components/shared/button";
import ExistingClients from "@/app/(main)/myaccount/company/edit/[slug]/_components/existing-clients";
import DragDropFile from "@/components/shared/DragDropFile";
import {useToast} from "@/hooks/use-toast";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {
    Form
} from "@/components/ui/form";
import {Loader2} from "lucide-react";
import {getCompanyProducts, uploadProductReq} from "@/services/product";
import {companyClientReq, getCompanyClients} from "@/services/company";

const formSchema = z.object({
    file: z.any().refine(val => val.length > 0, "File is required"),
});

function MyClients({slug, allClients}) {
    const [loading, setLoading] = useState(false);
    const [ClientData, setClientData] = useState(null);
    const [error, setError] = useState(null);
    const { toast } = useToast();

    const fetchClientData = async () => {
        try {
            setLoading(true); // Optional: Show loading when refetching
            const response = await getCompanyClients(slug);
            setClientData(response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClientData();
    }, [slug]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            file: [],
        },
    });
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = form;

    // Function to handle form submission
    const onSubmit = async (data) => {

        setLoading(true);

        console.log(data, "get client data");
        const formData = new FormData();
        if (data.file && data.file.length > 0) {
            formData.append('image', data.file[0]);
        }

        try {
            const result = await companyClientReq(slug, formData, toast);
            if (result.status && result.code === 200) {
                reset({ file: null });
            }
        } catch (error) {
            console.log("Error in client create:", error.message);
        } finally {
            setLoading(false);
        }
    };

    console.log(ClientData, 'gggt ClientData')

    return (
        <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-8">
                Clients
            </h3>
            <p className="text-sm text-gray-900 mb-2">Client logo</p>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DragDropFile name="file" control={control} defaultValue={watch('file')} />
                    <Button secondary type="submit" className="mt-4 w-full h-9">
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            "Done"
                        )}
                    </Button>
                </form>
            </Form>

            <div className="mt-5">
                <p className="text-sm text-gray-900 mb-2">Existing Clients</p>
                {ClientData && Array.isArray(ClientData) && ClientData.length > 0 && (
                <div className="grid grid-cols-1 gap-4">
                    {ClientData?.map((item) => (
                        <ExistingClients key={item?.id} item={item}/>
                    ))}
                </div>)}
            </div>
        </div>
    );
}

export default MyClients;