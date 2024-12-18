'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./profile-tabs.css";
import ProfileInfoForm from "./profile-info-form";
import MyCompanies from "./my-companies";
import {useEffect, useState} from "react";

const TabComponents = () => {

  const [currentTab, setCurrentTab] = useState('profile-info');

  useEffect(() => {
    // Function to update the current tab based on the URL hash
    const updateTabFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentTab(hash || 'profile-info');
    };

    // Update tab on initial render
    updateTabFromHash();

    // Listen for hash changes
    window.addEventListener('hashchange', updateTabFromHash);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('hashchange', updateTabFromHash);
    };
  }, []);

  return (
    <>
      <Tabs
          value={currentTab}
          onValueChange={(value) => {
            setCurrentTab(value);
            window.location.hash = value; // Update the URL hash when a tab is clicked
          }}
        className="profile-tabs w-full overflow-hidden"
      >
        <TabsList className="justify-start rounded-2xl border border-gray-200 bg-white px-6 py-0 w-full h-[64px] overflow-x-scroll xl:overflow-hidden">
          <TabsTrigger
            className={`bg-transparent border-none rounded-none shadow-none lg:text-base text-sm font-semibold text-gray-600 h-full inline-block capitalize`}
            value="profile-info"
          >
            Profile Info
          </TabsTrigger>
          <TabsTrigger
            className={`bg-transparent border-none rounded-none shadow-none lg:text-base text-sm font-semibold text-gray-600 h-full inline-block capitalize`}
            value="my-companies"
          >
            My Companies
          </TabsTrigger>
          <TabsTrigger
            className={`bg-transparent border-none rounded-none shadow-none lg:text-base text-sm font-semibold text-gray-600 h-full inline-block capitalize`}
            value="danger-zone"
          >
            Danger Zone
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile-info">
          <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
            <ProfileInfoForm />
          </div>
        </TabsContent>
        <TabsContent value="my-companies">
          <MyCompanies />
        </TabsContent>
        <TabsContent value="danger-zone">
          <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
            <h3 className="text-sm md:text-lg font-semibold text-gray-900">
              Danger Zone
            </h3>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default TabComponents;
