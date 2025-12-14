import Image from "next/image";
import Button from "@/components/shared/button";
import {Container} from "@/shared";
import AU from "@/assets/AU.png";
import CodeBlue from "@/assets/CodeBlue.svg";

import {
    BuildingTwoIcon,
    EditIcon,
    EyeIcon,
    GridIcon,
    MarkerPinIcon
} from "@/icons";
import Link from "next/link";
import TagsView from "@/app/(main)/company/[slug]/components/tags-view";
import BookmarkCompany from "@/app/(main)/company/[slug]/components/bookmarkCompany";
import Claim from "@/app/(main)/company/[slug]/components/claim";
import ShareModal from "@/components/company/share-modal";

const SourcingDetailsFrame = ({slug, headerData, is_favorite, className}) => {
    const {
        company_id,
        bannerImage,
        profileImage,
        moto,
        tags,
        name,
        viewCount,
        location,
        categories,
        btypes,
        companyName,
        created,
        canEdit,
        canClaim,
    } = headerData;

    return (
        <div className={`relative ${className}`}>

            <Container>
                <div
                    className="bg-white border border-gray-100 p-8 rounded-2xl grid grid-cols-1 gap-8 xl:gap-12">
                    <div className="flex items-start lg:flex-row flex-col gap-4 lg:justify-between">
                        <div className="space-y-1">
                            <p>28 Feb 2024 02:37</p>
                            <h3 className="text-gray-900 md:text-[20px] lg:text-[30px] text-[18px] font-semibold">Looking for T-shirt Manufacturer in Bangladesh</h3>
                        </div>

                        <div className="flex lg:gap-4 gap-2">
                            {!canEdit && (
                                <Button
                                    className="!p-3 lg:text-[16px] text-[14px] !font-semibold  size-12"
                                    TagName={Link}
                                    href={`/myaccount/company/edit/${slug}`}
                                >
                                    <EditIcon stroke="#ffffff"/>
                                </Button>
                            )}
                            <ShareModal/>
                            <BookmarkCompany slug={slug} is_favorite={is_favorite} heartIcon/>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        <LdtCard
                            icon={<BuildingTwoIcon/>}
                            text={"Company Name"}
                            title={"ABC Group"}
                        />
                        <LdtCard icon={<GridIcon/>} text={"Category"} title={"T-Shirt"}/>
                        <LdtCard
                            icon={<MarkerPinIcon/>}
                            text={"Location"}
                            ExtSrc={location?.flag_path ? location?.flag_path : AU}
                            title={"Bangladesh"}
                        />
                        <LdtCard icon={<EyeIcon/>} text={"Views"} title={"123"}/>
                    </div>
                </div>
            </Container>
        </div>
    );
};

// LTD Card
export function LdtCard({icon, text, title, ExtSrc}) {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center lg:gap-[11px] gap-2">
                {icon}
                <p className="text-gray-400 font-light lg:text-lg text-[14px]">
                    {text}
                </p>
                </div>
            <h3>{title}</h3>
        </div>
    );
}

export default SourcingDetailsFrame;
