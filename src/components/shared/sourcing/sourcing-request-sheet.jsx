"use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import Button from "@/components/shared/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ArrowRight, CheckIcon, Loader2 } from "lucide-react";
import StepFormDragDropFile from "@/components/shared/StepFormDragDropFile";
import {
	getSourcingFilterOptions,
	createSourcingProposal,
} from "@/services/sourcing";
import { searchCompanies } from "@/services/company";
import { getSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

const formSchema = z.object({
	category: z.string().min(1, "Category is required"),
	country: z.string().min(1, "Country is required"),
	company_name: z.string().min(1, "Company Name is required"),
	email: z.string().email("Invalid email address").min(1, "Email is required"),
	phone_code: z.string().min(1, "Phone code is required"),
	phone: z.string().min(1, "Phone is required"),
	whatsapp_code: z.string().optional(),
	whatsapp: z.string().optional(),
	title: z.string().min(1, "Proposal Title is required"),
	description: z.string().min(1, "Description is required"),
	quantity: z.string().min(1, "Quantity is required"),
	quantity_unit: z.string().min(1, "Unit is required"),
	target_price: z.string().min(1, "Target price is required"),
	currency: z.string().min(1, "Currency is required"),
	payment_method: z.string().min(1, "Payment method is required"),
	delivery_info: z.string().min(1, "Delivery info is required"),
	images: z.array(z.any()).optional(),
});

export default function SourcingRequestSheet({ open, onOpenChange }) {
	const { toast } = useToast();
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const [step, setStep] = useState(1);
	const [filterOptions, setFilterOptions] = useState({
		categories: [],
		locations: [],
	});
	const [fetchingOptions, setFetchingOptions] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	
	// Company autocomplete states
	const [companySuggestions, setCompanySuggestions] = useState([]);
	const [loadingCompanies, setLoadingCompanies] = useState(false);
	const [showCompanySuggestions, setShowCompanySuggestions] = useState(false);
	const [searchTimeout, setSearchTimeout] = useState(null);

	useEffect(() => {
		if (open) {
			const fetchOptions = async () => {
				setFetchingOptions(true);
				try {
					const response = await getSourcingFilterOptions();
					if (response?.status) {
						setFilterOptions(response.data);
					}
				} catch (error) {
					console.error("Error fetching filter options:", error);
				} finally {
					setFetchingOptions(false);
				}
			};
			fetchOptions();
		} else {
			const timer = setTimeout(() => {
				setStep(1);
				form.reset();
				setCompanySuggestions([]);
				setShowCompanySuggestions(false);
			}, 500); // Reset after closing animation
			return () => clearTimeout(timer);
		}
	}, [open]);

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (searchTimeout) {
				clearTimeout(searchTimeout);
			}
		};
	}, [searchTimeout]);

	// Close suggestions when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (showCompanySuggestions && !event.target.closest('.company-autocomplete-container')) {
				setShowCompanySuggestions(false);
			}
		};

		if (showCompanySuggestions) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [showCompanySuggestions]);

	const form = useForm({
		resolver: zodResolver(formSchema),
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

	// Fetch companies based on search term
	const fetchCompanySuggestions = async (searchTerm) => {
		if (!searchTerm || searchTerm.length < 2) {
			setCompanySuggestions([]);
			setShowCompanySuggestions(false);
			return;
		}

		setLoadingCompanies(true);
		try {
			const response = await searchCompanies(searchTerm);
			
			// API returns data in response.data.data format
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
			setCompanySuggestions([]);
			setShowCompanySuggestions(false);
		} finally {
			setLoadingCompanies(false);
		}
	};

	// Handle company name input change with debounce
	const handleCompanyNameChange = (value, onChange) => {
		onChange(value);
		
		// Clear previous timeout
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}

		// Set new timeout for debounced search
		const timeout = setTimeout(() => {
			fetchCompanySuggestions(value);
		}, 300);
		
		setSearchTimeout(timeout);
	};

	// Handle selecting a company from suggestions
	const handleSelectCompany = (company, onChange) => {
		onChange(company.name);
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
					description: "Please log in to submit a sourcing proposal.",
				});
				return;
			}

			const formData = new FormData();

			// Map values according to API requirements
			formData.append("product_category_ids[0]", data.category);
			formData.append("location_id", data.country);
			formData.append("title", data.title);
			formData.append("description", data.description);
			formData.append("quantity", data.quantity);
			formData.append("unit", data.quantity_unit);
			formData.append("price", data.target_price);
			formData.append("currency", data.currency);

			// Map payment methods to expected snake_case keys if necessary
			const paymentMapping = {
				Bank: "bank_transfer",
				Cash: "cash",
				LC: "lc",
			};
			formData.append(
				"payment_method",
				paymentMapping[data.payment_method] || data.payment_method.toLowerCase()
			);

			formData.append("company_name", data.company_name);
			formData.append("email", data.email);
			formData.append("phone", data.phone);
			formData.append("whatsapp", data.whatsapp || "");
			formData.append("delivery_info", data.delivery_info);

			// Append images
			if (data.images && data.images.length > 0) {
				data.images.forEach((file, index) => {
					if (file instanceof File) {
						formData.append(`images[${index}]`, file);
					}
				});
			}

			const response = await createSourcingProposal(formData, toast, token);

			if (response?.status) {
				form.reset();
				onOpenChange(false);
			}
		} catch (error) {
			console.error("Submission error:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const nextStep = async () => {
		const result = await form.trigger([
			"category",
			"country",
			"company_name",
			"email",
			"phone_code",
			"phone",
		]);
		if (result) {
			setStep(2);
		}
	};
	const prevStep = () => setStep(1);

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side={isDesktop ? "right" : "bottom"}
				className={`w-full ${
					isDesktop
						? "sm:max-w-[600px] sm:border-l border-gray-200"
						: "h-[90vh] rounded-t-[20px] border-t border-gray-200"
				} p-0 flex flex-col gap-0 bg-white`}
			>
				{/* Content Wrapper to handle scrolling properly */}
				<div className="flex-1 overflow-y-auto scrollbar-hide">
					<SheetHeader className="py-4 px-8 flex-row justify-between items-center space-y-0 text-left border-b border-gray-200">
						<SheetTitle className="text-lg font-bold">
							Sourcing Proposal
						</SheetTitle>
					</SheetHeader>

					{/* Stepper */}
					<div className="p-6">
						<div className="flex items-center justify-center p-6 relative">
							<div className="flex justify-between w-full relative z-0">
								{/* Step 1 Indicator */}
								<div
									className="flex items-center gap-2 cursor-pointer bg-white px-2"
									onClick={() => setStep(1)}
								>
									<div
										className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
											step >= 1 ? "border-brand-700" : "border-gray-300"
										}`}
									>
										{step >= 1 && (
											<CheckIcon className="w-3 h-3 text-brand-700" />
										)}
									</div>
									<span
										className={`text-sm font-medium ${
											step === 1 || step === 2
												? "text-brand-700"
												: "text-gray-500"
										}`}
									>
										Basic Info
									</span>
								</div>

								{/* Step 2 Indicator */}
								<div
									className="flex items-center gap-2 cursor-pointer bg-white px-2"
									onClick={() => step > 1 && setStep(2)}
								>
									<div
										className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
											step === 2 ? "border-brand-700" : "border-gray-300"
										}`}
									>
										{step === 2 && (
											<CheckIcon className="w-3 h-3 text-brand-700" />
										)}
									</div>
									<span
										className={`text-sm font-medium ${
											step === 2 ? "text-brand-700" : "text-gray-500"
										}`}
									>
										Inquiry Details
									</span>
								</div>
							</div>
						</div>

						{/* Progress Bar under tabs (Orange bar) */}
						<div className="w-full h-2 bg-gray-100 rounded-full mb-8 relative overflow-hidden">
							<div
								className={`absolute top-0 left-0 h-full bg-brand-600 transition-all duration-300 ease-in-out rounded-full ${
									step === 1 ? "w-1/2" : "w-full"
								}`}
							/>
						</div>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
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
																Category
															</FormLabel>
															<Select
																onValueChange={field.onChange}
																defaultValue={field.value}
																value={field.value}
															>
																<FormControl>
																	<SelectTrigger className="text-gray-500 focus:ring-0 focus:ring-offset-0 focus:border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-500 focus:shadow-none focus-visible:shadow-none">
																		<SelectValue
																			placeholder={
																				fetchingOptions
																					? "Loading..."
																					: "Select category"
																			}
																		/>
																	</SelectTrigger>
																</FormControl>
																<SelectContent>
																	{filterOptions.categories?.map((cat) => (
																		<SelectItem
																			key={cat.id}
																			value={cat.id.toString()}
																		>
																			{cat.name}
																		</SelectItem>
																	))}
																</SelectContent>
															</Select>
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
																Country
															</FormLabel>
															<Select
																onValueChange={field.onChange}
																defaultValue={field.value}
																value={field.value}
															>
																<FormControl>
																	<SelectTrigger className="text-gray-500 focus:ring-0 focus:ring-offset-0 focus:border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-500 focus:shadow-none focus-visible:shadow-none">
																		<SelectValue
																			placeholder={
																				fetchingOptions
																					? "Loading..."
																					: "Select country"
																			}
																		/>
																	</SelectTrigger>
																</FormControl>
																<SelectContent>
																	{filterOptions.locations?.map((loc) => (
																		<SelectItem
																			key={loc.id}
																			value={loc.id.toString()}
																		>
																			{loc.name}
																		</SelectItem>
																	))}
																</SelectContent>
															</Select>
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
															Company Name
														</FormLabel>
														<FormControl>
															<div className="relative company-autocomplete-container">
																<Input
																	className="focus:ring-0 focus:ring-offset-0 focus:border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-500 focus:shadow-none focus-visible:shadow-none"
																	placeholder="Type your company name"
																	{...field}
																	onChange={(e) =>
																		handleCompanyNameChange(e.target.value, field.onChange)
																	}
																	onFocus={() => {
																		if (field.value && companySuggestions.length > 0) {
																			setShowCompanySuggestions(true);
																		}
																	}}
																	autoComplete="off"
																/>
																{loadingCompanies && (
																	<div className="absolute right-3 top-2.5">
																		<Loader2 className="w-4 h-4 animate-spin text-gray-400" />
																	</div>
																)}
																
																{/* Suggestions Dropdown */}
																{showCompanySuggestions && companySuggestions.length > 0 && (
																	<div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
																		{companySuggestions.map((company) => (
																			<div
																				key={company.id}
																				className="px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors text-sm text-gray-900"
																				onClick={() =>
																					handleSelectCompany(company, field.onChange)
																				}
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
															Email
														</FormLabel>
														<FormControl>
															<Input
																className="focus:ring-0 focus:ring-offset-0 focus:border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-500 focus:shadow-none focus-visible:shadow-none"
																placeholder="Ex: demo@email.com"
																{...field}
															/>
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
																	<Select
																		onValueChange={field.onChange}
																		defaultValue={field.value}
																		value={field.value}
																	>
																		<FormControl>
																			<SelectTrigger className="w-[80px] text-gray-500 focus:ring-0 focus:ring-offset-0 focus:border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-500 focus:shadow-none focus-visible:shadow-none">
																				<SelectValue />
																			</SelectTrigger>
																		</FormControl>
																		<SelectContent>
																			{Array.from(
																				new Set(
																					filterOptions.locations
																						?.map((loc) => loc.country_code)
																						.filter(Boolean)
																				)
																			).map((code) => (
																				<SelectItem key={code} value={code}>
																					{code}
																				</SelectItem>
																			))}
																		</SelectContent>
																	</Select>
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
																			className="focus:ring-0 focus:ring-offset-0 focus:border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-500 focus:shadow-none focus-visible:shadow-none"
																			placeholder="Ex: 123654789"
																			{...field}
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
													<label className="text-sm font-medium text-gray-900">
														WhatsApp
													</label>
													<div className="flex gap-2">
														<FormField
															control={form.control}
															name="whatsapp_code"
															render={({ field }) => (
																<FormItem>
																	<Select
																		onValueChange={field.onChange}
																		defaultValue={field.value}
																		value={field.value}
																	>
																		<FormControl>
																			<SelectTrigger className="w-[80px] text-gray-500 focus:ring-0 focus:ring-offset-0 focus:border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-500 focus:shadow-none focus-visible:shadow-none">
																				<SelectValue />
																			</SelectTrigger>
																		</FormControl>
																		<SelectContent>
																			{Array.from(
																				new Set(
																					filterOptions.locations
																						?.map((loc) => loc.country_code)
																						.filter(Boolean)
																				)
																			).map((code) => (
																				<SelectItem key={code} value={code}>
																					{code}
																				</SelectItem>
																			))}
																		</SelectContent>
																	</Select>
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
																			className="focus:ring-0 focus:ring-offset-0 focus:border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-500 focus:shadow-none focus-visible:shadow-none"
																			placeholder="Ex: 123654789"
																			{...field}
																		/>
																	</FormControl>
																</FormItem>
															)}
														/>
													</div>
													<FormMessage>
														{form.formState.errors.whatsapp?.message}
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
													<FormLabel className="text-sm font-medium text-gray-900">
														Proposal Title
													</FormLabel>
													<FormControl>
														<Input
															className="focus:ring-0 focus:ring-offset-0 focus:border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-500 focus:shadow-none focus-visible:shadow-none"
															placeholder="Type proposal title"
															{...field}
														/>
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
													<FormLabel className="text-sm font-medium text-gray-900">
														Proposal Description
													</FormLabel>
													<FormControl>
														<Textarea
															placeholder="Enter a description..."
															className="min-h-[100px] focus:ring-0 focus:ring-offset-0 focus:border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-500 focus:shadow-none focus-visible:shadow-none"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<div className="grid grid-cols-2 gap-4">
											<div className="space-y-2">
												<FormLabel className="text-sm font-medium text-gray-900">
													Quantity
												</FormLabel>
												<div className="flex gap-2">
													<FormField
														control={form.control}
														name="quantity"
														render={({ field }) => (
															<FormItem className="flex-1">
																<FormControl>
																	<div className="relative">
																		<span className="absolute left-3 top-2.5 text-gray-500 text-sm">
																			qty
																		</span>
																		<Input
																			className="pl-10 focus:ring-0 focus:ring-offset-0 focus:border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-500 focus:shadow-none focus-visible:shadow-none"
																			{...field}
																		/>
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
																<Select
																	onValueChange={field.onChange}
																	defaultValue={field.value}
																	value={field.value}
																>
																	<FormControl>
																		<SelectTrigger className="w-[100px] text-gray-500 focus:ring-0 focus:ring-offset-0 focus:border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-500 focus:shadow-none focus-visible:shadow-none">
																			<SelectValue />
																		</SelectTrigger>
																	</FormControl>
																	<SelectContent>
																		<SelectItem value="pieces">
																			Pieces
																		</SelectItem>
																		<SelectItem value="kg">Kg</SelectItem>
																		<SelectItem value="meter">Meter</SelectItem>
																		<SelectItem value="yard">Yard</SelectItem>
																		<SelectItem value="ton">Ton</SelectItem>
																		<SelectItem value="liter">Liter</SelectItem>
																		<SelectItem value="box">Box</SelectItem>
																		<SelectItem value="container">
																			Container
																		</SelectItem>
																	</SelectContent>
																</Select>
															</FormItem>
														)}
													/>
												</div>
												<FormMessage>
													{form.formState.errors.quantity?.message ||
														form.formState.errors.quantity_unit?.message}
												</FormMessage>
											</div>

											<div className="space-y-2">
												<FormLabel className="text-sm font-medium text-gray-900">
													Target Price Per Unit
												</FormLabel>
												<div className="flex gap-2">
													<FormField
														control={form.control}
														name="target_price"
														render={({ field }) => (
															<FormItem className="flex-1">
																<FormControl>
																	<div className="relative">
																		<span className="absolute left-3 top-2.5 text-gray-500 text-sm">
																			$
																		</span>
																		<Input
																			className="pl-6 focus:ring-0 focus:ring-offset-0 focus:border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-500 focus:shadow-none focus-visible:shadow-none"
																			{...field}
																		/>
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
																<Select
																	onValueChange={field.onChange}
																	defaultValue={field.value}
																	value={field.value}
																>
																	<FormControl>
																		<SelectTrigger className="w-[85px] text-gray-500 focus:ring-0 focus:ring-offset-0 focus:border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-500 focus:shadow-none focus-visible:shadow-none">
																			<SelectValue />
																		</SelectTrigger>
																	</FormControl>
																	<SelectContent>
																		{[
																			"USD",
																			"EUR",
																			"GBP",
																			"JPY",
																			"CNY",
																			"INR",
																			"BDT",
																			"AUD",
																			"CAD",
																			"CHF",
																		].map((curr) => (
																			<SelectItem key={curr} value={curr}>
																				{curr}
																			</SelectItem>
																		))}
																	</SelectContent>
																</Select>
															</FormItem>
														)}
													/>
												</div>
												<FormMessage>
													{form.formState.errors.target_price?.message ||
														form.formState.errors.currency?.message}
												</FormMessage>
											</div>
										</div>

										<FormField
											control={form.control}
											name="payment_method"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-sm font-medium text-gray-900">
														Payment Methods
													</FormLabel>
													<Select
														onValueChange={field.onChange}
														value={field.value}
													>
														<FormControl>
															<SelectTrigger className="text-gray-500 focus:ring-0 focus:ring-offset-0 focus:border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-500 focus:shadow-none focus-visible:shadow-none">
																<SelectValue placeholder="Select payment method" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															<SelectItem value="cash">Cash</SelectItem>
															<SelectItem value="bank_transfer">
																Bank Transfer
															</SelectItem>
															<SelectItem value="letter_of_credit">
																Letter of Credit
															</SelectItem>
															<SelectItem value="paypal">PayPal</SelectItem>
															<SelectItem value="escrow">Escrow</SelectItem>
															<SelectItem value="credit_card">
																Credit Card
															</SelectItem>
															<SelectItem value="advance_payment">
																Advance Payment
															</SelectItem>
															<SelectItem value="payment_on_delivery">
																Payment on Delivery
															</SelectItem>
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="delivery_info"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-sm font-medium text-gray-900">
														Delivery Information
													</FormLabel>
													<FormControl>
														<Input
															className="focus:ring-0 focus:ring-offset-0 focus:border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-500 focus:shadow-none focus-visible:shadow-none"
															placeholder="Type your delivery details"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<div className="space-y-2">
											<StepFormDragDropFile
												name="images"
												control={form.control}
											/>
										</div>
									</div>
								)}
							</form>
						</Form>
					</div>
				</div>

				{/* Footer fixed at bottom */}
				<div className="p-6 border-t border-gray-100 bg-white sticky bottom-0 z-10">
					{step === 1 ? (
						<div className="grid grid-cols-2 gap-4">
							<Button
								TagName="div"
								secondary
								className="w-full cursor-pointer"
								onClick={() => onOpenChange(false)}
							>
								Cancel
							</Button>
							<Button className="w-full" onClick={nextStep}>
								Next <ArrowRight className="w-4 h-4 ml-1" />
							</Button>
						</div>
					) : (
						<div className="grid grid-cols-2 gap-4">
							<Button
								TagName="div"
								secondary
								className="w-full cursor-pointer"
								onClick={prevStep}
								disabled={isSubmitting}
							>
								Back
							</Button>
							<Button
								className="w-full"
								onClick={form.handleSubmit(onSubmit)}
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<>
										Submitting...{" "}
										<Loader2 className="w-4 h-4 ml-1 animate-spin" />
									</>
								) : (
									<>
										Submit <ArrowRight className="w-4 h-4 ml-1" />
									</>
								)}
							</Button>
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}
