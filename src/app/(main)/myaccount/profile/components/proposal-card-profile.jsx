import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Button from "@/components/shared/button";

import Profile_pic from "@/assets/CodeBlue.svg";
import { MarkerPinIcon, StarIcon, EditIcon, ViewAs, DeleteIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import ConfirmDeleteDialogSm from "@/app/(main)/myaccount/company/edit/[slug]/_components/confirmDeleteDialogSm";
import { useToast } from "@/hooks/use-toast";
import { toggleFavsSourcingProposal } from "@/services/company";

const ProposalCardProfile = ({ type, onItemRemove, data }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [error, setError] = useState(null);
    const { toast } = useToast();

    const handleRemove = async (id) => {
        setIsDeleting(true);
        try {
            const response = await toggleFavsSourcingProposal(id, toast);
            if (response) {
                setOpenDialog(false);
                onItemRemove();
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsDeleting(false);
        }
    };

    const thumbnail = data?.images_urls?.[0]?.thumbnail || Profile_pic;

    return (
        <Card>
            <CardHeader className="grid grid-cols-[1fr_auto] gap-2">
                <div className="flex items-center gap-3">
                    <div className="size-[64px] rounded-full overflow-hidden flex items-center justify-center border border-gray-200">
                        <Image
                            src={thumbnail}
                            width={62}
                            height={62}
                            alt="Proposal Image"
                            className="object-cover w-full h-full rounded-full"
                        />
                    </div>
                    <div className="flex-1 space-y-1">
                        <CardDescription className="font-semibold text-md sm:text-2xl sm:leading-8 text-gray-900">
                            {data?.title}
                        </CardDescription>
                    </div>
                </div>
                {/* Proposals don't have view count in the snippet, commented out if not present */}
                {/* <span className="flex items-center gap-[6px] bg-gray-50 rounded-sm !h-6 px-[6px] py-1 border border-brand-200">
          <ViewAs stroke="#F7931E" width={14} height={10} />
          <span className="text-brand-600 text-sm">{data?.view_count}</span>
        </span> */}
            </CardHeader>

            <CardContent className="flex gap-x-2 mr-2 w-full">
                {/* Categories could be added here if needed */}
                {data?.product_categories && Array.isArray(data.product_categories) && data.product_categories.slice(0, 2).map((category) => (
                    <span
                        className="py-[3px] pt-[5px] px-2 text-xs font-medium text-gray-500 rounded-[6px] border border-gray-300 inline-block"
                        key={category.id}
                    >
                        {category?.name}
                    </span>
                ))}
            </CardContent>

            <CardContent className="flex gap-x-2">
                <p className="text-gray-500 text-md font-normal leading-6 line-clamp-3">
                    {data?.description}
                </p>
            </CardContent>

            <CardContent className="flex justify-between">
                <div></div>
                {data?.location && (
                    <div className="flex">
                        <MarkerPinIcon stroke="#101828" width={20} />
                        <span className="text-md font-medium text-gray-900 leading-6 ml-1">
                            {data?.location?.name}
                        </span>
                    </div>
                )}
            </CardContent>

            <CardFooter className="grid grid-cols-2 gap-2">
                <Button TagName={Link} prefetch={false} href={`/sourcing/${data?.id}`} secondary>
                    View Proposal
                </Button>
                {type === "myFavourites" && (
                    <ConfirmDeleteDialogSm
                        isDelCompany
                        open={openDialog}
                        setOpen={setOpenDialog}
                        onConfirm={() => handleRemove(data?.id)}
                        isDeleting={isDeleting}
                    />
                )}
            </CardFooter>
        </Card>
    );
};

export default ProposalCardProfile;
