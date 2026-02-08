"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/shared";
import { CheckVerifiedIcon } from "@/components/icons/check-verified"; // Updated import
import Button from "@/components/shared/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";

import { getPricingList } from "@/services/pricing";

function PricingTabs() {
	const arr = ["Monthly Plan", "Annual Plan"];
	const [activeTab, setActiveTab] = useState(arr[0]);
	const [pricings, setPricings] = useState({
		"Monthly Plan": [],
		"Annual Plan": [],
	});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchPricings = async () => {
			setIsLoading(true);
			try {
				const response = await getPricingList();
				if (response?.status) {
					const allPricings = response.data.pricings || [];
					setPricings({
						"Monthly Plan": allPricings.filter((p) => p.type === "monthly"),
						"Annual Plan": allPricings.filter((p) => p.type === "annual"),
					});
				}
			} catch (error) {
				console.error("Error fetching pricings:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchPricings();
	}, []);

	const getMappedPlans = (tab) => {
		return pricings[tab].map((p) => {
			const services = p.services || [];
			const benefits = p.benefits || [];

			return {
				title: p.title,
				price: p.price,
				isContact:
					p.price?.toLowerCase().includes("contact") ||
					p.price?.toLowerCase().includes("win-win"),
				features: services.slice(0, 5),
				moreFeatures: [...services.slice(5), ...benefits],
				hasMore: services.length > 5 || benefits.length > 0,
				buttonText:
					(
						p.price?.toLowerCase().includes("contact") ||
						p.price?.toLowerCase().includes("win-win")
					) ?
						"Contact Us"
						: "Get Started",
				buttonLink: "/contact",
				shortText: p.bt_short_text,
			};
		});
	};

	const tabData = {
		"Monthly Plan": getMappedPlans("Monthly Plan"),
		"Annual Plan": getMappedPlans("Annual Plan"),
	};

	return (
		<Container>
			<Tabs
				defaultValue="Monthly Plan"
				className="pb-10"
				onValueChange={setActiveTab}
			>
				<div className="md:py-10 py-6 bg-white sticky top-[70px] z-10 text-center w-[calc(100%+4px)] -ml-[2px]">
					{isLoading ?
						<div className="flex justify-center items-center py-20">
							<Loader2 className="w-10 h-10 animate-spin text-brand-600" />
							<span className="ml-3 text-xl font-medium text-gray-600">
								Loading Pricings...
							</span>
						</div>
						: <TabsList className="!h-auto flex justify-center !bg-transparent pl-0">
							<div className="bg-gray-50 p-2 rounded-[12px] !inline-flex justify-center border border-gray-100">
								{arr.map((el, idx) => {
									return (
										<TabsTrigger
											key={idx}
											value={el}
											className={cn(
												"!text-sm lg:!text-xl !px-3 !py-2 rounded-[8px] lg:!py-[10px] lg:!px-5 transition-all",
												"data-[state=active]:font-semibold data-[state=active]:text-white data-[state=active]:bg-brand-600",
												"data-[state=inactive]:font-medium data-[state=inactive]:text-gray-700 data-[state=inactive]:bg-transparent",
											)}
										>
											{el}
										</TabsTrigger>
									);
								})}
							</div>
						</TabsList>
					}
				</div>

				{!isLoading &&
					arr.map((tabName) => (
						<TabsContent key={tabName} value={tabName} className="mt-0">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
								{tabData[tabName].length > 0 ?
									tabData[tabName].map((plan, index) => (
										<PricingCard key={index} plan={plan} />
									))
									: <div className="col-span-full py-20 text-center">
										<p className="text-xl text-gray-500">
											No pricing plans available for this category.
										</p>
									</div>
								}
							</div>
						</TabsContent>
					))}
			</Tabs>
		</Container>
	);
}

function PricingCard({ plan }) {
	const [showMore, setShowMore] = useState(false);

	return (
		<div className="flex flex-col bg-white rounded-xl border border-gray-100 hover:shadow-hover-pricing-card-shadow   p-4 lg:p-5 transition-colors duration-300 shadow-pricing-card-shadow">
			<div className="mb-6 h-[156px] flex flex-col justify-between">
				<h3 className="text-xl font-normal text-gray-600 mb-4 flex items-center">
					{plan.title}
				</h3>

				<div className="mb-4 space-y-1">
					{plan.prePrice && (
						<div className="text-[18px] text-gray-500">{plan.prePrice}</div>
					)}

					{plan.isContact ?
						<div>
							<div className="text-2xl font-bold text-gray-900 leading-tight">
								Contact
							</div>
							<div className="text-2xl font-bold text-gray-900 leading-tight">
								For Price
							</div>
						</div>
						: <div className="text-[26px] font-bold text-gray-900">
							{plan.price}
						</div>
					}
				</div>
			</div>

			<div className="flex-grow bg-gray-50 rounded-lg p-4 mb-6">
				<p className="font-semibold text-gray-900 mb-4">Services You Get</p>
				<ul className="space-y-3">
					{plan.features.map((feature, idx) => (
						<li key={idx} className="flex items-start gap-3">
							<span className="flex-shrink-0 mt-0.5">
								<CheckVerifiedIcon className="w-5 h-5 text-[#F9A94B]" />
							</span>
							<span className="text-sm text-gray-600 leading-relaxed">
								{feature}
							</span>
						</li>
					))}
					{showMore &&
						plan.moreFeatures &&
						plan.moreFeatures.map((feature, idx) => (
							<li key={`more-${idx}`} className="flex items-start gap-3">
								<span className="flex-shrink-0 mt-0.5">
									<CheckVerifiedIcon className="w-5 h-5 text-[#F9A94B]" />
								</span>
								<span className="text-sm text-gray-600 leading-relaxed">
									{feature}
								</span>
							</li>
						))}
				</ul>

				{plan.hasMore && (
					<button
						onClick={() => setShowMore(!showMore)}
						className="bg-transparent p-1 flex items-center gap-1.5 text-brand-700 text-sm font-medium mt-4 hover:underline"
					>
						{showMore ? "Show Less Services" : "Show More Services"}
						{showMore ? (
							<ChevronUp className="w-4 h-4" color="#C67618" />
						) : (
							<ChevronDown className="w-4 h-4" color="#C67618" />
						)}
					</button>
				)}
			</div>

			<Button
				TagName={Link}
				href={plan.buttonLink}
				className="w-full justify-center !text-base !font-semibold"
			>
				{plan.buttonText}
			</Button>
		</div>
	);
}

export default PricingTabs;
