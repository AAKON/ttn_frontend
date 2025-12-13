import "./tabs.css";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Clients items
import clients_1 from "@/assets/company1.jpg";
import clients_2 from "@/assets/company2.jpg";
import clients_3 from "@/assets/company3.jpg";
import clients_4 from "@/assets/company4.jpg";
const allClients = [clients_1, clients_2, clients_3, clients_4];

import OverviewForm from "./overview";
import DecisionMakersForm from "./decision-makers";
import FaqForm from "./faq-form";
import BusinessContactForm from "./business-contact-form";
import MyClients from "@/app/(main)/myaccount/company/edit/[slug]/_components/client";
import MyCertificates from "@/app/(main)/myaccount/company/edit/[slug]/_components/certificates";

function EditTabs({ slug, basic, preData }) {
  return (
    <div>
      <Tabs defaultValue="profile" className="edit-tabs w-full overflow-hidden mb-8">
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
              value="certificates"
          >
            Certificates
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
            <OverviewForm slug={slug} locations={preData?.locations} />
          </div>
        </TabsContent>

        <TabsContent value="clients">
          <MyClients slug={slug} allClients={allClients} />
        </TabsContent>
        <TabsContent value="certificates">
          <MyCertificates slug={slug} basic={basic} preData={preData} />
        </TabsContent>
        <TabsContent value="contacts">
          <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-100">
            {/* Business Contact start */}
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 mt-6">
              <h3 className="text-base font-semibold text-gray-900 h-full">
                Contact
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 mt-12">
              <h3 className="text-base font-semibold text-gray-900">
                Business
              </h3>
              <div>
                <BusinessContactForm slug={slug} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 mt-12">
              <h3 className="text-base font-semibold text-gray-900">
                Decision Maker
              </h3>
              <div>
                <DecisionMakersForm slug={slug} />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="faq">
          <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-8">
              Frequently asked questions
            </h3>
            <FaqForm slug={slug} />
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

export default EditTabs;
