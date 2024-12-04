import Image from "next/image";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Visa_card from "/public/icons/visa_icon.svg";
import Cvv_icon from "/public/icons/cvv_icon.svg";
import Fb_icon from "/public/icons/facebook_icon.svg";
import Linkedin_icon from "/public/icons/linkedin_icon.svg";
import Teligram_icon from "/public/icons/telegram_icon.svg";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { inputClasses } from "@/utils/input-style";
import "./profile-tabs.css";
import PersonalSettingsForm from "./personal-settings-form";

const TabComponents = () => {
  return (
    <>
      <Tabs
        defaultValue="personal-settings"
        className="profile-tabs w-full overflow-hidden"
      >
        <TabsList className="justify-start rounded-2xl border border-gray-200 bg-white px-6 py-0 w-full h-[64px] overflow-x-scroll xl:overflow-hidden">
          <TabsTrigger
            className={`bg-transparent border-none rounded-none shadow-none lg:text-base text-sm font-semibold text-gray-600 h-full inline-block capitalize`}
            value="personal-settings"
          >
            Personal settings
          </TabsTrigger>
          <TabsTrigger
            className={`bg-transparent border-none rounded-none shadow-none lg:text-base text-sm font-semibold text-gray-600 h-full inline-block capitalize`}
            value="saved-listings"
          >
            Saved listings
          </TabsTrigger>
          <TabsTrigger
            className={`bg-transparent border-none rounded-none shadow-none lg:text-base text-sm font-semibold text-gray-600 h-full inline-block capitalize`}
            value="awards"
          >
            Awards
          </TabsTrigger>
          <TabsTrigger
            className={`bg-transparent border-none rounded-none shadow-none lg:text-base text-sm font-semibold text-gray-600 h-full inline-block capitalize`}
            value="certifications"
          >
            Certifications
          </TabsTrigger>
          <TabsTrigger
            className={`bg-transparent border-none rounded-none shadow-none lg:text-base text-sm font-semibold text-gray-600 h-full inline-block capitalize`}
            value="contacts"
          >
            Contacts
          </TabsTrigger>
          <TabsTrigger
            className={`bg-transparent border-none rounded-none shadow-none lg:text-base text-sm font-semibold text-gray-600 h-full inline-block capitalize`}
            value="faq"
          >
            FAQ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal-settings">
          <div className="bg-white shadow-sm rounded-2xl p-6">
            <h3 className="text-sm   md:text-lg font-semibold text-gray-900">
              Personal settings
            </h3>
            <p className="text-sm md:text-md font-semibold text-gray-500 pt-4 pb-2">
              Change personal Information
            </p>
            {/* personal info */}
            <div className="md:flex justify-between gap-x-4">
              <div className="w-full ">
                <Label
                  htmlFor="name"
                  className="text-sm font-normal pb-[6px] inline-block"
                >
                  Your name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Bashar bro"
                  className={`${inputClasses} bg-gray-50`}
                />
              </div>

              <div className="w-full ">
                <Label
                  htmlFor="email"
                  className="text-sm font-normal pb-[6px] inline-block"
                >
                  Your email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Tour tagline here"
                  className={`${inputClasses} bg-gray-50`}
                />
              </div>
            </div>
            {/* personal info end */}

            {/* change pass */}
            <p className="text-md font-semibold text-gray-500 pt-8 md:pl-6 py-2">
              Change password
            </p>
            <div className="md:flex justify-between gap-x-4">
              <div className="w-full ">
                <Label
                  htmlFor="password"
                  className="text-sm font-normal pb-[6px] inline-block"
                >
                  New password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="**********"
                  className={`${inputClasses} bg-gray-50`}
                />
              </div>

              <div className="w-full ">
                <Label
                  htmlFor="password"
                  className="text-sm font-normal pb-[6px] inline-block"
                >
                  Your email
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="**********"
                  className={`${inputClasses} bg-gray-50`}
                />
              </div>
            </div>
            {/* change pass end */}
            {/* payment info*/}
            <p className="text-md font-semibold text-gray-500 pt-8 md:pl-6 py-2">
              Payment info
            </p>
            <div className="md:flex justify-between gap-x-4">
              <div className="w-full ">
                <Label
                  htmlFor="text"
                  className="text-sm font-normal pb-[6px] inline-block"
                >
                  Name on card
                </Label>
                <Input
                  id="text"
                  type="text"
                  placeholder="Bashar bro"
                  className={`${inputClasses} bg-gray-50`}
                />
              </div>

              <div className="w-full">
                <Label
                  htmlFor="number"
                  className="text-sm font-normal pb-[6px] inline-block"
                >
                  Card number
                </Label>
                <div className="relative">
                  <Input
                    id="number"
                    type="number"
                    placeholder="23423 8234 327 238"
                    className={`${inputClasses} bg-gray-50 pl-14`}
                  />
                  <Image
                    src={Visa_card}
                    alt="Visa_card"
                    className="bg-white h-6 w-8 rounded-sm absolute top-1/2 -translate-y-1/2 left-2 text-gray-500"
                  />
                </div>
              </div>
              <div className="w-full  relative">
                <Label
                  htmlFor="date"
                  className="text-sm font-normal pb-[6px] inline-block"
                >
                  Exp date
                </Label>
                <Input
                  id="date"
                  type="date"
                  placeholder="23/53"
                  className={`${inputClasses} bg-gray-50`}
                />
              </div>
              <div className="w-full  relative">
                <Label
                  htmlFor="text"
                  className="text-sm font-normal pb-[6px] inline-block"
                >
                  CVV
                </Label>
                <div className="relative">
                  <Input
                    id="text"
                    type="text"
                    placeholder="3547"
                    className={`${inputClasses} bg-gray-50 pl-8`}
                  />
                  <Image
                    src={Cvv_icon}
                    alt="Cvv_icon"
                    className="size-4 absolute top-1/2 -translate-y-1/2 left-2 text-gray-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            {/* payment info end*/}
            {/* payment info*/}
            <p className="text-md font-semibold text-gray-500 pt-8 md:pl-6 py-2">
              Update social links
            </p>
            <div className="md:flex justify-between gap-x-4">
              <div className="w-full">
                <Label
                  htmlFor="text"
                  className="text-sm font-normal pb-[6px] inline-block"
                >
                  Facebook
                </Label>
                <div className="relative">
                  <Input
                    id="text"
                    type="text"
                    placeholder="https://www.facebook.com/basahar"
                    className={`${inputClasses} bg-gray-50 pr-8`}
                  />
                  <Image
                    src={Fb_icon}
                    alt="Fb_icon"
                    className="md:size-5 size-5 absolute top-1/2 -translate-y-1/2 right-2 text-gray-500"
                  />
                </div>
              </div>

              <div className="w-full">
                <Label
                  htmlFor="text"
                  className="text-sm font-normal pb-[6px] inline-block"
                >
                  LinkedIn
                </Label>
                <div className="relative">
                  <Input
                    id="text"
                    type="text"
                    placeholder="https://www.facebook.com/basahar"
                    className={`${inputClasses} bg-gray-50 pl-3 pr-10`}
                  />
                  <Image
                    src={Linkedin_icon}
                    alt="Linkedin_icon"
                    className=" md:h-6 md:w-8 size-5 absolute top-1/2 -translate-y-1/2 right-2 text-gray-500"
                  />
                </div>
              </div>

              <div className="w-full  relative">
                <Label
                  htmlFor="text"
                  className="text-sm font-normal pb-[6px] inline-block"
                >
                  Telegram
                </Label>
                <div className="relative">
                  <Input
                    id="text"
                    type="text"
                    placeholder="https://www.facebook.com/basahar"
                    className={`${inputClasses} bg-gray-50 pl-3 pr-8`}
                  />
                  <Image
                    src={Teligram_icon}
                    alt="Teligram_icon"
                    className="size-5 absolute top-1/2 -translate-y-1/2 right-2 text-red-500"
                  />
                </div>
              </div>
            </div>
            {/* payment info end*/}
            {/* btn */}
            <div className="flex float-end gap-3  mt-14">
              <Button secondary>Cancel</Button>

              <Button>Save settings</Button>
            </div>
            {/* btn end */}
          </div>
        </TabsContent>
        <TabsContent value="saved-listings">
          <div className="bg-white shadow-sm rounded-2xl p-6">
            <h3 className="text-sm md:text-lg font-semibold text-gray-900">
              saved-listings
            </h3>
            <PersonalSettingsForm />
          </div>
        </TabsContent>
        <TabsContent value="awards">
          <div className="bg-white shadow-sm rounded-2xl p-6">
            <h3 className="text-sm md:text-lg font-semibold text-gray-900">
              awards
            </h3>
          </div>
        </TabsContent>
        <TabsContent value="certifications">
          <div className="bg-white shadow-sm rounded-2xl p-6">
            <h3 className="text-sm md:text-lg font-semibold text-gray-900">
              certifications
            </h3>
          </div>
        </TabsContent>
        <TabsContent value="contacts">
          <div className="bg-white shadow-sm rounded-2xl p-6">
            <h3 className="text-sm md:text-lg font-semibold text-gray-900">
              contacts
            </h3>
          </div>
        </TabsContent>
        <TabsContent value="faq">
          <div className="bg-white shadow-sm rounded-2xl p-6">
            <h3 className="text-sm md:text-lg font-semibold text-gray-900">
              faq
            </h3>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default TabComponents;
