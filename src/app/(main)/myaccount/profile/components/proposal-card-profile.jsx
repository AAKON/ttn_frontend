import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import Button from "@/components/shared/button";
import { MarkerPinIcon, LoveIcon, EditIcon, ViewAs, DeleteIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { toggleFavsSourcingProposal } from "@/services/company";
import ConfirmDeleteDialogSm from "@/app/(main)/myaccount/company/edit/[slug]/_components/confirmDeleteDialogSm";
import { useToast } from "@/hooks/use-toast";
import { delSourcingProposal } from "@/services/company";
import { formatDateTime } from "@/utils/dateFormatter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ContactInfoContent from "@/app/(main)/sourcing/components/contact-info-content";

import SourcingEditSheet from "@/components/shared/sourcing/sourcing-edit-sheet";

const statusStyles = {
    pending: "bg-status-pending text-status-pending",
    approved: "bg-status-approved text-status-approved",
    rejected: "bg-status-rejected text-status-rejected",
};

const ProposalCardProfile = ({ type, onItemRemove, onFavoriteToggle, data }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [error, setError] = useState(null);
    const { toast } = useToast();
    const [isFavorite, setIsFavorite] = useState(data?.is_favorited || false);

    const handleRemove = async (id) => {
        setIsDeleting(true);
        try {
            const response = await delSourcingProposal(id, toast);
            if (response) {
                onItemRemove();
            }
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsDeleting(false);
            setOpenDialog(false);
        }
    };

    const handleToggleFavorite = async () => {
        const previousFavorite = isFavorite;
        setIsFavorite(!previousFavorite);
        try {
            const success = await toggleFavsSourcingProposal(data?.id, toast);
            if (success) {
                onFavoriteToggle?.();
            } else {
                setIsFavorite(previousFavorite);
            }
        } catch (err) {
            setIsFavorite(previousFavorite);
        }
    };

    return (
        <Card className="h-full flex flex-col justify-between">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center font-medium gap-2 text-gray-900">
                            <MarkerPinIcon stroke="#101828" width={20} height={20} />
                            <span className="text-sm font-medium">
                                {data?.location?.name || data?.location}
                            </span>
                        </div>
                        {data?.company_name && (
                            <div className="flex flex-wrap gap-2 items-center text-gray-500 mb-3">
                                <span className="font-normal pr-2 border-r border-gray-200">
                                    <Link className="hover:text-primary" href={`/company/${data?.company_slug}`}>{data?.company_name?.length > 25 ? data.company_name.slice(0, 25) + '...' : data?.company_name}</Link>
                                </span>
                                <span>{formatDateTime(data?.created_at)}</span>
                            </div>
                        )}
                    </div>
                    {/* Favorite Button - matching company card style */}
                    {type === 'mySourcing' && (
                        <span className={`text-sm font-medium capitalize ${statusStyles[data?.status] || statusStyles.pending} bg-opacity-5 px-2 py-1 rounded-[6px]`}>{data?.status}</span>)}
                    {type === 'myFavourites' && (
                        isFavorite ? (
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
                        )
                    )}
                </div>
                <div className="pb-3">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4 line-clamp-2">
                        {data?.title}
                    </h3>
                    {data?.product_categories && Array.isArray(data.product_categories) && data.product_categories.slice(0, 2).map((category) => (
                        <span
                            className="py-[3px] pt-[5px] px-2 text-xs font-medium text-gray-500 rounded-[6px] border border-gray-300 inline-block"
                            key={category.id}
                        >
                            {category?.name}
                        </span>
                    ))}
                </div>
            </CardHeader>

            <CardContent className="flex gap-x-2">
                <p className="text-gray-500 text-md font-normal leading-6 line-clamp-3">
                    {data?.description?.replace(/<[^>]*>/g, '') || ''}
                </p>
            </CardContent>

            <CardFooter className="flex gap-2">
                {type === 'myFavourites' && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button secondary className="grow">
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
                                        address: data?.location?.name || data?.location || "",
                                        email: data?.email || "",
                                        whatsapp: data?.whatsapp || "",
                                        phone: data?.phone || "",
                                    },
                                }}
                            />
                        </DialogContent>
                    </Dialog>
                )}
                {type === 'mySourcing' && (
                    <ConfirmDeleteDialogSm
                        isDelCompany
                        showLabel={false}
                        open={openDialog}
                        setOpen={setOpenDialog}
                        onConfirm={() => handleRemove(data?.id)}
                        isDeleting={isDeleting}
                    />)}
                {type === 'mySourcing' && (
                    <Button className="grow" onClick={() => setOpenEdit(true)} secondary>
                        Edit Proposal
                    </Button>
                )}
                <Button className="grow" TagName={Link} prefetch={false} href={`/sourcing/${data?.id}`} primaryOutline>
                    View Details
                </Button>
            </CardFooter>
            <SourcingEditSheet
                open={openEdit}
                onOpenChange={setOpenEdit}
                proposalId={data?.id}
                onSuccess={onItemRemove}
            />
        </Card >
    );
};

export default ProposalCardProfile;
