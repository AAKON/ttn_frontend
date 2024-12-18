import Image from "next/image";
import Button from "@/components/shared/button";
import { Container } from "@/shared";
import shield_tick from "@/assets/shield-tick.png";
import AU from "@/assets/AU.png";
import CodeBlue from "@/assets/CodeBlue.svg";

import {
  BookmarkIcon,
  BuildingOneIcon,
  BuildingTwoIcon,
  EyeIcon,
  GridIcon,
  MarkerPinIcon,
  ShareBoldIcon,
  TagsIcon,
} from "@/icons";
import ShareModal from "./share-modal";
import DateFormatter from "@/utils/dateFormatter";

const Frame = ({ headerData, className }) => {

  const {bannerImage, profileImage, moto, tags, name, viewCount, location, category, companySize, created, canEdit, canClaim} =headerData;

  return (
    <div className={`relative ${className}`}>
      <div className="bg-detailBennar bg-no-repeat bg-center bg-cover lg:h-[440px] h-[42.667vw] w-full" style={
        {backgroundImage: `url(${bannerImage ? bannerImage : ''})`}
      }></div>

      <Container>
        <div className="bg-white border border-gray-100 p-8 rounded-2xl -mt-[140px] grid grid-cols-1 gap-8 xl:gap-12">
          <div className="flex items-start lg:flex-row flex-col gap-4 lg:justify-between">
            <div className="flex lg:flex-row flex-col lg:items-center gap-3.5">
              <Image
                className="border rounded-full object-cover lg:w-[70px] lg:h-[70px] w-[64px] h-[64px]"
                src={profileImage ? profileImage : ''}
                width={70} height={70}
                alt={name}
              />
              <div className="flex flex-col gap-[10px]">
                <p className="text-brand-600 lg:text-sm lg:leading-sm lg:font-semibold text-[12px] font-bold leading-[18px] uppercase">
                  {moto}
                </p>
                <h3 className="text-gray-900 flex gap-4 lg:text-3xl lg:leading-[38px] text-[20px] leading-[30px] font-semibold">
                  {name}
                  <Image
                    src={shield_tick}
                    alt="CompanyIcon"
                    className="max-sm:w-6 max-sm:h-6"
                  />
                </h3>
                <div className="flex flex-wrap lg:flex-row flex-col lg:gap-6 gap-[10px]">
                  <h6 className="text-gray-600 lg:text-md :leading-lg text-sm leading-sm font-normal flex items-center lg:gap-[10px] gap-[8px]">
                    <TagsIcon />
                    {tags}
                    <span className="max-sm:hidden lg:block">/Mixed Rags</span>
                  </h6>
                  <h6 className="text-gray-600 lg:text-md :leading-lg text-sm leading-sm font-normal flex items-center lg:gap-[10px] gap-[8px]">
                    <BuildingOneIcon /> Joined: <DateFormatter publishDate={created} />
                  </h6>
                </div>
              </div>
            </div>

            <div className="flex lg:gap-4 gap-2">
              {/* Share Modal */}
              <>
                <ShareModal />
              </>
              <Button
                secondary
                className="!bg-transparent !text-gray-700 border lg:text-[16px] text-[14px] !font-semibold !border-gray-200 lg:!h-[48px] lg:w-[190px] h-9 w-[270px] "
              >
                Claim this Business
              </Button>
              <Button className="lg:text-[16px] text-[14px] !font-semibold lg:!h-[48px] h-9">
                <BookmarkIcon stroke="#ffffff" />
                <span className="max-sm:hidden sm:hidden md:block">Save</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <LdtCard
              icon={<GridIcon />}
              text={"Category"}
              title={category}
            />
            <LdtCard
              icon={<BuildingTwoIcon />}
              text={"Company size"}
              title={companySize}
            />
            <LdtCard
              icon={<MarkerPinIcon />}
              text={"Location"}
              ExtSrc={AU}
              title={location}
            />
            <LdtCard
              icon={<EyeIcon />}
              text={"Monthly Visitor"}
              title={viewCount}
            />
          </div>
        </div>
      </Container>
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
      <h3 className="text-gray-900 lg:text-lg text-[14px] font-medium flex items-center gap-2">
        {title}
        {ExtSrc ? (
          <Image src={ExtSrc} alt="ExtSrc" className="lg:h-6 lg:w-6 h-5 w-5" />
        ) : (
          false
        )}
      </h3>
    </div>
  );
}

export default Frame;
