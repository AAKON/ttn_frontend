"use client";
import { Section } from "@/components/shared";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSession } from "next-auth/react";
import { getSourcingDetails, submitComment } from "@/services/sourcing";
import GetInTouch from "@/components/get-in-touch/get-in-touch";
import {
	MapPin,
	Mail,
	User,
	ArrowUp,
	ChevronUp,
	ChevronDown,
	Loader2,
} from "lucide-react";
import Image from "next/image";
import Button from "@/components/shared/button";
import SourcingDetailsFrame from "../components/sourcing-details-frame";
import SourcingInfoCard from "../components/sourcing-info-card";
import ContactInfoContent from "../components/contact-info-content";
import { ArrowTopAngle, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { QuantityIcon } from "@/components/icons/quantity-icon";
import { TargetIcon } from "@/components/icons/target-iocn";
import { PaymentIcon } from "@/components/icons/payment-icon";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { ReplyIcon } from "@/components/icons/reply-icon";
import { SendIcon } from "@/components/icons/send-icon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {toast} from "@/hooks/use-toast";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    comment: z.string().min(1, { message: "Comment is required" }),
});

export default function SourcingDetails() {
	const params = useParams();
	const [sourcing, setSourcing] = useState(null);
	const [showContact, setShowContact] = useState(false);
	const [loading, setLoading] = useState(true);
	const [submittingComment, setSubmittingComment] = useState(false);

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			comment: "",
		},
	});

	useEffect(() => {
		const fetchSourcingDetails = async () => {
			setLoading(true);
			const session = await getSession();
			const token = session?.accessToken;

			try {
				const response = await getSourcingDetails(params.id, token);
				
				if (response && response.status) {
					// Transform the API response to match the expected format
					const transformedData = {
						id: response.message.id,
						slug: response.message.id,
						posted_date: new Date(response.message.created_at).toLocaleDateString('en-US', { 
							day: 'numeric', 
							month: 'short', 
							year: 'numeric' 
						}),
						title: response.message.title,
						company_name: response.message.company_name,
						category: response.message.product_categories?.map(cat => cat.name).join(', ') || '',
						location: response.message.location || '',
						country_flag: response.message.location?.flag_path || '',
						proposal_views: 0, // Not provided in API response
						images: response.message.images_urls?.map(img => img.original) || [],
						description: response.message.description || '',
						quantity: `${response.message.quantity} ${response.message.unit}`,
						target_price: `${response.message.currency} ${response.message.price}`,
						payment_methods: response.message.payment_method?.replace('_', ' ') || '',
						is_favorite: response.message.is_favorited || false,
						contact: {
							email: response.message.email || '',
							whatsapp: response.message.whatsapp || '',
							phone: response.message.phone || '',
							address: response.message.delivery_info || '',
						},
						comments: response.message.comments?.map(comment => ({
							id: comment.id,
							user_name: `${comment.user?.first_name} ${comment.user?.last_name}`.trim() || 'Anonymous',
							user_avatar: null,
							comment: comment.comment,
							date: new Date(comment.created_at).toLocaleDateString('en-US', {
								day: 'numeric',
								month: 'short',
								year: 'numeric'
							}),
							replies: comment.replies?.map(reply => ({
								id: reply.id,
								user_name: `${reply.user?.first_name} ${reply.user?.last_name}`.trim() || 'Anonymous',
								user_avatar: null,
								comment: reply.reply,
								date: new Date(reply.created_at).toLocaleDateString('en-US', {
									day: 'numeric',
									month: 'short',
									year: 'numeric'
								}),
							})) || []
						})) || []
					};

					setSourcing(transformedData);
				} else {
					console.error("API response error:", response);
				}
			} catch (error) {
				console.error("Error fetching sourcing details:", error);
			} finally {
				setLoading(false);
			}
		};

		if (params.id) {
			fetchSourcingDetails();
		}
	}, [params.id]);

	const onSubmit = async (data) => {
		setSubmittingComment(true);
		const { comment } = data;

		try {
			const result = await submitComment(params.id, comment, toast);
			if (result.status && result.code === 201) {
				form.reset();
				
				// Refresh the sourcing details to get the updated comments
				const session = await getSession();
				const token = session?.accessToken;
				const updatedResponse = await getSourcingDetails(params.id, token);
				
				if (updatedResponse && updatedResponse.status) {
					// Transform the API response to match the expected format
					const transformedData = {
						...sourcing,
						comments: updatedResponse.message.comments?.map(comment => ({
							id: comment.id,
							user_name: `${comment.user?.first_name} ${comment.user?.last_name}`.trim() || 'Anonymous',
							user_avatar: null,
							comment: comment.comment,
							date: new Date(comment.created_at).toLocaleDateString('en-US', {
								day: 'numeric',
								month: 'short',
								year: 'numeric'
							}),
							replies: comment.replies?.map(reply => ({
								id: reply.id,
								user_name: `${reply.user?.first_name} ${reply.user?.last_name}`.trim() || 'Anonymous',
								user_avatar: null,
								comment: reply.reply,
								date: new Date(reply.created_at).toLocaleDateString('en-US', {
									day: 'numeric',
									month: 'short',
									year: 'numeric'
								}),
							})) || []
						})) || []
					};
					
					setSourcing(transformedData);
				}
			}
		} catch (error) {
			console.error("Error submitting comment:", error);
		} finally {
			setSubmittingComment(false);
		}
	};

	if (loading) {
		return (
			<Section>
				<div className="flex items-center justify-center min-h-[400px]">
					<div className="text-gray-500">Loading...</div>
				</div>
			</Section>
		);
	}

	if (!sourcing) {
		return (
			<Section>
				<div className="flex items-center justify-center min-h-[400px]">
					<div className="text-gray-500">Sourcing proposal not found</div>
				</div>
			</Section>
		);
	}

	const options = {
		type: "loop",
		perPage: 3,
		perMove: 1,
		gap: "20px",
		pagination: false,
		arrows: true,
		padding: { right: "80px" },
		drag: true,
		snap: true,
		breakpoints: {
			768: {
				perPage: 2,
				padding: { right: "60px" },
			},
		},
	};

	return (
		<>
			<Section className="bg-gray-50">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<SourcingDetailsFrame
						slug={sourcing.slug}
						headerData={sourcing}
						is_favorite={sourcing.is_favorite}
						className="mb-8"
					/>

					{/* Main Content Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
						{/* Left Column */}
						<div className="space-y-8">
							<div className="bg-white p-4 rounded-lg border border-gray-100">
								{/* Image Slider by Splide slider */}
								<div className="mb-8">
									<div className="relative">
										<Splide options={options}>
											{sourcing?.images?.map((image, index) => (
												<SplideSlide key={index}>
													<div key={index} className="">
														<Image
															src={image}
															alt={sourcing.title}
															width={240}
															height={180}
															className="w-full h-auto object-cover rounded-lg"
														/>
													</div>
												</SplideSlide>
											))}
										</Splide>
										{/* Gradient Overlay */}
										<div className="absolute top-0 right-0 h-full w-[80px] bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
									</div>
								</div>

								{/* Description */}
								<div className="mb-8">
									<p className="text-gray-700 leading-relaxed text-md md:text-lg">
										{sourcing.description}
									</p>
								</div>

								{/* Details Grid */}
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
									<SourcingInfoCard
										icon={<QuantityIcon stroke="#F7931E" />}
										label="Quantity"
										value={sourcing.quantity}
									/>
									<SourcingInfoCard
										icon={<TargetIcon stroke="#F7931E" />}
										label="Target Price/Unit"
										value={sourcing.target_price}
									/>
									<SourcingInfoCard
										icon={<PaymentIcon stroke="#F7931E" />}
										label="Payment Methods"
										value={sourcing.payment_methods}
									/>
								</div>
							</div>

							{/* Comments Section */}
							<div className="bg-white p-4 rounded-lg border border-gray-100">
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Comments ({sourcing.comments.length})
								</h3>

								{/* Add Comment */}
								<div className="mb-6 border-b border-gray-100 pb-8">
									<Form {...form}>
										<form onSubmit={form.handleSubmit(onSubmit)}>
											<div className="flex gap-3 items-end">
												<FormField
													control={form.control}
													name="comment"
													render={({ field }) => (
														<FormItem className="flex-1">
															<FormControl>
																<Textarea
																	placeholder="Add your comments..."
																	className="resize-none h-12 lg:h-[100px] px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<Button
													secondary
													type="submit"
													disabled={submittingComment}
													className="!bg-gray-100 lg:!bg-white px-3 lg:px-6 !h-12"
												>
													{submittingComment ? (
														<>
															<Loader2 className="mr-2 h-4 w-4 animate-spin" />
															<span className="hidden lg:block">Please wait</span>
														</>
													) : (
														<>
															<SendIcon className="lg:hidden" />
															<span className="hidden lg:block">Submit</span>
														</>
													)}
												</Button>
											</div>
										</form>
									</Form>
								</div>

								{/* Comments List */}
								<div className="space-y-4">
									{sourcing.comments.map((comment) => (
										<div
											key={comment.id}
											className="mb-4 last:border-0 last:mb-0"
										>
											<div className="mb-4 flex gap-3">
												<div className="size-12 rounded-full border border-gray-300 bg-gray-200 flex items-center justify-center flex-shrink-0">
													<User className="w-6 h-6 text-gray-600" />
												</div>
												<div className="flex-1 bg-gray-50 p-5 rounded-[16px]">
													<p className="text-gray-900 text-sm md:text-md lg:text-lg mb-2">
														{comment.comment}
														{comment.comment.includes("...") && (
															<button className="ml-2 inline p-0 bg-transparent text-brand-600">
																Show more
															</button>
														)}
													</p>
													<div className="flex justify-between items-center gap-4 text-xs text-gray-500">
														<button className="flex items-center gap-1 ml-2 p-0 bg-transparent text-brand-600 text-md md:text-md lg:text-lg">
															Reply
															<ReplyIcon
																stroke="#C67618"
																className="w-4 h-4"
															/>
														</button>
														<span className="text-gray-500 text-sm md:text-md">
															{comment.date}
														</span>
													</div>
												</div>
											</div>
											{comment.replies && comment.replies.length > 0 && (
												<div className="pl-12 mb-4 last:border-0 space-y-3 last:mb-0">
													{comment.replies.map((reply) => (
														<div key={reply.id} className="flex gap-3">
															<div className="size-10 rounded-full border border-gray-300 bg-gray-200 flex items-center justify-center flex-shrink-0">
																<User className="w-5 h-5 text-gray-600" />
															</div>
															<div className="flex-1 bg-gray-50 p-4 rounded-[12px]">
																<p className="text-gray-900 text-sm md:text-md mb-2">
																	{reply.comment}
																	{reply.comment.includes("...") && (
																		<button className="ml-2 inline p-0 bg-transparent text-brand-600">
																			Show more
																		</button>
																	)}
																</p>
																<div className="flex justify-end items-center gap-4 text-xs text-gray-500">
																	<span className="text-gray-500 text-sm md:text-md">
																		{reply.date}
																	</span>
																</div>
															</div>
														</div>
													))}
												</div>
											)}
										</div>
									))}
								</div>
							</div>
						</div>

						<div className="lg:hidden">
							<button
								onClick={() => setShowContact(true)}
								className="w-full bg-brand-600 text-white py-3 px-4 rounded-xl flex items-center justify-between cursor-pointer shadow-sm hover:bg-brand-700 transition-colors"
							>
								<span className="font-semibold">
									Contact With Business Owner
								</span>
								<ChevronUp className="w-5 h-5 text-white" />
							</button>
						</div>

						{/* Mobile Bottom Sheet/Modal */}
						{showContact && (
							<div className="fixed inset-0 z-[9999] lg:hidden flex items-end justify-center sm:items-center mx-5 lg:mx-0 mb-5 lg:mb-0">
								{/* Backdrop */}
								<div
									className="fixed w-full h-screen top-0 inset-0 bg-black/60 backdrop-blur-sm"
									onClick={() => setShowContact(false)}
								/>
								{/* Content */}
								<div className="relative bg-white w-full sm:w-[480px] sm:rounded-2xl rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">
									<div className="flex justify-between items-center mb-6">
										<h3 className="text-lg font-bold text-gray-900">
											Contact With Business Owner
										</h3>
										<button
											onClick={() => setShowContact(false)}
											className="p-2 bg-transparent rounded-full transition-colors"
										>
											<ChevronDown className="w-6 h-6 text-brand-600" />
										</button>
									</div>
									<ContactInfoContent sourcing={sourcing} />
								</div>
							</div>
						)}

						{/* Desktop Static Card */}
						<div className="lg:block hidden">
							<div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-[120px]">
								<h3 className="text-lg font-bold text-gray-900 mb-6">
									Contact
								</h3>
								<ContactInfoContent sourcing={sourcing} />
							</div>
						</div>
					</div>
				</div>
			</Section>

			<GetInTouch />
		</>
	);
}
