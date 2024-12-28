import "@splidejs/react-splide/css";
import "./company-tabs.css";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import marketShare from "@/assets/marketShare.svg";
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
import ChartYearly from "./chart-yearly";

// icons
import {
  MarkerPinIcon,
  WhatsAppIcon,
  EmailIcon,
  PhoneIcon,
  GlobeIcon,
} from "@/icons";
import { Empty } from "@/shared";
import CertificateSlider from "@/app/(main)/company/[slug]/components/certificateSlider";
import ClientSlider from "../marquee-sliders/client-slider";

function CompanyTabs({ faqs, clients, overview, contactData, decissionMakers, certificatesData }) {
  return (
    <div>
      <Tabs
        defaultValue="profile"
        className="company-tabs w-full overflow-hidden"
      >
        <TabsList className="justify-between rounded-2xl border border-gray-200 bg-white px-6 py-0 w-full h-[64px] overflow-x-scroll xl:overflow-hidden">
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
          {/*<TabsTrigger*/}
          {/*  className={`bg-transparent border-none rounded-none shadow-none lg:text-base text-sm font-semibold text-gray-600 h-full inline-block capitalize`}*/}
          {/*  value="awards"*/}
          {/*>*/}
          {/*  Awards*/}
          {/*</TabsTrigger>*/}
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
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 bg-white rounded-2xl p-4 lg:p-6">
            <h3 className="text-base font-semibold text-gray-900">Overview</h3>
            <div className="grid grid-cols-2 lg:gap-6 gap-[32px]">
              <FeedBackList text={"Manpower"} text2={overview?.production_capacity || '...'} />
              <FeedBackList text={"Production capacity"} text2={overview?.production_capacity || '...'} />
              <FeedBackList
                text={"No of Machine"}
                text2={overview?.total_units || '...'}
              />
              <FeedBackList
                  text={"MOQ"}
                  text2={overview?.moq || '...'}
              />
              <FeedBackList
                  text={"Lead Time"}
                  text2={overview?.lead_time || '...'}
              />
              <FeedBackList
                  text={"Delivery Terms"}
                  text2={overview?.shipment_term || '...'}
              />
              <FeedBackList
                text={"Payment Policy"}
                text2={overview?.payment_policy || '...'}
              />


            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 mt-12">
            <h3 className="text-base font-semibold text-gray-900 h-full">
              Business Insight
            </h3>

            <div className="lg:mt-0 mt-6">
              <div>
                <p className="text-gray-500 text-sm leading-[20px]">
                  Market Share
                </p>
                <div className="border rounded-[16px] mt-3">
                  <Image src={marketShare} alt="marketShare" className="w-full"/>
                </div>
              </div>
              {overview?.yearly_turnover && Array.isArray(overview?.yearly_turnover) && overview?.yearly_turnover.length > 0 && (
                  <div>
                    <p className="text-gray-500 text-sm leading-[20px] mt-6">
                      Yearly Turnover
                    </p>
                    <div className="border border-gray-200 rounded-[16px] p-6 mt-3">
                      <ChartYearly chartData={overview?.yearly_turnover}/>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="clients">
          <div className="bg-white rounded-2xl p-4 lg:p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-8">
              Clients
            </h3>
            {clients && Array.isArray(clients) && clients.length > 0 ? (
              <ClientSlider slideItems={clients} />
            ) : (
              <Empty message="No clients found." />
            )}
          </div>
        </TabsContent>
        {/*<TabsContent value="awards">*/}
        {/*  <div className="bg-white rounded-2xl p-4 lg:p-6">*/}
        {/*    <AwardsSlider />*/}
        {/*  </div>*/}
        {/*</TabsContent>*/}
        <TabsContent
          className="bg-white rounded-2xl p-6"
          value="certifications"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-8">
            Certifications
          </h3>
          {certificatesData &&
          Array.isArray(certificatesData) &&
          certificatesData.length > 0 ? (
            <div className="!w-full max-[1000px]">
              <CertificateSlider
                slideItems={certificatesData}
                className="mr-8"
              />
            </div>
          ) : (
            <Empty message="No certificates found." />
          )}
        </TabsContent>
        <TabsContent value="contacts">
          <div className="bg-white rounded-2xl p-4 lg:p-6">
            {/* Business Contact start */}
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 mt-6">
              <h3 className="text-base font-semibold text-gray-900 h-full">
                Business Contact
              </h3>

              <div className="lg:mt-0 mt-4">
                <div className="grid grid-cols-2 gap-6">
                  <FeedBackList
                    text="Address"
                    text2={contactData?.address || '...'}
                    icon={
                      <MarkerPinIcon width={30} height={30} stroke="#F7931E" />
                    }
                  />
                  <FeedBackList
                    text={"Email"}
                    text2={contactData?.email || '...'}
                    icon={<EmailIcon width={20} height={20} stroke="#F7931E" />}
                  />
                  <FeedBackList
                    text={"Whatsapp"}
                    text2={contactData?.whatsapp || '...'}
                    icon={
                      <WhatsAppIcon width={20} height={20} stroke="#F7931E" />
                    }
                  />
                  <FeedBackList
                    text={"Phone"}
                    text2={contactData?.phone || '...'}
                    icon={<PhoneIcon width={20} height={20} stroke="#F7931E" />}
                  />
                  <FeedBackList
                    text={"Website"}
                    text2={contactData?.website || '...'}
                    icon={<GlobeIcon width={20} height={20} stroke="#F7931E" />}
                  />
                </div>

                <div className="w-full h-[280px] border-2 rounded-[16px] mt-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.170254395742!2d90.38000527589689!3d23.741307389124334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b7a55cd36f%3A0xfcc5b021faff43ea!2sCreative%20IT%20Institute!5e0!3m2!1sen!2sbd!4v1731247486413!5m2!1sen!2sbd"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            </div>
            {/* Business Contact end */}

            {/* Decision Makers start */}
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 lg:gap-8 mt-6 lg:mt-8">
              <h3 className="text-base font-semibold text-gray-900">
                Decision Makers
              </h3>
              {decissionMakers && Array.isArray(decissionMakers) && decissionMakers.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 lg:gap-y-6 gap-x-8">
                    {decissionMakers.map((item, index) => (
                        <ContactCard
                            key={item?.id}
                            contactId={`Contact ${index+1}`}
                            personName={item?.name}
                            designation={item?.designation}
                            emailIcon={
                              <EmailIcon width={16} height={16} stroke="#F7931E"/>
                            }
                            phoneIcon={
                              <PhoneIcon width={16} height={16} stroke="#F7931E"/>
                            }
                            whatsAppIcon={
                              <WhatsAppIcon width={16} height={16} stroke="#F7931E"/>
                            }
                            emailAddress={item?.email}
                            phoneNumber={item?.phone}
                            whatsAppText={item?.whatsapp}
                        />
                        )
                    )}
                  </div>
              ) : <Empty message={'Empty decision makers'} /> }
            </div>
            {/* Decision Makers end */}
          </div>
        </TabsContent>
        <TabsContent value="faq">
          <div className="bg-white rounded-2xl p-4 lg:p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-8">
              Frequently asked questions
            </h3>
            <FrequentlyAskedQuestions faqs={faqs}/>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function FeedBackList({text, text2, icon, className}) {
  return (
      <div className={`${className}`}>
        <p className="text-gray-500 text-sm leading-[20px]">{text}</p>
        <div className="flex items-start gap-3 mt-1">
          {icon && icon}
          <h3 className="text-gray-900 text-base leading-[24px] font-medium">
            <span>{text2}</span>
          </h3>
        </div>
      </div>
  );
}

export function ContactCard({
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

export default CompanyTabs;
