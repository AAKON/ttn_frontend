import React from "react";
import { MapPin, Mail } from "lucide-react";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import Button from "@/components/shared/button";

const ContactInfoContent = ({ sourcing }) => {
	return (
		<div className="space-y-6">
			{/* Address */}
			<div className="bg-gray-50 p-3 rounded-lg">
				<div className="flex items-start gap-3 mb-2">
					<div className="space-y-2 w-full">
						<div className="flex justify-between gap-2">
							<span className="text-gray-500 text-sm">Address</span>
							<span className="text-primary text-sm underline text-brand-700 font-semibold mt-1 hover:underline cursor-pointer">
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

			{/* WhatsApp */}
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
								{sourcing.contact.whatsapp}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Phone */}
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
	);
};

export default ContactInfoContent;
