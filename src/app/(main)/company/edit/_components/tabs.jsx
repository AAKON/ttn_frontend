import "./tabs.css";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import marketShare from "@/assets/marketShare.svg";
// Clients Slide items
import clients_1 from "@/assets/company1.jpg";
import clients_2 from "@/assets/company2.jpg";
import clients_3 from "@/assets/company3.jpg";
import clients_4 from "@/assets/company4.jpg";
const allClients = [clients_1, clients_2, clients_3, clients_4];

// Certifications Slide items
import certification_1 from "@/assets/certification_1.png";
import certification_2 from "@/assets/certification_2.png";
import certification_3 from "@/assets/certification_3.png";
import certification_4 from "@/assets/certification_4.png";
import certification_5 from "@/assets/certification_5.png";
import certification_6 from "@/assets/certification_6.png";

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

// icons
import {
  MarkerPinIcon,
  WhatsAppIcon,
  EmailIcon,
  PhoneIcon,
  GlobeIcon,
  DeleteIcon,
} from "@/icons";
import PhotoUploadBox from "./photo-upload-box";
import { formLabelClasses } from "@/utils/input-style";
import Button from "@/components/ui/button";
import OverviewForm from "./overview";
import BusinessInsightForm from "./business-insight";
import YearlyTurnover from "./yearly-turnover";

function EditTabs() {
  return (
    <div>
      <Tabs defaultValue="profile" className="edit-tabs w-full overflow-hidden">
        <TabsList className="justify-start rounded-2xl border border-gray-200 bg-white px-6 py-0 w-full h-[64px] overflow-x-scroll xl:overflow-hidden gap-6 xl:gap-x-12">
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

        <TabsContent value="profile">
          <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 mt-12">
              <h3 className="text-base font-semibold text-gray-900">
                Overview
              </h3>
              <div>
                <OverviewForm />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 mt-12">
              <h3 className="text-base font-semibold text-gray-900">
                Business Insight
              </h3>
              <div>
                <p className="text-gray-500 text-sm pb-6">Market Share</p>
                <BusinessInsightForm />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
              <div></div>
              <div>
                <div className="border rounded-[16px] mt-3">
                  <Image
                    src={marketShare}
                    alt="marketShare"
                    className="w-full"
                  />
                </div>
                <div>
                  <YearlyTurnover />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="clients">
          <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-8">
              Clients
            </h3>
            <p className="text-sm text-gray-900 mb-2">Client logo</p>
            <PhotoUploadBox />
            <Button secondary className="mt-4 w-full h-9">
              Done
            </Button>

            <div className="mt-5">
              <p className="text-sm text-gray-900 mb-2">Existing Clients</p>
              <div className="grid grid-cols-1 gap-4">
                {allClients.map((image, index) => (
                  <ExistingClients key={index} image={image} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="certifications">
          <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-8">
              Certifications
            </h3>
          </div>
        </TabsContent>
        <TabsContent value="contacts">
          <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-100">
            {/* Business Contact start */}
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 mt-6">
              <h3 className="text-base font-semibold text-gray-900 h-full">
                Contact
              </h3>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="faq">
          <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-8">
              Frequently asked questions
            </h3>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ContactCard({
  contactId,
  personName,
  designation,
  emailAddress,
  phoneNumber,
  whatsAppText,
  emailIcon,
  phoneIcon,
  whatsAppIcon,
}) {
  return (
    <div className="">
      <p className="text-gray-500 text-sm leading-[20px]">{contactId}</p>
      <h5 className="text-gray-900 text-lg leading-[24px] font-semibold capitalize">
        {personName}
      </h5>
      <p className="text-gray-500 text-sm leading-[20px]">{designation}</p>
      <ul className="grid gap-2 grid-cols-1 mt-2">
        <li className="text-gray-900 text-sm leading-[20px] flex items-center gap-2">
          <span>{emailIcon}</span>
          <span>{emailAddress}</span>
        </li>
        <li className="text-gray-900 text-sm leading-[20px] flex items-center gap-2">
          <span>{phoneIcon}</span>
          <span>{phoneNumber}</span>
        </li>
        <li className="text-gray-900 text-sm leading-[20px] flex items-center gap-2">
          <span>{whatsAppIcon}</span>
          <span>{whatsAppText}</span>
        </li>
      </ul>
    </div>
  );
}

// Existing Clients
function ExistingClients({ image }) {
  return (
    <div className="flex justify-between gap-6 h-10">
      <div className="h-10 flex-1">
        <Image src={image} alt="image" height={40} />
      </div>
      <Button secondary type="button" className="size-10 gap-0 !p-1">
        <DeleteIcon stroke="#F04438" />
      </Button>
    </div>
  );
}

export default EditTabs;
