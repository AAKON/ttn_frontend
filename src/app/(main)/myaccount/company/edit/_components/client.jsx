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
import {companyClientReq, delCompanyClient, delCompanyFaq, getCompanyClients} from "@/services/company";
import Image from "next/image";
import ConfirmDeleteDialogSm from "@/app/(main)/myaccount/company/edit/[slug]/_components/confirmDeleteDialogSm";
import FaqSkeleton from "@/components/shared/skelton/FaqMakerSkeleton";

const formSchema = z.object({
    file: z.any().refine(val => val.length > 0, "File is required"),
});

function MyClients({slug, allClients}) {
    const [loading, setLoading] = useState(true);
    const [ClientData, setClientData] = useState(null);
    const [error, setError] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const {toast} = useToast();

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
        formState: {errors},
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
                reset({file: null});
                fetchClientData();
            }
        } catch (error) {
            console.log("Error in client create:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (id) => {
        setIsDeleting(true);
        try {
            const response = await delCompanyClient(id, slug, toast);
            if (response) {
                setOpenDialog(false);
                fetchClientData();
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-8">
                Clients
            </h3>
            <p className="text-sm text-gray-900 mb-2">Client logo</p>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DragDropFile name="file" control={control} defaultValue={watch('file')}/>
                    <Button secondary type="submit" className="mt-4 w-full h-9">
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

            <div className="mt-5">
                <p className="text-sm text-gray-900 mb-3.5">Existing Clients</p>
                {loading ? (
                    <FaqSkeleton />
                ) : (
                    <>
                        {ClientData && Array.isArray(ClientData) && ClientData.length > 0 && (
                            <div className="grid grid-cols-1 gap-4">
                                {ClientData?.map((item) => (
                                    <div key={item?.id} className="flex justify-between gap-6 h-10">
                                        {item?.image_url && (
                                            <div className="h-10 flex-1">
                                                <Image src={item?.image_url} alt="image" width={40} height={40}/>
                                            </div>)}
                                        <ConfirmDeleteDialogSm
                                            open={openDialog}
                                            setOpen={setOpenDialog}
                                            onConfirm={() => handleRemove(item?.id)}
                                            isDeleting={isDeleting}
                                        />
                                    </div>
                                ))}
                            </div>)}
                    </>
                    )}
            </div>
        </div>);
}

export default MyClients;