import Image from "next/image";
import profilePIc from "@/assets/Profilepic.png";
import Button from "@/components/shared/button";
import loc from "@/assets/loc.svg";
import tag from "@/assets/tag.svg";
import Link from "next/link";

const CompanyCard = ({ item }) => {
  const { name, thumbnail_url, about, slug, location, businessCategory } = item;
  return (
    <div className="h-full py-10 px-6 text-center flex items-center flex-col justify-center vg-white rounded-2xl shadow-card-shadow">
      <div className="size-[100px] md:size-[140px] rounded-full overflow-hidden flex items-center justify-center p-1 border-4 border-brand-500">
        <Image
          className="max-w-full object-cover"
          src={thumbnail_url ? thumbnail_url : profilePIc}
          alt="Company Logo"
          width={124} height={124}
        />
      </div>
      <h4 className="pt-8 font-semibold text-xl text-gray-900 pb-2">{name}</h4>

      <div className="flex items-center gap-x-2">
        <Image className="w-[16px]" src={tag} alt="tag Icon" />
        <span className="font-normal text-md text-gray-600ra">{businessCategory?.name}</span>
      </div>
      <div className="flex items-center gap-x-2">
        <Image className="w-[16px]" src={loc} alt="Location Icon" />
        <span className="font-normal text-md text-gray-600ra">{location?.name}</span>
      </div>
      <Button TagName={Link} href={`/company/${slug}`} className="w-full mt-4 hover:bg-brand-500">View Profile</Button>
    </div>
  );
};

export default CompanyCard;
