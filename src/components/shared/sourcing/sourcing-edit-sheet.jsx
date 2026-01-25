"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import Button from "@/components/shared/button";
import { SearchableSelect } from "@/components/ui/searchable-select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { TiptapEditor } from "@/components/ui/tiptap-editor";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ArrowRight, CheckIcon, Loader2, X as XIcon } from "lucide-react";
import StepFormDragDropFile from "@/components/shared/StepFormDragDropFile";
import {
    getSourcingFilterOptions,
    getSourcingDetails,
} from "@/services/sourcing/index";

import { updateSourcingProposal, deleteSourcingImage } from "@/services/sourcing-update";

import { searchCompanies } from "@/services/company";
import { getSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import RequiredStar from "../required-star";

// Move formSchema inside the component to access dynamic prefixes
const createFormSchema = (locations) => {
    const validateWithPrefix = (val, codeField) => {
        if (!val || val.trim() === "") return true;
        const location = locations?.find((loc) => loc.country_code === codeField);
        const prefix = location?.phone_code || "";

        const cleanVal = val.replace(/[\s-]/g, "");
        if (prefix && !cleanVal.startsWith(prefix)) return false;

        const digits = val.replace(/\D/g, "");
        return digits.length >= 10 && digits.length <= 15;
    };

    return z
        .object({
            category: z.string().min(1, "Category is required"),
            country: z.string().min(1, "Country is required"),
            company_name: z.string().min(1, "Company Name is required"),
            email: z.string().email("Invalid email address").min(1, "Email is required"),
            phone_code: z.string().optional(),
            phone: z.string().optional(),
            whatsapp_code: z.string().optional(),
            whatsapp: z.string().optional(),
            title: z.string().min(1, "Proposal Title is required"),
            description: z.string().min(1, "Description is required"),
            quantity: z.string().optional(),
            quantity_unit: z.string().optional(),
            target_price: z.string().optional(),
            currency: z.string().optional(),
            payment_method: z.string().optional(),
            delivery_info: z.string().optional(),
            images: z.array(z.any()).optional(),
        })
        .superRefine((data, ctx) => {
            if (!validateWithPrefix(data.phone, data.phone_code)) {
                const loc = locations?.find((l) => l.country_code === data.phone_code);
                const prefix = loc?.phone_code || "";
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `Enter a valid number start with ${prefix}.`,
                    path: ["phone"],
                });
            }
            if (!validateWithPrefix(data.whatsapp, data.whatsapp_code)) {
                const loc = locations?.find((l) => l.country_code === data.whatsapp_code);
                const prefix = loc?.phone_code || "";
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `Enter a valid number start with ${prefix}.`,
                    path: ["whatsapp"],
                });
            }
        });
};

