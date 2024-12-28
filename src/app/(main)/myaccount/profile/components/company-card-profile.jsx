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
import {MarkerPinIcon, StarIcon, EditIcon, ViewAs, DeleteIcon} from "@/icons";
import Link from "next/link";
import React, {useState} from "react";
import ConfirmDeleteDialogSm from "@/app/(main)/myaccount/company/edit/[slug]/_components/confirmDeleteDialogSm";
import {useToast} from "@/hooks/use-toast";
import {delFavsCompanyFaq} from "@/services/company";

const CompanyCardProfile = ({ type, onItemRemove, data }) => {

    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [error, setError] = useState(null);
    const { toast } = useToast();

    const handleRemove = async (slug) => {
        setIsDeleting(true);
        try {
            const response = await delFavsCompanyFaq(slug, toast);
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

  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_auto] gap-2">
        <div className="flex items-center gap-3">
          <div className="size-[64px] rounded-full overflow-hidden flex items-center justify-center border border-gray-500">
            <Image
              src={data?.thumbnail_url ? data?.thumbnail_url : Profile_pic}
              width={64}
              height={64}
              alt="Profile_pic"
              className="object-cover w-full h-full rounded-full"
            />
          </div>
          <div className="flex-1 space-y-1">
            {data?.businessCategory && (
              <CardTitle className="font-normal text-base text-gray-500">
                {data?.businessCategory?.name}dada
              </CardTitle>
            )}
            <CardDescription className="font-semibold text-md sm:text-2xl sm:leading-8 text-gray-900">
              {data?.name}
            </CardDescription>
          </div>
        </div>
        <span className="flex items-center gap-[6px] bg-gray-50 rounded-sm !h-6 px-[6px] py-1 border border-brand-200">
          <ViewAs stroke="#F7931E" width={14} height={10} />
          <span className="text-brand-600 text-sm">3.4k</span>
        </span>
      </CardHeader>

      {/* 1st btn start */}
      {data?.compliances &&
        Array.isArray(data?.compliances) &&
        data?.compliances.length > 0 && (
          <CardContent className="flex gap-x-2 mr-2 w-full">
            {data?.compliances.map((compliance) => (
              <span
                className="py-[3px] pt-[5px] px-2 text-xs font-medium text-gray-500 rounded-[6px] border border-gray-300 inline-block"
                key={compliance.id}
              >
                {compliance?.name}
              </span>
            ))}
          </CardContent>
        )}
      {/* 1st btn end */}

      {/* peragraph start */}
      <CardContent className="flex gap-x-2">
        <p className="text-gray-500 text-md font-normal leading-6">
          {data?.about}
        </p>
      </CardContent>
      {/* peragraph end */}

      {/* -------- */}
      <CardContent className="flex justify-between">
          <div></div>
        {/*<div className="flex gap-2 items-center">*/}
        {/*  <StarIcon stroke="#FDB022" />*/}
        {/*  <span className="text-gray-900 font-medium">4.9</span>*/}
        {/*  <p className="text-gray-500 text-sm">*/}
        {/*    <span className="mr-1">202</span> reviews*/}
        {/*  </p>*/}
        {/*</div>*/}
        {data?.location && (
          <div className="flex">
            <MarkerPinIcon stroke="#101828" width={20} />
            <span className="text-md font-medium text-gray-900 leading-6 ml-1">
              {data?.location?.name}
            </span>
          </div>
        )}
      </CardContent>
      {/* ----------- */}

      {/* last btn start */}
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button TagName={Link} href={`/company/${data?.slug}`} secondary>
          View Profile
        </Button>
          {type === 'myCompanies' && (
        <Button TagName={Link} href={`/myaccount/company/edit/${data?.slug}`} type="button" primaryOutline className="group">
          <EditIcon className="group-hover:!stroke-white !stroke-brand-600 transition-all" />
          Edit
        </Button>)}
          {type === 'myFavourites' && (
              <ConfirmDeleteDialogSm
                  isDelCompany
                 open={openDialog}
                 setOpen={setOpenDialog}
                 onConfirm={() => handleRemove(data?.slug)}
                 isDeleting={isDeleting}
              />
              )}
      </CardFooter>
      {/* last btn end */}
    </Card>
  );
};

export default CompanyCardProfile;
