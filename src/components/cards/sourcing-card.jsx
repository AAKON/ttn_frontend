import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import Button from "@/components/shared/button";
import { MarkerPinIcon, LoveIcon } from "@/icons";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { toggleFavsSourcingProposal } from "@/services/company";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import ContactInfoContent from "@/app/(main)/sourcing/components/contact-info-content";
import { formatDateTime } from "@/utils/dateFormatter";

const stripHtml = (html) => {
	if (!html) return "";
	return html.replace(/<[^>]*>?/gm, "");
};

const SourcingCard = ({ sourcing }) => {
	const [isFavorite, setIsFavorite] = useState(sourcing?.is_favorited || false);

	const { toast } = useToast();
	const handleToggleFavorite = async () => {
		const previousFavorite = isFavorite;
		setIsFavorite(!previousFavorite);
		try {
			const success = await toggleFavsSourcingProposal(sourcing?.id, toast);
			if (!success) {
				setIsFavorite(previousFavorite);
			}
		} catch (err) {
			setIsFavorite(previousFavorite);
		}
	};

	return (
		<Card className="flex flex-col justify-between border">
			<div>
				{/* Header with Location and Favorite */}
				<CardHeader className="pb-3">
					<div className="flex items-start justify-between">
						<div className="space-y-2">
							<div className="flex items-center font-medium gap-2 text-gray-900">
								<MarkerPinIcon stroke="#101828" width={20} height={20} />
								<span className="text-sm font-medium">
									{sourcing?.location?.name || sourcing?.location}
								</span>
							</div>
							{sourcing?.company_name && (
								<div className="flex flex-wrap gap-2 items-center text-gray-500 mb-3">
									<span className="font-normal pr-2 border-r border-gray-200">
										<Link className="hover:text-primary" href={`/company/${sourcing?.company_slug}`}>{sourcing?.company_name}</Link>
									</span>
									<span>{formatDateTime(sourcing?.created_at)}</span>
								</div>
							)}
						</div>
						{/* Favorite Button - matching company card style */}
						{isFavorite ? (
							<Button
								className="!border-brand-600 !size-9 !py-[3px] !px-2 !bg-brand-600"
								onClick={handleToggleFavorite}
							>
								<LoveIcon stroke="#ffffff" />
							</Button>
						) : (
							<Button
								secondary
								className="!border-brand-300 !size-9 !py-[3px] !px-2"
								onClick={handleToggleFavorite}
							>
								<LoveIcon stroke="#C67618" />
							</Button>
						)}
					</div>
				</CardHeader>

				{/* Company Name and Date */}
				<CardContent className="pb-3">
					{/* Title */}
					<h3 className="text-2xl font-semibold text-gray-900 mb-4 line-clamp-2">
						{sourcing?.title}
					</h3>

					{/* Tags/Categories */}
					{sourcing?.tags &&
						Array.isArray(sourcing?.tags) &&
						sourcing?.tags.length > 0 && (
							<div className="flex flex-wrap gap-2 mb-4">
								{sourcing?.tags.map((tag, index) => (
									<button
										className="border-0 !h-[24px] !py-[2px] px-2 text-xs font-medium text-gray-500 bg-gray-100 rounded-sm "
										key={index}
									>
										{tag}
									</button>
								))}
							</div>
						)}

					{/* Description */}
					<p className="text-gray-500 text-md font-normal leading-6 line-clamp-3">
						{stripHtml(sourcing?.description)}
					</p>
				</CardContent>
			</div>

			{/* Footer Buttons - matching company card style */}
			<CardFooter className="grid grid-cols-2 gap-2">
				<Dialog>
					<DialogTrigger asChild>
						<Button secondary className="w-full">
							Contact Buyer
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[400px] p-6 !rounded-2xl">
						<DialogHeader className="mb-4">
							<DialogTitle className="text-lg font-bold text-gray-900 border-none">
								Contact
							</DialogTitle>
						</DialogHeader>
						<ContactInfoContent
							sourcing={{
								contact: {
									address: sourcing?.location?.name || sourcing?.location || "",
									email: sourcing?.email || "",
									whatsapp: sourcing?.whatsapp || "",
									phone: sourcing?.phone || "",
								},
							}}
						/>
					</DialogContent>
				</Dialog>

				<Button
					TagName={Link}
					href={`/sourcing/${sourcing?.id}`}
					type="button"
					primaryOutline
				>
					View Details
				</Button>
			</CardFooter>
		</Card>
	);
};

export default SourcingCard;
