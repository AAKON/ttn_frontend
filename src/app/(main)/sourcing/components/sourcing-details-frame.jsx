import Image from "next/image";
import Button from "@/components/shared/button";
import { Container } from "@/shared";
import AU from "@/assets/AU.png";
import CodeBlue from "@/assets/CodeBlue.svg";

import {
	BuildingTwoIcon,
	EditIcon,
	EyeIcon,
	GridIcon,
	MarkerPinIcon,
} from "@/icons";
import Link from "next/link";
import TagsView from "@/app/(main)/company/[slug]/components/tags-view";
import BookmarkProposal from "./bookmarkProposal";
import Claim from "@/app/(main)/company/[slug]/components/claim";
import ShareModal from "@/components/company/share-modal";

const SourcingDetailsFrame = ({ slug, headerData, is_favorite, className }) => {
	const {
		title,
		company_name,
		category,
		location,
		posted_date,
		proposal_views,
	} = headerData;

	return (
		<div className={`relative ${className}`}>
			<div className="bg-white border border-gray-100 p-4 lg:p-6 xl:p-8 rounded-2xl grid grid-cols-1 gap-6 xl:gap-8">
				<div className="">
					<div className="grid grid-cols-[1fr_auto] gap-2">
						<p>{posted_date}</p>
						<div className="flex lg:gap-4 gap-2">
							<ShareModal />
							<BookmarkProposal
								id={slug}
								is_favorite={is_favorite}
								heartIcon
							/>
						</div>
					</div>
					<h3 className="inline-block text-gray-900 md:text-[20px] lg:text-[30px] text-[18px] font-semibold lg:-mt-3">
						{title}
					</h3>
				</div>

				<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
					<LdtCard
						icon={<BuildingTwoIcon />}
						text={"Company Name"}
						title={company_name}
					/>
					<LdtCard icon={<GridIcon />} text={"Category"} title={category} />
					<LdtCard
						icon={<MarkerPinIcon />}
						text={"Location"}
						ExtSrc={typeof location === "object" ? location?.flag_path : AU}
						title={typeof location === "object" ? location?.name : location}
					/>
					<LdtCard
						icon={<EyeIcon />}
						text={"Views"}
						title={proposal_views?.toString()}
					/>
				</div>
			</div>
		</div>
	);
};

// LTD Card
export function LdtCard({ icon, text, title, ExtSrc }) {
	return (
		<div className="flex flex-col gap-1">
			<div className="flex items-center lg:gap-[11px] gap-2">
				{icon}
				<p className="text-gray-400 font-light lg:text-lg text-[14px]">
					{text}
				</p>
			</div>
			<div className="flex items-center gap-2.5">
				<h3>{title}</h3>
				{ExtSrc && (
					<div className="w-6 h-6 overflow-hidden rounded-full">
						<img src={ExtSrc} alt="flag" />
					</div>
				)}
			</div>
		</div>
	);
}

export default SourcingDetailsFrame;
