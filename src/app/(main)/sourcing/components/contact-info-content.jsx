import React from "react";
import { MapPin, Mail } from "lucide-react";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import Button from "@/components/shared/button";

const ContactInfoContent = ({ sourcing }) => {
	const parseContactNumber = (val) => {
		if (!val) return "";
		// Matches 2-3 uppercase letters at start followed by a + (e.g. BD+880...)
		const match = val.match(/^([A-Z]{2,3})(\+.*)$/);
		if (match) {
			return match[2];
		}
		return val;
	};

	const displayWhatsapp = parseContactNumber(sourcing.contact.whatsapp);
	const displayPhone = parseContactNumber(sourcing.contact.phone);

	return (
		<div className="space-y-6">
			{/* Address */}
			{sourcing.contact.address && (
				<div className="bg-gray-50 p-3 rounded-lg">
					<div className="flex items-start gap-3 mb-2">
						<div className="space-y-2 w-full">
							<div className="flex justify-between gap-2">
								<span className="text-gray-500 text-sm">Address</span>
								<a
									href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sourcing.contact.address)}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary text-sm underline text-brand-700 font-semibold mt-1 hover:underline cursor-pointer"
								>
									View On Map
								</a>
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
			)}

			{/* Email */}
			{sourcing.contact.email && (
				<div className="bg-gray-50 p-3 rounded-lg">
					<div className="flex items-start gap-3">
						<div className="space-y-1 w-full">
							<div className="flex justify-between gap-2">
								<span className="text-gray-500 text-sm">Email</span>
							</div>
							<div className="flex gap-2">
								<Mail className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
								<p className="text-md font-medium text-gray-900 break-all">
									{sourcing.contact.email}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* WhatsApp */}
			{sourcing.contact.whatsapp && (
				<div className="bg-gray-50 p-3 rounded-lg">
					<div className="flex items-start gap-3">
						<div className="space-y-1 w-full">
							<div className="flex justify-between gap-2">
								<span className="text-gray-500 text-sm">Whatsapp</span>
							</div>
							<div className="flex gap-2">
								<WhatsAppIcon
									stroke="#F7931E"
									className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5"
								/>
								<p className="text-md font-medium text-gray-900">
									{displayWhatsapp}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Phone */}
			{sourcing.contact.phone && (
				<div className="bg-gray-50 p-3 rounded-lg">
					<div className="flex items-start gap-3">
						<div className="space-y-1 w-full">
							<div className="flex justify-between gap-2">
								<span className="text-gray-500 text-sm">Phone</span>
							</div>
							<div className="flex gap-2">
								<PhoneIcon
									stroke="#F7931E"
									className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5"
								/>
								<p className="text-md font-medium text-gray-900">
									{displayPhone}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Action Buttons */}
			<div className="grid grid-cols-2 gap-4">
				{sourcing.contact.email && (
					<Button
						TagName="a"
						href={`mailto:${sourcing.contact.email}`}
						primaryOutline
						className="w-full"
					>
						Send Email
					</Button>
				)}
				{sourcing.contact.whatsapp && (
					<Button
						TagName="a"
						href={`https://wa.me/${displayWhatsapp.replace(/\D/g, "")}`}
						target="_blank"
						rel="noopener noreferrer"
						primary
						className="w-full relative left-0"
					>
						WhatsApp
					</Button>
				)}
			</div>
		</div>
	);
};

export default ContactInfoContent;
