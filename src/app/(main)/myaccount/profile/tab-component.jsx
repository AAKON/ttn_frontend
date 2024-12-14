import Image from "next/image";
import Button from "@/components/shared/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
            <h3 className="text-sm md:text-lg font-semibold text-gray-900">
              Personal settings
            </h3>
            <PersonalSettingsForm />
          </div>
        </TabsContent>
        <TabsContent value="saved-listings">
          <div className="bg-white shadow-sm rounded-2xl p-6">
            <h3 className="text-sm md:text-lg font-semibold text-gray-900">
              Saved-listings
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
