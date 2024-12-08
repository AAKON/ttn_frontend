import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Button from "@/components/ui/button";

import Profile_pic from "@/assets/CodeBlue.svg";
import { MarkerPinIcon, StarIcon, LoveIcon } from "@/icons";
import Link from "next/link";

const CompanyCard = ({data}) => {
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_36px] gap-2">
        <div className="flex items-center gap-3">
          <div className="size-[64px] rounded-full overflow-hidden flex items-center justify-center p-2 border border-gray-500">
            <Image
              src={Profile_pic}
              width={64}
              height={64}
              alt="Profile_pic"
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            {data?.businessCategory &&
            <CardTitle className="font-normal text-sm sm:text-md text-brand-500">
              {data?.businessCategory?.name}
            </CardTitle>}
            <CardDescription className="font-semibold text-md sm:text-2xl sm:leading-8 text-gray-900">
              {data?.name}
            </CardDescription>
          </div>
        </div>
        <Button
          secondary
          className="!border-brand-300 size-9 !py-[3px] !px-2 text-xs font-medium text-gray-500"
        >
          <LoveIcon stroke="#C67618" />
        </Button>
      </CardHeader>

      {/* 1st btn start */}
      {data?.compliances && Array.isArray(data?.compliances) && data?.compliances.length > 0 &&
      <CardContent className="flex gap-x-2 mr-2 w-full">
        {data?.compliances.map((compliance) => (
            <Button
                secondary
                className="!border-gray-500 h-[24px] !py-[3px] !px-2 text-xs font-medium text-gray-500"
                key={compliance.id}
            >
              {compliance?.name}
            </Button>
            ))}
      </CardContent>}
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
        <div className="flex gap-2 items-center">
          <StarIcon stroke="#FDB022" />
          <span className="text-gray-900 font-medium">4.9</span>
          <p className="text-gray-500 text-sm">
            <span className="mr-1">202</span> reviews
          </p>
        </div>
        {data?.location &&
        <div className="flex">
          <MarkerPinIcon stroke="#101828" width={20} />
          <span className="text-md font-medium text-gray-900 leading-6 ml-1">
            {data?.location?.name}
          </span>
        </div>}
      </CardContent>
      {/* ----------- */}

      {/* last btn start */}
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button TagName={Link} href={`/company/${data?.slug}`} secondary>
          View Profile
        </Button>
        <Button type="button" primaryOutline>
          Contact supplier
        </Button>
      </CardFooter>
      {/* last btn end */}
    </Card>
  );
};

export default CompanyCard;
