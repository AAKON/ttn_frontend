import Image from "next/image";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Visa_card from "/public/icons/visa_icon.svg";
import Cvv_icon from "/public/icons/cvv_icon.svg";
import Fb_icon from "/public/icons/facebook_icon.svg";
import Linkedin_icon from "/public/icons/linkedin_icon.svg";
import Teligram_icon from "/public/icons/telegram_icon.svg";

const TabComponents = ({ el }) => {
  return (
    <div className="md:h-[708px] bg-white shadow-sm rounded-2xl">
      <div className="md:ml-6 pt-8">
        <h3 className="text-sm   md:text-lg font-semibold text-gray-900">
          {el}
        </h3>
        <p className="text-sm md:text-md font-semibold text-gray-500 pt-4 pb-2">
          Change personal Information
        </p>
      </div>
      {/* personal info */}
      <div className="md:flex justify-between gap-x-4">
        <div className="w-full md:ml-6">
          <Label htmlFor="name" className="text-sm font-normal">
            Your name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Bashar bro"
            className="bg-gray-100"
          />
        </div>

        <div className="w-full mr-6">
          <Label htmlFor="email" className="text-sm font-normal">
            Your email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Tour tagline here"
            className="bg-gray-100"
          />
        </div>
      </div>
      {/* personal info end */}
      
      {/* change pass */}
      <p className="text-md font-semibold text-gray-500 pt-8 md:pl-6 py-2">
        Change password
      </p>
      <div className="md:flex justify-between gap-x-4">
        <div className="w-full md:ml-6">
          <Label htmlFor="password" className="text-sm font-normal">
            New password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="**********"
            className="bg-gray-100"
          />
        </div>

        <div className="w-full mr-6">
          <Label htmlFor="password" className="text-sm font-normal">
            Your email
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="**********"
            className="bg-gray-100"
          />
        </div>
      </div>
      {/* change pass end */}
      {/* payment info*/}
      <p className="text-md font-semibold text-gray-500 pt-8 md:pl-6 py-2">
        Payment info
      </p>
      <div className="md:flex justify-between gap-x-4">
        <div className="w-full md:ml-6">
          <Label htmlFor="text" className="text-sm font-normal">
            Name on card
          </Label>
          <Input
            id="text"
            type="text"
            placeholder="Bashar bro"
            className="bg-gray-100"
          />
        </div>

        <div className="w-full mr-6 relative">
          <Label htmlFor="number" className="text-sm font-normal">
            Card number
          </Label>
          <Input
            id="number"
            type="number"
            placeholder="23423 8234 327 238"
            className="bg-gray-100 pl-14"
          />
          <Image
            src={Visa_card}
            alt="Visa_card"
            className="bg-white h-6 w-8 rounded-sm absolute top-[33px] left-2 text-gray-500 cursor-pointer"
          />
        </div>
        <div className="w-full mr-6 relative">
          <Label htmlFor="date" className="text-sm font-normal">
            Exp date
          </Label>
          <Input
            id="date"
            type="date"
            placeholder="23/53"
            className="bg-gray-100"
          />
        </div>
        <div className="w-full mr-6 relative">
          <Label htmlFor="text" className="text-sm font-normal">
            CVV
          </Label>
          <Input
            id="text"
            type="text"
            placeholder="3547"
            className="bg-gray-100 pl-8"
          />
          <Image
            src={Cvv_icon}
            alt="Cvv_icon"
            className="h-4 w-4 absolute top-[37px] left-2 text-gray-500 cursor-pointer"
          />
        </div>
      </div>
      {/* payment info end*/}
      {/* payment info*/}
      <p className="text-md font-semibold text-gray-500 pt-8 md:pl-6 py-2">
        Update social links
      </p>
      <div className="md:flex justify-between gap-x-4">
        <div className="w-full md:ml-6 relative">
          <Label htmlFor="text" className="text-sm font-normal">
            Facebook
          </Label>
          <Input
            id="text"
            type="text"
            placeholder="https://www.facebook.com/basahar"
            className="bg-gray-100"
          />
          <Image
            src={Fb_icon}
            alt="Fb_icon"
            className="md:h-6 md:w-8 h-5 w-5 mt-1 absolute top-[33px] right-2 text-gray-500 cursor-pointer"
          />
        </div>

        <div className="w-full mr-6 relative">
          <Label htmlFor="text" className="text-sm font-normal">
            LinkedIn
          </Label>
          <Input
            id="text"
            type="text"
            placeholder="https://www.facebook.com/basahar"
            className="bg-gray-100 pl-3 md:pl-14"
          />
          <Image
            src={Linkedin_icon}
            alt="Linkedin_icon"
            className=" md:h-6 md:w-8 h-5 w-5  absolute top-[33px] right-2 text-gray-500 cursor-pointer"
          />
        </div>

        <div className="w-full mr-6 relative">
          <Label htmlFor="text" className="text-sm font-normal">
            Telegram
          </Label>
          <Input
            id="text"
            type="text"
            placeholder="https://www.facebook.com/basahar"
            className="bg-gray-100 pl-3 md:pl-8"
          />
          <Image
            src={Teligram_icon}
            alt="Teligram_icon"
            className="h-4 w-4 absolute top-[37px] right-2 text-gray-500 cursor-pointer"
          />
        </div>
      </div>
      {/* payment info end*/}
      {/* btn */}
      <div className="flex float-end gap-3 mr-6 mt-14">
        <Button className="bg-white border border-gray-300 text-md font-semibold text-gray-700">
          Cancel
        </Button>

        <Button>Save settings</Button>
      </div>
      {/* btn end */}
    </div>
  );
};

export default TabComponents;
