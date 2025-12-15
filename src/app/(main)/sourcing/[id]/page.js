"use client";
import { Section } from "@/components/shared";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSession } from "next-auth/react";
import GetInTouch from "@/components/get-in-touch/get-in-touch";
import { MapPin, Mail, User } from "lucide-react";
import Image from "next/image";
import Button from "@/components/shared/button";
import SourcingDetailsFrame from "../components/sourcing-details-frame";
import SourcingInfoCard from "../components/sourcing-info-card";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { QuantityIcon } from "@/components/icons/quantity-icon";
import { TargetIcon } from "@/components/icons/target-iocn";
import { PaymentIcon } from "@/components/icons/payment-icon";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { ReplyIcon } from "@/components/icons/reply-icon";
import { SendIcon } from "@/components/icons/send-icon";

export default function SourcingDetails() {
	const params = useParams();
	const [sourcing, setSourcing] = useState(null);
	const [loading, setLoading] = useState(true);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		const fetchSourcingDetails = async () => {
			setLoading(true);
			const session = await getSession();
			const token = session?.accessToken;

			try {
				// TODO: Replace with actual API endpoint
				// const response = await fetch(
				//   `${process.env.NEXT_PUBLIC_API_URL}/sourcing/${params.id}`,
				//   {
				//     headers: {
				//       Authorization: `Bearer ${token}`,
				//     },
				//   }
				// );
				// const data = await response.json();

				// Mock data for now
				await new Promise((resolve) => setTimeout(resolve, 500));
				const mockData = {
					id: params.id,
					posted_date: "28 Feb 2024 02:37",
					title: "Looking for T-shirt Manufacturer in Bangladesh",
					company_name: "ABC Group",
					category: "Manufacturing, Yarn, Sewing",
					location: "Singapore",
					country_flag: "🇸🇬",
					proposal_views: 2343,
					images: [
						"/sourcing-1.png",
						"/sourcing-2.png",
						"/sourcing-1.png",
						"/sourcing-2.png",
					],
					description: `Codeblue Clothing Private Limited is a Non-govt company, incorporated on 08 Jun, 2010. It serves as a prominent sourcing hub for leading e-commerce and retail players in India. The company has earned its position as a preferred partner for renowned e-commerce names that entrust Codeblue with responsibilities in product development, manufacturing, and design solutions, employing a holistic approach.`,
					quantity: "20,000 yd",
					target_price: "$ 5.25",
					payment_methods: "Bank",
					contact: {
						address:
							"Noida Road, D Block, Sector 11, Noida, Uttar Pradesh, India",
						email: "contact@codeblueindia.com",
						whatsapp: "+919810211006",
						phone: "+919810211006",
					},
					comments: [
						{
							id: 1,
							user_name: "Codeblue Clothing Private Limited",
							user_avatar: null,
							comment:
								"Codeblue Clothing Private Limited is a Non-govt company, incorporated on 08 Jun, 2010. It serves as a prominent sourcing hub for leading e-commerce and retail players in India. The company has earned its position as a preferred partner for ...",
							date: "28 Feb 2024 02:37",
							has_reply: true,
						},
						{
							id: 2,
							user_name: null,
							user_avatar: null,
							comment:
								"It serves as a prominent sourcing hub for leading e-commerce and retail players.",
							date: "28 Feb 2024 02:37",
							has_reply: false,
						},
						{
							id: 3,
							user_name: null,
							user_avatar: null,
							comment: "It serves as a prominent sourcing.",
							date: "28 Feb 2024 02:37",
							has_reply: false,
						},
						{
							id: 4,
							user_name: "Codeblue Clothing Private Limited",
							user_avatar: null,
							comment:
								"Codeblue Clothing Private Limited is a Non-govt company, incorporated on 08 Jun, 2010. It serves as a prominent sourcing hub for leading e-commerce.",
							date: "28 Feb 2024 02:37",
							has_reply: true,
						},
					],
				};

				setSourcing(mockData);
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

	const nextImage = () => {
		if (sourcing?.images) {
			setCurrentImageIndex((prev) =>
				prev === sourcing.images.length - 1 ? 0 : prev + 1
			);
		}
	};

	const prevImage = () => {
		if (sourcing?.images) {
			setCurrentImageIndex((prev) =>
				prev === 0 ? sourcing.images.length - 1 : prev - 1
			);
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

	console.log(sourcing);

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
									<div className="flex gap-3 items-end">
										<textarea
											type="text"
											placeholder="Add your comments..."
											className="resize-none h-12 lg:h-[100px] flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
										/>
										<Button
											secondary
											className="!bg-gray-100 lg:!bg-white px-3 lg:px-6 !h-12"
										>
											<SendIcon className="lg:hidden" />
											<span className="hidden lg:block">Submit</span>
										</Button>
									</div>
								</div>

								{/* Comments List */}
								<div className="space-y-4">
									{sourcing.comments.map((comment) => (
										<div
											key={comment.id}
											className={`${
												comment.has_reply
													? "pb-4 last:border-0"
													: "pl-12 pb-4 last:border-0"
											}`}
										>
											<div className="flex gap-3">
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
													<div
														className={`flex ${
															comment.has_reply
																? "justify-between"
																: "justify-end"
														} items-center gap-4 text-xs text-gray-500`}
													>
														{comment.has_reply && (
															<button className="flex items-center gap-1 ml-2 p-0 bg-transparent text-brand-600 text-md md:text-md lg:text-lg">
																Reply
																<ReplyIcon
																	stroke="#C67618"
																	className="w-4 h-4"
																/>
															</button>
														)}
														<span className="text-gray-500 text-sm md:text-md">
															{comment.date}
														</span>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Right Column - Contact Card */}
						<div>
							<div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-[120px]">
								<h3 className="text-lg font-bold text-gray-900 mb-6">
									Contact
								</h3>

								{/* Address */}
								<div className="mb-6 bg-gray-50 p-3 rounded-lg">
									<div className="flex items-start gap-3 mb-2">
										<div className="space-y-2">
											<div className="flex justify-between gap-2">
												<span className="text-gray-500 text-sm">Address</span>
												<span className="text-primary text-sm underline text-brand-700 font-semibold mt-1 hover:underline">
													View On Map
												</span>
											</div>
											<div className="flex gap-2">
												<MapPin className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
												<p className="text-md font-medium text-gray-900">
													{sourcing.contact.address}
												</p>
											</div>
										</div>
									</div>
								</div>

								{/* Email */}
								<div className="mb-6 bg-gray-50 p-3 rounded-lg">
									<div className="flex items-start gap-3">
										<div className="space-y-1">
											<div className="flex justify-between gap-2">
												<span className="text-gray-500 text-sm">Email</span>
											</div>
											<div className="flex gap-2">
												<Mail className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
												<p className="text-md font-medium text-gray-900">
													{sourcing.contact.email}
												</p>
											</div>
										</div>
									</div>
								</div>

								{/* WhatsApp */}
								<div className="mb-6 bg-gray-50 p-3 rounded-lg">
									<div className="flex items-start gap-3">
										<div className="space-y-1">
											<div className="flex justify-between gap-2">
												<span className="text-gray-500 text-sm">Whatsapp</span>
											</div>
											<div className="flex gap-2">
												<WhatsAppIcon
													stroke="#F7931E"
													className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5"
												/>
												<p className="text-md font-medium text-gray-900">
													{sourcing.contact.whatsapp}
												</p>
											</div>
										</div>
									</div>
								</div>

								{/* Phone */}
								<div className="mb-6 bg-gray-50 p-3 rounded-lg">
									<div className="flex items-start gap-3">
										<div className="space-y-1">
											<div className="flex justify-between gap-2">
												<span className="text-gray-500 text-sm">Phone</span>
											</div>
											<div className="flex gap-2">
												<PhoneIcon
													stroke="#F7931E"
													className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5"
												/>
												<p className="text-md font-medium text-gray-900">
													{sourcing.contact.phone}
												</p>
											</div>
										</div>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="grid grid-cols-2 gap-4">
									<Button primaryOutline className="w-full">
										Send Email
									</Button>
									<Button primary className="w-full">
										WhatsApp
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Section>

			<GetInTouch />
		</>
	);
}
