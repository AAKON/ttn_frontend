import Image from "next/image";
import profilePIc from "@/assets/Profilepic.png";
import Button from "@/components/shared/button";
import loc from "@/assets/loc.svg";
import tag from "@/assets/tag.svg";
import Link from "next/link";

const CompanyCard = ({ item }) => {
  const { name, thumbnail_url, about, slug, location, businessCategory } = item;
  return (
    <div className="h-full py-8 px-4 2xl:py-10 2xl:px-6 text-center bg-white rounded-2xl shadow-card-shadow">
      <div className="size-[100px] md:size-[140px] rounded-full overflow-hidden flex items-center justify-center p-1 border-4 border-brand-500 mx-auto">
        <Image
          className="max-w-full object-cover"
          src={thumbnail_url ? thumbnail_url : profilePIc}
          alt="Company Logo"
          width={124}
          height={124}
        />
      </div>
      <h4 className="pt-8 pb-2 font-semibold text-base lg:text-lg 2xl:text-xl text-gray-900 line-clamp-1">
        {name}
      </h4>

      <div className="flex items-center justify-center text-center gap-x-2">
        <Image className="w-[16px]" src={tag} alt="tag Icon" />
        <span className="font-normal text-sm text-gray-600 text-left line-clamp-1">
          {businessCategory?.name}
        </span>
      </div>
      <div className="flex items-center justify-center text-center gap-x-2">
        <Image className="w-[16px]" src={loc} alt="Location Icon" />
        <span className="font-normal text-sm text-gray-600 text-left line-clamp-1">
          {location?.name}
        </span>
      </div>
      <Button
        TagName={Link}
        href={`/company/${slug}`}
        className="w-full mt-4 hover:bg-brand-500"
        prefetch={false}
      >
        View Profile
      </Button>
    </div>
  );
};

export default CompanyCard;
