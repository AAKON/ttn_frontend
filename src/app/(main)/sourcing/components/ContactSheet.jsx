"use client";
import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import ContactInfoContent from "./contact-info-content";

export default function ContactSheet({ sourcing }) {
	const [showContact, setShowContact] = useState(false);

	return (
		<>
			{/* Mobile Contact Button */}
			<div className="lg:hidden">
				<button
					onClick={() => setShowContact(true)}
					className="w-full bg-brand-600 text-white py-3 px-4 rounded-xl flex items-center justify-between cursor-pointer shadow-sm hover:bg-brand-700 transition-colors"
				>
					<span className="font-semibold">Contact With Business Owner</span>
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
					<h3 className="text-lg font-bold text-gray-900 mb-6">Contact</h3>
					<ContactInfoContent sourcing={sourcing} />
				</div>
			</div>
		</>
	);
}
