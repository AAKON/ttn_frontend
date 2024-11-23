import "@splidejs/react-splide/css";
import "./company-tabs.css";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import marketShare from "@/assets/marketShare.svg";

import MarqueeSlider from "@/components/marquee-sliders/marquee-slider";
// Clients Slide items
import clients_1 from "@/assets/company1.jpg";
import clients_2 from "@/assets/company2.jpg";
import clients_3 from "@/assets/company3.jpg";
import clients_4 from "@/assets/company4.jpg";
const allClients = [
  clients_1,
  clients_2,
  clients_3,
  clients_4,
  clients_1,
  clients_2,
  clients_3,
  clients_4,
];

// Certifications Slide items
import certification_1 from "@/assets/certification_1.png";
import certification_2 from "@/assets/certification_2.png";
import certification_3 from "@/assets/certification_3.png";
import certification_4 from "@/assets/certification_4.png";
import certification_5 from "@/assets/certification_5.png";
import certification_6 from "@/assets/certification_6.png";
import FrequentlyAskedQuestions from "./frequently-asked-questions";

const allCertifications = [
  certification_1,
  certification_2,
  certification_3,
  certification_4,
  certification_5,
  certification_6,
  certification_3,
  certification_4,
];

import AwardsSlider from "./awards-slider";

function CompanyTabs() {
  return (
    <div>
      <Tabs defaultValue="profile" className="company-tabs w-full">
        <TabsList className="justify-between rounded-2xl border border-gray-200 bg-white px-6 py-0 w-full h-[64px]">
          <TabsTrigger
            className={`bg-transparent border-none rounded-none shadow-none lg:text-base text-sm font-semibold text-gray-600 h-full inline-block capitalize`}
            value="profile"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            className={`bg-transparent border-none rounded-none shadow-none lg:text-base text-sm font-semibold text-gray-600 h-full inline-block capitalize`}
            value="clients"
          >
            Clients
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
        <TabsContent className="bg-white rounded-2xl p-6" value="profile">
          <div className="lg:flex justify-between mt-6">
            <h3 className="text-base font-semibold text-gray-900 h-full">
              Overview
            </h3>
            <div className="lg:w-[700px] lg:mt-0 w-[360px] grid grid-cols-2 lg:gap-6 gap-[32px] mt-4">
              <FeedBackList
                text={"Available Selling Query"}
                text2={"Lorem ipsum"}
              />
              <FeedBackList
                text={"Payment Policy"}
                text2={"LC/TT/Bank Transfer"}
              />
              <FeedBackList text={"Total Units"} text2={"Lorem ipsum"} />
              <FeedBackList text={"Manpower"} text2={"Lorem ipsum"} />
            </div>
          </div>
          <div className="lg:flex justify-between mt-12">
            <h3 className="text-base font-semibold text-gray-900 h-full">
              Business Insight
            </h3>

            <div className="lg:w-[700px] lg:mt-0 w-[360px] mt-6">
              <p className="text-gray-500 text-sm leading-[20px]">
                Market Share
              </p>

              <div className="border rounded-[16px] mt-3">
                <Image src={marketShare} alt="marketShare" className="w-full" />
              </div>

              <p className="text-gray-500 text-sm leading-[20px] mt-6">
                Yearly Turnover
              </p>

              <div className="border rounded-[16px] mt-3">CHART</div>
            </div>
          </div>
        </TabsContent>
        <TabsContent className="bg-white rounded-2xl p-6" value="clients">
          <h3 className="text-xl font-semibold text-gray-900 mb-8">Clients</h3>
          <MarqueeSlider slideItems={allClients} className="mr-10" />
        </TabsContent>
        <TabsContent className="bg-white rounded-2xl p-6" value="awards">
          <AwardsSlider />
        </TabsContent>
        <TabsContent
          className="bg-white rounded-2xl p-6"
          value="certifications"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-8">
            Certifications
          </h3>
          <MarqueeSlider slideItems={allCertifications} className="mr-8" />
        </TabsContent>
        <TabsContent className="bg-white rounded-2xl p-6" value="contacts">
          Contact
        </TabsContent>
        <TabsContent className="bg-white rounded-2xl p-6" value="faq">
          <h3 className="text-xl font-semibold text-gray-900 mb-8">
            Frequently asked questions
          </h3>
          <FrequentlyAskedQuestions />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function FeedBackList({ text, text2, icon, className }) {
  return (
    <div className={`lg:w-[335px] w-[165px] ${className}`}>
      <p className="text-gray-500 text-sm leading-[20px]">{text}</p>
      <h3 className="text-gray-900 text-base leading-[24px] font-medium mt-1 flex lg:items-center items-start  gap-3">
        {icon && icon}
        <span>{text2}</span>
      </h3>
    </div>
  );
}

export default CompanyTabs;
