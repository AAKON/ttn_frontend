import { Section } from "@/components/shared";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getSourcingDetails } from "@/services/sourcing";
import GetInTouch from "@/components/get-in-touch/get-in-touch";
import SourcingDetailsFrame from "../components/sourcing-details-frame";
import SourcingInfoCard from "../components/sourcing-info-card";
import { QuantityIcon } from "@/components/icons/quantity-icon";
import { TargetIcon } from "@/components/icons/target-iocn";
import { PaymentIcon } from "@/components/icons/payment-icon";
import ImageSlider from "../components/ImageSlider";
import SourcingClientWrapper from "../components/SourcingClientWrapper";
import ContactSheet from "../components/ContactSheet";

// Server Component - Data transformation helper
function transformSourcingData(response) {
	return {
		id: response.data.id,
		slug: response.data.id,
		posted_date: new Date(response.data.created_at).toLocaleDateString(
			"en-US",
			{
				day: "numeric",
				month: "short",
				year: "numeric",
			}
		),
		title: response.data.title,
		company_name: response.data.company_name,
		company_slug: response.data.company_slug,
		category:
			response.data.product_categories?.map((cat) => cat.name).join(", ") || "",
		location: response.data.location || "",
		country_flag: response.data.location?.flag_path || "",
		proposal_views: response.data.view_count || 0,
		images: response.data.images_urls || [],
		description: response.data.description || "",
		quantity: response.data.quantity ? `${response.data.quantity} ${response.data.unit || ''}`.trim() : null,
		target_price: response.data.price ? `${response.data.currency || ''} ${response.data.price}`.trim() : null,
		payment_methods: response.data.payment_method?.replace("_", " ") || null,
		is_favorite: response.data.is_favorited || false,
		contact: {
			email: response.data.email || "",
			whatsapp: response.data.whatsapp || "",
			phone: response.data.phone || "",
			address: response.data.delivery_info || "",
		},
		comments:
			response.data.comments?.map((comment) => ({
				id: comment.id,
				user_name:
					`${comment.user?.first_name} ${comment.user?.last_name}`.trim() ||
					"Anonymous",
				user_avatar: null,
				comment: comment.comment,
				date: new Date(comment.created_at).toLocaleDateString("en-US", {
					day: "numeric",
					month: "short",
					year: "numeric",
				}),
				replies:
					comment.replies?.map((reply) => ({
						id: reply.id,
						user_name:
							`${reply.user?.first_name} ${reply.user?.last_name}`.trim() ||
							"Anonymous",
						user_avatar: null,
						comment: reply.reply,
						date: new Date(reply.created_at).toLocaleDateString("en-US", {
							day: "numeric",
							month: "short",
							year: "numeric",
						}),
					})) || [],
			})) || [],
	};
}

// Server Component
export default async function SourcingDetails({ params }) {
	const session = await getServerSession(authOptions);
	const token = session?.accessToken;

	let sourcing = null;
	let error = null;

	try {
		const response = await getSourcingDetails(params.id, token);

		if (response && response.status) {
			sourcing = transformSourcingData(response);
		} else {
			error = "Failed to load sourcing details";
		}
	} catch (err) {
		console.error("Error fetching sourcing details:", err);
		error = "An error occurred while loading the sourcing proposal";
	}


	// Error state
	if (error) {
		return (
			<Section>
				<div className="flex items-center justify-center min-h-[400px]">
					<div className="text-gray-500">{error}</div>
				</div>
			</Section>
		);
	}

	// Not found state
	if (!sourcing) {
		return (
			<Section>
				<div className="flex items-center justify-center min-h-[400px]">
					<div className="text-gray-500">Sourcing proposal not found</div>
				</div>
			</Section>
		);
	}

	return (
		<>
			<Section className="bg-gray-50">
				<div className="space-y-8">
					{/* Header - Server Component */}
					<SourcingDetailsFrame
						slug={sourcing.slug}
						headerData={sourcing}
						is_favorite={sourcing.is_favorite}
					/>

					{/* Main Content Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
						{/* Left Column - Server Rendered */}
						<div className="space-y-8">
							<div className="bg-white p-4 lg:p-6 xl:p-8 rounded-lg border border-gray-100">
								{/* Image Slider - Client Component */}
								{sourcing.images && sourcing.images.length > 0 && (
									<ImageSlider images={sourcing.images} title={sourcing.title} />
								)}

								{/* Description - Server Rendered */}
								<div className="mb-8">
									<div
										className="html_desc text-gray-700 leading-relaxed text-md md:text-lg prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1"
										dangerouslySetInnerHTML={{ __html: sourcing.description }}
									/>
								</div>

								{/* Details Grid - Server Rendered */}
								{(sourcing.quantity || sourcing.target_price || sourcing.payment_methods) && (
									<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
										{sourcing.quantity && (
											<SourcingInfoCard
												icon={<QuantityIcon stroke="#F7931E" />}
												label="Quantity"
												value={sourcing.quantity}
											/>
										)}
										{sourcing.target_price && (
											<SourcingInfoCard
												icon={<TargetIcon stroke="#F7931E" />}
												label="Target Price/Unit"
												value={sourcing.target_price}
											/>
										)}
										{sourcing.payment_methods && (
											<SourcingInfoCard
												icon={<PaymentIcon stroke="#F7931E" />}
												label="Payment Methods"
												value={sourcing.payment_methods}
											/>
										)}
									</div>
								)}
							</div>

							{/* Client Components Wrapper - Contains Comments */}
							<SourcingClientWrapper
								initialSourcing={sourcing}
								sourcingId={params.id}
							/>
						</div>

						{/* Right Column - Contact Section */}
						<ContactSheet sourcing={sourcing} />
					</div>
				</div>
			</Section>

			<GetInTouch />
		</>
	);
}
