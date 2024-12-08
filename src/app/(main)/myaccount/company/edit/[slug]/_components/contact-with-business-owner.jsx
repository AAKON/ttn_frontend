
import Image from "next/image";
import CodeBlue from "@/assets/CodeBlue.svg";
import { Input } from "@/components/ui/input";


const ContactWithBusinessOwner = () => {

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0px_16px_24px_-4px_#1018280D] grid grid-cols-1 gap-4">
      <p
        className="pb-4 text-base border-b border-b-gray-200 font-semibold text-brand-600 leading-tight xl:text-xl"
      >
        Contact With Business Owner
      </p>

      <div className="flex items-center gap-3.5">
          <Image
            className="border rounded-full object-cover"
            src={CodeBlue}
            alt="CodeBlue"
            width={56}
            height={56}
          />
          <div className="flex flex-col gap-[10px]">
            <h3 className="text-gray-900 text-base leading-base font-semibold">
              CodeBlue Clothing Pvt Ltd
            </h3>
            <h6 className="text-gray-600 text-sm leading-sm font-normal">
              Used Clothes/Used Shoes...
            </h6>
          </div>
      </div>

      <div>
        <p className="text-gray-600 text-sm leading-sm font-normal">Buying Queries Available</p>
        <Input
          type="text"
          className="mt-[6px] focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="7"
        />
      </div>
      <div>
        <p className="text-gray-600 text-sm leading-sm font-normal">Talents</p>
        <Input
          type="text"
          className="mt-[6px] focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="05"
        />
      </div>
    </div>
  );
};

export default ContactWithBusinessOwner;