export default function SourcingEditSheet({ open, onOpenChange, proposalId, onSuccess }) {
    const { toast } = useToast();
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [step, setStep] = useState(1);
    const [mounted, setMounted] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [filterOptions, setFilterOptions] = useState({
        categories: [],
        locations: [],
    });
    const [fetchingOptions, setFetchingOptions] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [companySuggestions, setCompanySuggestions] = useState([]);
    const [loadingCompanies, setLoadingCompanies] = useState(false);
    const [showCompanySuggestions, setShowCompanySuggestions] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [selectedCompanySlug, setSelectedCompanySlug] = useState("");

    // Re-create schema when locations change
    const dynamicSchema = React.useMemo(
        () => createFormSchema(filterOptions.locations),
        [filterOptions.locations],
    );

    const form = useForm({
        resolver: zodResolver(dynamicSchema),
        mode: "onBlur",
        defaultValues: {
            category: "",
            country: "",
            company_name: "",
            email: "",
            phone_code: "US",
            phone: "",
            whatsapp_code: "US",
            whatsapp: "",
            title: "",
            description: "",
            quantity: "",
            quantity_unit: "yard",
            target_price: "",
            currency: "USD",
            payment_method: "bank_transfer",
            delivery_info: "",
            images: [],
        },
    });

    useEffect(() => {
        if (open && proposalId) {
            const fetchData = async () => {
                setInitialLoading(true);
                try {
                    const session = await getSession();
                    const token = session?.accessToken;

                    // Fetch options and details in parallel
                    const [optionsRes, detailsRes] = await Promise.all([
                        getSourcingFilterOptions(),
                        getSourcingDetails(proposalId, token)
                    ]);

                    if (optionsRes?.status) {
                        setFilterOptions(optionsRes.data);
                    }

                    if (detailsRes?.status) {
                        const data = detailsRes.data;
                        setSelectedCompanySlug(data.company_slug || "");

                        // Determine phone/whatsapp codes if possible, or use defaults
                        // For simplicity, we can try to match the prefix with locations
                        const parseContact = (val, fallbackIso) => {
                            if (!val) return { code: fallbackIso || "US", number: "" };
                            // Matches 2-3 uppercase letters at start followed by a + (e.g. BD+880...)
                            const match = val.match(/^([A-Z]{2,3})(\+.*)$/);
                            if (match) {
                                return { code: match[1], number: match[2] };
                            }
                            return { code: fallbackIso || "US", number: val };
                        };

                        const phoneData = parseContact(data.phone, data.location?.country_code);
                        const whatsappData = parseContact(data.whatsapp, data.location?.country_code);

                        form.reset({
                            category: data.product_categories?.[0]?.id?.toString() || "",
                            country: data.location_id?.toString() || "",
                            company_name: data.company_name || "",
                            email: data.email || "",
                            phone_code: phoneData.code,
                            phone: phoneData.number,
                            whatsapp_code: whatsappData.code,
                            whatsapp: whatsappData.number,
                            title: data.title || "",
                            description: data.description || "",
                            quantity: data.quantity || "",
                            quantity_unit: data.unit || "yard",
                            target_price: data.price || "",
                            currency: data.currency || "USD",
                            payment_method: data.payment_method || "bank_transfer",
                            delivery_info: data.delivery_info || "",
                            images: data.images_urls?.map((img) => ({
                                id: img.id,
                                url: img.original,
                                isExisting: true,
                                name: img.file_name
                            })) || [],
                        });
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: "Failed to load proposal details.",
                    });
                } finally {
                    setInitialLoading(false);
                }
            };
            fetchData();
        } else if (!open) {
            setStep(1);
            form.reset();
            setSelectedCompanySlug("");
        }
    }, [open, proposalId]);

    const fetchCompanySuggestions = async (searchTerm) => {
        if (!searchTerm || searchTerm.length < 2) {
            setCompanySuggestions([]);
            setShowCompanySuggestions(false);
            return;
        }

        setLoadingCompanies(true);
        try {
            const response = await searchCompanies(searchTerm);
            const companies = response?.data?.data;
            if (companies && Array.isArray(companies)) {
                setCompanySuggestions(companies);
                setShowCompanySuggestions(companies.length > 0);
            } else {
                setCompanySuggestions([]);
                setShowCompanySuggestions(false);
            }
        } catch (error) {
            console.error("Error fetching companies:", error);
        } finally {
            setLoadingCompanies(false);
        }
    };

    const handleCompanyNameChange = (value, onChange) => {
        onChange(value);
        if (searchTimeout) clearTimeout(searchTimeout);
        const timeout = setTimeout(() => {
            fetchCompanySuggestions(value);
        }, 300);
        setSearchTimeout(timeout);
    };

    const handleSelectCompany = (company, onChange) => {
        onChange(company.name);
        setSelectedCompanySlug(company.slug || "");
        setShowCompanySuggestions(false);
        setCompanySuggestions([]);
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const session = await getSession();
            const token = session?.accessToken;

            if (!token) {
                toast({
                    variant: "destructive",
                    title: "Authentication required",
                    description: "Please log in to update your proposal.",
                });
                return;
            }

            const formData = new FormData();
            formData.append("product_category_ids[0]", data.category);
            formData.append("location_id", data.country);
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("quantity", data.quantity || "");
            formData.append("unit", data.quantity_unit || "");
            formData.append("price", data.target_price || "");
            formData.append("currency", data.currency || "");
            formData.append("payment_method", data.payment_method || "");
            formData.append("company_name", data.company_name);
            formData.append("company_slug", selectedCompanySlug);
            formData.append("email", data.email);

            const cleanContactValue = (val) => {
                if (!val) return "";
                const digits = val.replace(/\D/g, "");
                // Only send if it matches the valid full number length (10-15 digits)
                if (digits.length >= 10 && digits.length <= 15) {
                    return val.replace(/[\s-]/g, ""); // Strip spaces and hyphens for API
                }
                return "";
            };

            const countryCode = data.phone_code || "";
            formData.append("country_code", countryCode);
            formData.append("phone", countryCode + cleanContactValue(data.phone));
            formData.append("whatsapp", (data.whatsapp_code || "") + cleanContactValue(data.whatsapp));
            formData.append("delivery_info", data.delivery_info || "");

            if (data.images && data.images.length > 0) {
                let imgIndex = 0;
                data.images.forEach((item) => {
                    if (item instanceof File) {
                        formData.append(`images[${imgIndex}]`, item);
                        imgIndex++;
                    }
                });
            }

            const response = await updateSourcingProposal(proposalId, formData, null, token);

            if (response) {
                if (response.status) {
                    showSuccessToast(toast, response.message || "Proposal updated successfully.", { position: "left" });
                    onOpenChange(false);
                    if (onSuccess) onSuccess();
                } else {
                    showErrorToast(toast, response.message || "Failed to update proposal.", { position: "left" });
                }
            }
        } catch (error) {
            console.error("Update error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageRemove = async (file) => {
        if (file && file.isExisting && file.id) {
            try {
                const session = await getSession();
                const token = session?.accessToken;
                if (!token) {
                    showErrorToast(toast, "Authentication required to delete images.", { position: "left" });
                    return false;
                }

                const response = await deleteSourcingImage(proposalId, file.id, null, token);

                if (response?.status) {
                    showSuccessToast(toast, response?.message || "Image deleted successfully.", { position: "left" });
                    return true;
                } else {
                    showErrorToast(toast, response?.message || "Failed to delete image. You might not have permission.", { position: "left" });
                    return false;
                }
            } catch (error) {
                console.error("Error deleting image:", error);
                showErrorToast(toast, "An unexpected error occurred while deleting the image.", { position: "left" });
                return false;
            }
        }
        return true;
    };

    const nextStep = async () => {
        const result = await form.trigger([
            "category",
            "country",
            "company_name",
            "email",
            "phone",
            "whatsapp",
        ]);
        if (result) setStep(2);
    };
    const prevStep = () => setStep(1);

    if (!open) return null;

    const isStep1Complete = form.watch([
        "category",
        "country",
        "company_name",
        "email",
    ]).every((val) => val && val.length > 0);

    const isStep2Complete = form.watch([
        "title",
        "description",
    ]).every((val) => val && val.length > 0);

    const content = (
        <>
            <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in" />
            <div
                className={`fixed inset-y-0 right-0 z-[10001] w-full bg-white shadow-2xl transition-transform duration-300 ease-in-out transform ${isDesktop ? "sm:max-w-[540px]" : "h-[85vh] sm:h-full bottom-0 top-auto rounded-t-[20px]"} ${mounted ? "translate-x-0 translate-y-0" : "translate-x-full translate-y-full"} flex flex-col overflow-hidden`}
            >
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute size-5 p-1 right-4 top-4 rounded-sm bg-transparent text-gray-700"
                >
                    <XIcon className="w-5 h-5 text-foreground" />
                </button>

                <div className="flex sm:text-left py-4 px-8 flex-row justify-between items-center space-y-0 text-left border-b border-gray-200">
                    <h2 className="text-foreground text-lg font-bold">
                        Edit Sourcing Proposal
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
                    {initialLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <Loader2 className="w-8 h-8 animate-spin text-brand-700" />
                        </div>
                    ) : (
                        <div className="p-6">
                            <div className="flex items-center justify-center p-6 relative">
                                <div className="flex justify-between w-full relative z-0">
                                    <div
                                        className="flex items-center gap-2 cursor-pointer bg-white px-2"
                                        onClick={() => setStep(1)}
                                    >
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${step > 1 || isStep1Complete ? "border-brand-700 text-brand-700" : "border-gray-600 text-transparent"}`}
                                        >
                                            <CheckIcon className="w-3.5 h-3.5" strokeWidth={3} />
                                        </div>
                                        <span className={`text-sm font-medium ${step > 1 || isStep1Complete ? "text-brand-700" : "text-gray-600"}`}>
                                            Basic Info
                                        </span>
                                    </div>

                                    <div
                                        className="flex items-center gap-2 cursor-pointer bg-white px-2"
                                        onClick={() => step > 1 && setStep(2)}
                                    >
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isStep2Complete ? "border-brand-600 text-brand-600" : "border-gray-600 text-transparent"}`}
                                        >
                                            <CheckIcon className="w-3.5 h-3.5" strokeWidth={3} />
                                        </div>
                                        <span className={`text-sm font-medium ${isStep2Complete ? "text-brand-600" : "text-gray-600"}`}>
                                            Inquiry Details
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className={`w-full h-2 rounded-full mb-8 relative overflow-hidden ${step === 1 ? "bg-gray-300" : "bg-brand-600"}`}>
                                <div className={`absolute top-0 h-full transition-all duration-300 ease-in-out rounded-full ${step === 1 ? "bg-brand-600" : "bg-brand-700"} ${!isStep2Complete ? "w-1/2" : "w-full"}`} />
                            </div>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    {step === 1 && (
                                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                            <div className="bg-gray-50 p-4 rounded-[8px] space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="category"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-sm text-gray-900">
                                                                    Category <RequiredStar />
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <SearchableSelect
                                                                        options={filterOptions.categories?.map((cat) => ({
                                                                            value: cat.id.toString(),
                                                                            label: cat.name,
                                                                        }))}
                                                                        onValueChange={field.onChange}
                                                                        value={field.value}
                                                                        placeholder={fetchingOptions ? "Loading..." : "Select category"}
                                                                        triggerClassName="text-gray-500 bg-white h-10"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="country"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-sm text-gray-900">
                                                                    Country <RequiredStar />
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <SearchableSelect
                                                                        options={filterOptions.locations?.map((loc) => ({
                                                                            value: loc.id.toString(),
                                                                            label: loc.name,
                                                                        }))}
                                                                        onValueChange={field.onChange}
                                                                        value={field.value}
                                                                        placeholder={fetchingOptions ? "Loading..." : "Select country"}
                                                                        triggerClassName="text-gray-500 bg-white h-10"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <FormField
                                                    control={form.control}
                                                    name="company_name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm text-gray-900">
                                                                Company Name <RequiredStar />
                                                            </FormLabel>
                                                            <FormControl>
                                                                <div className="relative company-autocomplete-container">
                                                                    <Input
                                                                        className="focus:ring-0"
                                                                        placeholder="Type your company name"
                                                                        {...field}
                                                                        onChange={(e) => handleCompanyNameChange(e.target.value, field.onChange)}
                                                                        autoComplete="off"
                                                                    />
                                                                    {loadingCompanies && (
                                                                        <div className="absolute right-3 top-2.5">
                                                                            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                                                                        </div>
                                                                    )}
                                                                    {showCompanySuggestions && companySuggestions.length > 0 && (
                                                                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                                                            {companySuggestions.map((company) => (
                                                                                <div
                                                                                    key={company.id}
                                                                                    className="px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors text-sm text-gray-900"
                                                                                    onClick={() => handleSelectCompany(company, field.onChange)}
                                                                                >
                                                                                    {company.name}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div className="bg-gray-50 p-4 rounded-[8px] space-y-4">
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm text-gray-900">
                                                                Email <RequiredStar />
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input className="focus:ring-0" placeholder="Ex: demo@email.com" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm text-gray-900">Phone</label>
                                                        <div className="flex gap-2">
                                                            <FormField
                                                                control={form.control}
                                                                name="phone_code"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormControl>
                                                                            <SearchableSelect
                                                                                options={Array.from(new Set(filterOptions.locations?.map((loc) => loc.country_code).filter(Boolean))).map((code) => ({ value: code, label: code }))}
                                                                                onValueChange={(val) => {
                                                                                    field.onChange(val);
                                                                                    const loc = filterOptions.locations?.find((l) => l.country_code === val);
                                                                                    if (loc?.phone_code) {
                                                                                        form.setValue("phone", loc.phone_code, { shouldValidate: true });
                                                                                    }
                                                                                }}
                                                                                value={field.value}
                                                                                triggerClassName="w-[80px] text-gray-500 bg-white h-10"
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name="phone"
                                                                render={({ field }) => (
                                                                    <FormItem className="flex-1">
                                                                        <FormControl>
                                                                            <Input
                                                                                className="focus:ring-0"
                                                                                placeholder="Ex: 123654789"
                                                                                {...field}
                                                                                onChange={(e) => {
                                                                                    const value = e.target.value;
                                                                                    if (/^[0-9+\s-]*$/.test(value)) {
                                                                                        field.onChange(value);
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <FormMessage>
                                                            {form.formState.errors.phone?.message ||
                                                                form.formState.errors.phone_code?.message}
                                                        </FormMessage>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-gray-900">WhatsApp</label>
                                                        <div className="flex gap-2">
                                                            <FormField
                                                                control={form.control}
                                                                name="whatsapp_code"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormControl>
                                                                            <SearchableSelect
                                                                                options={Array.from(new Set(filterOptions.locations?.map((loc) => loc.country_code).filter(Boolean))).map((code) => ({ value: code, label: code }))}
                                                                                onValueChange={(val) => {
                                                                                    field.onChange(val);
                                                                                    const loc = filterOptions.locations?.find((l) => l.country_code === val);
                                                                                    if (loc?.phone_code) {
                                                                                        form.setValue("whatsapp", loc.phone_code, { shouldValidate: true });
                                                                                    }
                                                                                }}
                                                                                value={field.value}
                                                                                triggerClassName="w-[80px] text-gray-500 bg-white h-10"
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name="whatsapp"
                                                                render={({ field }) => (
                                                                    <FormItem className="flex-1">
                                                                        <FormControl>
                                                                            <Input
                                                                                className="focus:ring-0"
                                                                                placeholder="Ex: 123654789"
                                                                                {...field}
                                                                                onChange={(e) => {
                                                                                    const value = e.target.value;
                                                                                    if (/^[0-9+\s-]*$/.test(value)) {
                                                                                        field.onChange(value);
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <FormMessage>
                                                            {form.formState.errors.whatsapp?.message ||
                                                                form.formState.errors.whatsapp_code?.message}
                                                        </FormMessage>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                            <FormField
                                                control={form.control}
                                                name="title"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium text-gray-900">Proposal Title</FormLabel>
                                                        <FormControl>
                                                            <Input className="focus:ring-0" placeholder="Type proposal title" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium text-gray-900">Proposal Description</FormLabel>
                                                        <FormControl>
                                                            <TiptapEditor
                                                                placeholder="Enter a description..."
                                                                className="min-h-[100px]"
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <FormLabel className="text-sm font-medium text-gray-900">Quantity</FormLabel>
                                                    <div className="flex gap-2">
                                                        <FormField
                                                            control={form.control}
                                                            name="quantity"
                                                            render={({ field }) => (
                                                                <FormItem className="flex-1">
                                                                    <FormControl>
                                                                        <div className="relative">
                                                                            <span className="absolute left-3 top-2.5 text-gray-500 text-sm">qty</span>
                                                                            <Input className="pl-10 focus:ring-0" {...field} />
                                                                        </div>
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="quantity_unit"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <SearchableSelect
                                                                        options={[
                                                                            { value: "pieces", label: "Pieces" },
                                                                            { value: "kg", label: "Kg" },
                                                                            { value: "meter", label: "Meter" },
                                                                            { value: "yard", label: "Yard" },
                                                                            { value: "ton", label: "Ton" },
                                                                            { value: "liter", label: "Liter" },
                                                                            { value: "box", label: "Box" },
                                                                            { value: "container", label: "Container" },
                                                                        ]}
                                                                        onValueChange={field.onChange}
                                                                        value={field.value}
                                                                        triggerClassName="w-[100px] text-gray-500 bg-white h-10"
                                                                    />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <FormLabel className="text-sm font-medium text-gray-900">Target Price/Unit</FormLabel>
                                                    <div className="flex gap-2">
                                                        <FormField
                                                            control={form.control}
                                                            name="target_price"
                                                            render={({ field }) => (
                                                                <FormItem className="flex-1">
                                                                    <FormControl>
                                                                        <div className="relative">
                                                                            <span className="absolute left-3 top-2.5 text-gray-500 text-sm">$</span>
                                                                            <Input className="pl-6 focus:ring-0" {...field} />
                                                                        </div>
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="currency"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <SearchableSelect
                                                                        options={["USD", "EUR", "GBP", "JPY", "CNY", "INR", "BDT"].map((c) => ({ value: c, label: c }))}
                                                                        onValueChange={field.onChange}
                                                                        value={field.value}
                                                                        triggerClassName="w-[85px] text-gray-500 bg-white h-10"
                                                                    />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="payment_method"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium text-gray-900">Payment Methods</FormLabel>
                                                        <SearchableSelect
                                                            options={[
                                                                { value: "cash", label: "Cash" },
                                                                { value: "bank_transfer", label: "Bank Transfer" },
                                                                { value: "letter_of_credit", label: "Letter of Credit" },
                                                                { value: "paypal", label: "PayPal" },
                                                                { value: "escrow", label: "Escrow" },
                                                                { value: "credit_card", label: "Credit Card" },
                                                                { value: "advance_payment", label: "Advance Payment" },
                                                                { value: "payment_on_delivery", label: "Payment on Delivery" },
                                                            ]}
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                            placeholder="Select payment method"
                                                            triggerClassName="text-gray-500 bg-white h-10"
                                                        />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="delivery_info"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium text-gray-900">Delivery Information</FormLabel>
                                                        <FormControl>
                                                            <Input className="focus:ring-0" placeholder="Type your delivery details" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="space-y-2">
                                                <StepFormDragDropFile
                                                    name="images"
                                                    control={form.control}
                                                    onRemove={handleImageRemove}
                                                />
                                                <p className="text-xs text-gray-500 mt-1">Leave empty to keep existing images.</p>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </Form>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0 z-[10002]">
                    {step === 1 ? (
                        <div className="grid grid-cols-2 gap-4">
                            <Button TagName="div" secondary className="w-full cursor-pointer" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button className="w-full" onClick={nextStep} disabled={initialLoading}>
                                Next <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <Button TagName="div" secondary className="w-full cursor-pointer" onClick={prevStep} disabled={isSubmitting}>
                                Back
                            </Button>
                            <Button className="w-full" onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>Submitting... <Loader2 className="w-4 h-4 ml-1 animate-spin" /></>
                                ) : (
                                    <>Update <ArrowRight className="w-4 h-4 ml-1" /></>
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );

    if (!mounted) return null;
    return createPortal(content, document.body);
}
