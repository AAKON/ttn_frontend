"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/shared";
import { CheckVerifiedIcon } from "@/components/icons/check-verified"; // Updated import
import { ChevronDownIcon } from "@/components/icons";
import Button from "@/components/shared/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

function PricingTabs() {
	// Functionally we use "Monthly Plan" and "Annual Plan" but structurally we use the previous styling
	const arr = ["Monthly Plan", "Annual Plan"];
	const [activeTab, setActiveTab] = useState(arr[0]);

	const plans = {
		"Monthly Plan": [
			{
				title: "Buying Support",
				price: "Contact For Price",
				isContact: true,
				features: [
					"Find the best suppliers for your needs",
					"Collaborate with trusted industry partners",
					"Optimize costs & sourcing efficiency",
					"Build a sustainable, scalable supply chain",
				],
				buttonText: "Contact Us",
				buttonLink: "/contact",
			},
			{
				title: "Business Consultation",
				price: "Contact For Price",
				isContact: true,
				features: [
					"Expert guidance on apparel sourcing and supply chain management",
					"Market research and trend analysis for strategic growth",
					"Optimized B2B digital",
					"Optimized B2B digital marketing strategies for brand visibility",
					"Assistance in building strong supplier and buyer networks",
					"Personalized consultation to enhance profitability",
				],
				buttonText: "Contact Us",
				buttonLink: "/contact",
			},
			{
				title: "Seller Verification",
				prePrice: "Per Month",
				price: "$9",
				features: [
					"Verified status for trust and credibility",
					"Data updated 1—2 times per month",
					"Recommended to potential clients for higher visibility and trust",
					"Promote in social channels",
				],
				buttonText: "Get Started",
				buttonLink: "/contact", // Adjusted to contact or signup
			},
			{
				title: "Marketing Services",
				prePrice: "Start From",
				price: "$245",
				features: [
					"Profile Creation and Management",
					"Branding and Marketing Materials Design",
					"Content Creation",
					"Social Media Marketing",
					"Digital Ads Management",
					"Website Development",
					"SEO & Website Management",
				],
				hasMore: true,
				moreFeatures: [
					"Email Marketing Campaigns",
					"Analytics & Reporting",
					"Competitor Analysis",
				],
				buttonText: "Get Started",
				buttonLink: "/contact",
			},
		],
		"Annual Plan": [
			// Using same data for Annual as placeholder, assuming identical features with potentially different pricing logic in future
			{
				title: "Buying Support",
				price: "Contact For Price",
				isContact: true,
				features: [
					"Find the best suppliers for your needs",
					"Collaborate with trusted industry partners",
					"Optimize costs & sourcing efficiency",
					"Build a sustainable, scalable supply chain",
				],
				buttonText: "Contact Us",
				buttonLink: "/contact",
			},
			{
				title: "Business Consultation",
				price: "Contact For Price",
				isContact: true,
				features: [
					"Expert guidance on apparel sourcing and supply chain management",
					"Market research and trend analysis for strategic growth",
					"Optimized B2B digital",
					"Optimized B2B digital marketing strategies for brand visibility",
					"Assistance in building strong supplier and buyer networks",
					"Personalized consultation to enhance profitability",
				],
				buttonText: "Contact Us",
				buttonLink: "/contact",
			},
			{
				title: "Seller Verification",
				prePrice: "Per Month",
				price: "$90", // Example annual price
				features: [
					"Verified status for trust and credibility",
					"Data updated 1—2 times per month",
					"Recommended to potential clients for higher visibility and trust",
					"Promote in social channels",
				],
				buttonText: "Get Started",
				buttonLink: "/contact",
			},
			{
				title: "Marketing Services",
				prePrice: "Start From",
				price: "$2450", // Example annual price
				features: [
					"Profile Creation and Management",
					"Branding and Marketing Materials Design",
					"Content Creation",
					"Social Media Marketing",
					"Digital Ads Management",
					"Website Development",
					"SEO & Website Management",
				],
				hasMore: true,
				moreFeatures: [
					"Email Marketing Campaigns",
					"Analytics & Reporting",
					"Competitor Analysis",
				],
				buttonText: "Get Started",
				buttonLink: "/contact",
			},
		],
	};

	return (
		<Container>
			<Tabs
				defaultValue="Monthly Plan"
				className="pb-10"
				onValueChange={setActiveTab}
			>
				<div className="md:py-10 py-6 bg-white sticky top-[70px] z-10">
					<TabsList className="!h-auto flex justify-center !bg-transparent pl-0">
						<div className="bg-gray-50 p-2 rounded-[12px] !inline-flex justify-center border border-gray-100">
							{arr.map((el, idx) => {
								return (
									<TabsTrigger
										key={idx}
										value={el}
										className={cn(
											"!text-sm lg:!text-xl !px-3 !py-2 rounded-[8px] lg:!py-[10px] lg:!px-5 transition-all",
											"data-[state=active]:font-semibold data-[state=active]:text-white data-[state=active]:bg-brand-600",
											"data-[state=inactive]:font-medium data-[state=inactive]:text-gray-700 data-[state=inactive]:bg-transparent"
										)}
									>
										{el}
									</TabsTrigger>
								);
							})}
						</div>
					</TabsList>
				</div>

				{arr.map((tabName) => (
					<TabsContent key={tabName} value={tabName} className="mt-0">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{plans[tabName].map((plan, index) => (
								<PricingCard key={index} plan={plan} />
							))}
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
		<div className="flex flex-col bg-white rounded-xl border border-gray-100 shadow-pricing-card-shadow p-4 lg:p-5 hover:border-[#F7931E] transition-colors duration-300">
			<div className="mb-6 h-[156px] flex flex-col justify-between">
				<h3 className="text-2xl font-normal text-gray-600 mb-4 flex items-center">
					{plan.title}
				</h3>

				<div className="mb-4 space-y-1">
					{plan.prePrice && (
						<div className="text-xl text-gray-500">{plan.prePrice}</div>
					)}

					{plan.isContact ? (
						<div>
							<div className="text-2xl font-bold text-gray-900 leading-tight">
								Contact
							</div>
							<div className="text-2xl font-bold text-gray-900 leading-tight">
								For Price
							</div>
						</div>
					) : (
						<div className="text-5xl font-bold text-gray-900">{plan.price}</div>
					)}
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
						<ChevronDownIcon
							stroke="#C67618"
							className={cn(
								"w-4 h-4 transition-transform",
								showMore && "rotate-180"
							)}
						/>
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
