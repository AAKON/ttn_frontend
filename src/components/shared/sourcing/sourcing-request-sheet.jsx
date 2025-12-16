"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { useMediaQuery } from "@/hooks/use-media-query";
// import DragDropFile from "../DragDropFile"; // Need to check path
import { Check, ArrowRight } from "lucide-react";
import StepFormDragDropFile from "@/components/shared/StepFormDragDropFile";

export default function SourcingRequestSheet({ open, onOpenChange }) {
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const [step, setStep] = useState(1);

	useEffect(() => {
		if (!open) {
			const timer = setTimeout(() => {
				setStep(1);
			}, 500); // Reset after closing animation
			return () => clearTimeout(timer);
		}
	}, [open]);

	const {
		control,
		handleSubmit,
		register,
		trigger,
		formState: { errors },
	} = useForm({
		defaultValues: {
			category: "",
			country: "America",
			company_name: "",
			email: "",
			phone_code: "US",
			phone: "",
			whatsapp_code: "US",
			whatsapp: "",
			title: "America",
			description: "",
			quantity: "20,000",
			quantity_unit: "yd",
			target_price: "10.00",
			currency: "USD",
			payment_method: "Bank",
			delivery_info: "",
			images: [],
		},
	});

	const onSubmit = (data) => {
		console.log("Form Data:", data);
		// TODO: Implement submission logic
		onOpenChange(false);
	};

	const nextStep = async () => {
		const result = await trigger([
			"category",
			"country",
			"company_name",
			"email",
			"phone",
			"whatsapp",
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
										className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
											step >= 1 ? "border-brand-600" : "border-gray-300"
										}`}
									>
										{step >= 1 && (
											<div className="w-2.5 h-2.5 rounded-full bg-brand-600" />
										)}
									</div>
									<span
										className={`text-sm font-medium ${
											step === 1 ? "text-gray-900" : "text-gray-500"
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
										className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
											step === 2 ? "border-brand-600" : "border-gray-300"
										}`}
									>
										{step === 2 && (
											<div className="w-2.5 h-2.5 rounded-full bg-brand-600" />
										)}
									</div>
									<span
										className={`text-sm font-medium ${
											step === 2 ? "text-gray-900" : "text-gray-500"
										}`}
									>
										Inquiry Details
									</span>
								</div>
							</div>
							<div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gray-100 hidden" />
						</div>

						{/* Progress Bar under tabs (Orange bar) */}
						<div className="w-full h-2 bg-gray-100 rounded-full mb-8 relative overflow-hidden">
							<div
								className={`absolute top-0 left-0 h-full bg-brand-600 transition-all duration-300 ease-in-out rounded-full ${
									step === 1 ? "w-1/2" : "w-full"
								}`}
							/>
						</div>

						<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
							{step === 1 && (
								<div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
									<div className="bg-gray-50 p-4 rounded-[8px] space-y-2">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<label className="text-sm text-gray-900">
													Category
												</label>
												<Controller
													name="category"
													control={control}
													render={({ field }) => (
														<Select
															onValueChange={field.onChange}
															defaultValue={field.value}
														>
															<SelectTrigger className="text-gray-500">
																<SelectValue placeholder="Select category" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="T-shirt">T-shirt</SelectItem>
																<SelectItem value="Yarn">Yarn</SelectItem>
																<SelectItem value="Fabric">Fabric</SelectItem>
															</SelectContent>
														</Select>
													)}
												/>
											</div>
											<div className="space-y-2">
												<label className="text-sm text-gray-900">Country</label>
												<Controller
													name="country"
													control={control}
													render={({ field }) => (
														<Select
															onValueChange={field.onChange}
															defaultValue={field.value}
														>
															<SelectTrigger className="text-gray-500">
																<SelectValue placeholder="Select country" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="America">America</SelectItem>
																<SelectItem value="Bangladesh">
																	Bangladesh
																</SelectItem>
																<SelectItem value="India">India</SelectItem>
															</SelectContent>
														</Select>
													)}
												/>
											</div>
										</div>

										<div className="space-y-2">
											<label className="text-sm text-gray-900">
												Company Name
											</label>
											<Input
												{...register("company_name", {
													required: "Company Name is required",
												})}
												placeholder="Type your company name"
											/>
											{errors.company_name && (
												<span className="text-red-500 text-xs">
													{errors.company_name.message}
												</span>
											)}
										</div>
									</div>

									<div className="bg-gray-50 p-4 rounded-[8px] space-y-2">
										<div className="space-y-2">
											<label className="text-sm text-gray-900">Email</label>
											<Input
												{...register("email", {
													required: "Email is required",
													pattern: {
														value: /^\S+@\S+$/i,
														message: "Invalid email",
													},
												})}
												placeholder="Ex: demo@email.com"
											/>
											{errors.email && (
												<span className="text-red-500 text-xs">
													{errors.email.message}
												</span>
											)}
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<label className="text-sm text-gray-900">Phone</label>
												<div className="flex gap-2">
													<Controller
														name="phone_code"
														control={control}
														render={({ field }) => (
															<Select
																onValueChange={field.onChange}
																defaultValue={field.value}
															>
																<SelectTrigger className="w-[80px] text-gray-500">
																	<SelectValue />
																</SelectTrigger>
																<SelectContent>
																	<SelectItem value="US">US</SelectItem>
																	<SelectItem value="BD">BD</SelectItem>
																</SelectContent>
															</Select>
														)}
													/>
													<Input
														{...register("phone", {
															required: "Phone is required",
														})}
														placeholder="Ex: 123654789"
														className="flex-1"
													/>
												</div>
												{errors.phone && (
													<span className="text-red-500 text-xs">
														{errors.phone.message}
													</span>
												)}
											</div>
											<div className="space-y-2">
												<label className="text-sm font-medium text-gray-900">
													WhatsApp
												</label>
												<div className="flex gap-2">
													<Controller
														name="whatsapp_code"
														control={control}
														render={({ field }) => (
															<Select
																onValueChange={field.onChange}
																defaultValue={field.value}
															>
																<SelectTrigger className="w-[80px] text-gray-500">
																	<SelectValue />
																</SelectTrigger>
																<SelectContent>
																	<SelectItem value="US">US</SelectItem>
																	<SelectItem value="BD">BD</SelectItem>
																</SelectContent>
															</Select>
														)}
													/>
													<Input
														{...register("whatsapp")}
														placeholder="Ex: 123654789"
														className="flex-1"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}

							{step === 2 && (
								<div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-900">
											Proposal Title
										</label>
										<Input
											{...register("title")}
											placeholder="Type proposal title"
										/>
									</div>

									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-900">
											Proposal Description
										</label>
										<Textarea
											{...register("description")}
											placeholder="Enter a description..."
											className="min-h-[100px]"
										/>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<label className="text-sm font-medium text-gray-900">
												Quantity
											</label>
											<div className="flex gap-2">
												<div className="flex-1 relative">
													<span className="absolute left-3 top-2.5 text-gray-500 text-sm">
														yd
													</span>
													<Input {...register("quantity")} className="pl-8" />
												</div>
												<Controller
													name="quantity_unit"
													control={control}
													render={({ field }) => (
														<Select
															onValueChange={field.onChange}
															defaultValue={field.value}
														>
															<SelectTrigger className="w-[80px] text-gray-500">
																<SelectValue />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="yd">Unit</SelectItem>
																<SelectItem value="pc">Pcs</SelectItem>
															</SelectContent>
														</Select>
													)}
												/>
											</div>
										</div>
										<div className="space-y-2">
											<label className="text-sm font-medium text-gray-900">
												Target Price Per Unit
											</label>
											<div className="flex gap-2">
												<div className="flex-1 relative">
													<span className="absolute left-3 top-2.5 text-gray-500 text-sm">
														$
													</span>
													<Input
														{...register("target_price")}
														className="pl-6"
													/>
												</div>
												<Controller
													name="currency"
													control={control}
													render={({ field }) => (
														<Select
															onValueChange={field.onChange}
															defaultValue={field.value}
														>
															<SelectTrigger className="w-[80px] text-gray-500">
																<SelectValue />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="USD">USD</SelectItem>
																<SelectItem value="BDT">BDT</SelectItem>
															</SelectContent>
														</Select>
													)}
												/>
											</div>
										</div>
									</div>

									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-900">
											Payment Methods
										</label>
										<Controller
											name="payment_method"
											control={control}
											render={({ field }) => (
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select payment method" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="Bank">Bank</SelectItem>
														<SelectItem value="Cash">Cash</SelectItem>
														<SelectItem value="LC">LC</SelectItem>
													</SelectContent>
												</Select>
											)}
										/>
									</div>

									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-900">
											Delivery Information
										</label>
										<Input
											{...register("delivery_info")}
											placeholder="Type your delivery details"
										/>
									</div>

									<div className="space-y-2">
										<StepFormDragDropFile name="images" control={control} />
									</div>
								</div>
							)}
						</form>
					</div>
				</div>

				{/* Footer fixed at bottom (or just at bottom of content) */}
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
							>
								Back
							</Button>
							<Button className="w-full" onClick={handleSubmit(onSubmit)}>
								Submit <ArrowRight className="w-4 h-4 ml-1" />
							</Button>
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}
