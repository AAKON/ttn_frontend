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
import {MarkerPinIcon, StarIcon, LoveIcon} from "@/icons";
import Link from "next/link";
import {delFavsCompanyFaq} from "@/services/company";
import {useState} from "react";
import {useToast} from "@/hooks/use-toast";

const CompanyCardFilter = ({company}) => {

    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState(null);
    const { toast } = useToast();

    const handleAddFavourite = async (slug) => {
        setIsAdding(true);
        try {
            await delFavsCompanyFaq(slug, toast);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <Card className="flex flex-col justify-between">
            <div>
                <CardHeader className="grid grid-cols-[1fr_36px] gap-2">
                    <div className="flex items-center gap-3">
                        <div
                            className="size-[64px] rounded-full overflow-hidden flex items-center justify-center border border-gray-500">
                            <Image
                                src={company?.profile_pic ? company?.profile_pic : Profile_pic}
                                width={64}
                                height={64}
                                alt="Profile_pic"
                                className="object-cover w-full h-full rounded-full"
                            />
                        </div>
                        <div className="flex-1">
                            {company?.businessCategory && (
                                <CardTitle className="font-normal text-sm sm:text-md text-brand-500">
                                    {company?.businessCategory}
                                </CardTitle>
                            )}
                            <CardDescription className="font-semibold text-md sm:text-2xl sm:leading-8 text-gray-900">
                                <Link href={`/company/${company?.slug}`}>{company?.name}</Link>
                            </CardDescription>
                        </div>
                    </div>
                    <Button
                        secondary
                        className=" !border-brand-300 !size-9 !py-[3px] !px-2 text-xs font-medium text-gray-500"
                        onClick={() => handleAddFavourite(company?.slug)}
                        disabled={isAdding}
                    >
                        <LoveIcon stroke="#C67618"/>
                    </Button>
                </CardHeader>

                {/* 1st btn start */}
                {company?.compliances &&
                    Array.isArray(company?.compliances) &&
                    company?.compliances.length > 0 && (
                        <CardContent className="flex gap-x-2 mr-2 w-full">
                            {company?.compliances.map((compliance) => (
                                <Button
                                    secondary
                                    className="!border-gray-500 h-[24px] !py-[3px] !px-2 text-xs font-medium text-gray-500"
                                    key={compliance.id}
                                >
                                    {compliance?.name}
                                </Button>
                            ))}
                        </CardContent>
                    )}
                {/* 1st btn end */}

                {/* peragraph start */}
                <CardContent className="flex gap-x-2">
                    <p className="text-gray-500 text-md font-normal leading-6 line-clamp-3">
                        {company?.about}
                    </p>
                </CardContent>
                {/* peragraph end */}
            </div>

            <div>
                {/* -------- */}
                <CardContent className="flex justify-between">
                    {/*<div className="flex gap-2 items-center">*/}
                    {/*  <StarIcon stroke="#FDB022" />*/}
                    {/*  <span className="text-gray-900 font-medium">4.9</span>*/}
                    {/*  <p className="text-gray-500 text-sm">*/}
                    {/*    <span className="mr-1">202</span> reviews*/}
                    {/*  </p>*/}
                    {/*</div>*/}
                    {company?.location && (
                        <div className="flex ml-auto">
                            <MarkerPinIcon stroke="#101828" width={20}/>
                            <span className="text-md font-medium text-gray-900 leading-6 ml-1">
              {company?.location}
            </span>
                        </div>
                    )}
                </CardContent>
                {/* ----------- */}

                {/* last btn start */}
                <CardFooter className="grid grid-cols-2 gap-2">
                    <Button
                        TagName={Link}
                        href={`/company/${company?.slug}`}
                        secondary
                        prefetch={false}
                    >
                        View Profile
                    </Button>
                    <Button TagName={Link} href="/contact" type="button" primaryOutline>
                        Contact supplier
                    </Button>
                </CardFooter>
                {/* last btn end */}
            </div>
        </Card>
    );
};

export default CompanyCardFilter;
