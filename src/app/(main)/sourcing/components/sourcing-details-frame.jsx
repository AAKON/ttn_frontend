"use client";
import Image from "next/image";
import Button from "@/components/shared/button";
import { Container } from "@/shared";
import AU from "@/assets/AU.png";
import CodeBlue from "@/assets/CodeBlue.svg";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { delSourcingProposal } from "@/services/company";
import ConfirmDeleteDialogSm from "@/app/(main)/myaccount/company/edit/[slug]/_components/confirmDeleteDialogSm";
import SourcingEditSheet from "@/components/shared/sourcing/sourcing-edit-sheet";

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


const SourcingDetailsFrame = ({ slug, headerData, is_favorite, className, isOwner }) => {
	const {
		title,
		company_name,
		company_slug,
		category,
		location,
		posted_date,
		status,
		proposal_views,
	} = headerData;

	const [isDeleting, setIsDeleting] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const { toast } = useToast();
	const router = useRouter();

	const handleRemove = async () => {
		setIsDeleting(true);
		try {
			const response = await delSourcingProposal(slug, toast);
			if (response) {
				router.push("/myaccount/profile#sourcing");
			}
		} catch (err) {
			console.error(err);
		} finally {
			setIsDeleting(false);
			setOpenDialog(false);
		}
	};


	const statusStyles = {
		pending: "bg-status-pending text-status-pending",
		approved: "bg-status-approved text-status-approved",
		rejected: "bg-status-rejected text-status-rejected",
	};

	return (
		<div className={`relative ${className}`}>
			<div className="bg-white border border-gray-100 p-4 lg:p-6 xl:p-8 rounded-2xl grid grid-cols-1 gap-6 xl:gap-8">
				<div className="">
					<div className="grid grid-cols-[1fr_auto] gap-2">
						<div className="flex items-center gap-2">
							<p>{posted_date}</p>
							<p className={`text-sm font-medium capitalize ${statusStyles[status] || statusStyles.pending} bg-opacity-5 px-2 py-1 rounded-[6px]`}>{status}</p>
						</div>
						<div className="flex lg:gap-4 gap-2">
							{isOwner && (
								<ConfirmDeleteDialogSm
									isDelCompany
									showLabel={false}
									open={openDialog}
									setOpen={setOpenDialog}
									onConfirm={handleRemove}
									isDeleting={isDeleting}
									triggerVariant="secondary"
									triggerClassName="!p-3 lg:!size-[48px] !text-gray-400"
								/>
							)}
							{isOwner && (
								<Button
									secondary className="!p-3 lg:!size-[48px] !text-gray-400"
									onClick={() => setOpenEdit(true)}
								>
									<EditIcon />
								</Button>
							)}
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
						href={company_slug ? `/company/${company_slug}` : null}
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
			<SourcingEditSheet
				open={openEdit}
				onOpenChange={setOpenEdit}
				proposalId={slug}
				onSuccess={() => router.refresh()}
			/>
		</div>
	);
};

// LTD Card
export function LdtCard({ icon, text, title, ExtSrc, href }) {
	return (
		<div className="flex flex-col gap-1">
			<div className="flex items-center lg:gap-[11px] gap-2">
				{icon}
				<p className="text-gray-400 font-light lg:text-lg text-[14px]">
					{text}
				</p>
			</div>
			<div className="flex items-center gap-2.5">
				{href ? (
					<Link href={href} className="hover:text-primary hover:underline">
						<h3>{title}</h3>
					</Link>
				) : (
					<h3>{title}</h3>
				)}
				{ExtSrc && (
					<div className="w-6 h-6 overflow-hidden rounded-full">
						<img className="size-6 object-cover" src={ExtSrc} alt="flag" />
					</div>
				)}
			</div>
		</div>
	);
}

export default SourcingDetailsFrame;
