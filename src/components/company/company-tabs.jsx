import "@splidejs/react-splide/css";
import "./company-tabs.css";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import FrequentlyAskedQuestions from "./frequently-asked-questions";
import ChartYearly from "./chart-yearly";

// icons
import {
    MarkerPinIcon,
    WhatsAppIcon,
    EmailIcon,
    PhoneIcon,
    GlobeIcon,
} from "@/icons";
import CertificateSlider from "@/app/(main)/company/[slug]/components/certificateSlider";
import ClientSlider from "../marquee-sliders/client-slider";
import React from "react";
import MarketShareChart from "@/app/(main)/company/[slug]/components/marketShareChart";
import {getDataPreOverview} from "@/services/company";

async function CompanyTabs({faqs, clients, overview, contactData, decissionMakers, certificatesData}) {

    const BusinessInsight = (overview) => {
        return (
            overview?.market_share ||
            (overview?.yearly_turnover &&
                Array.isArray(overview.yearly_turnover) &&
                overview.yearly_turnover.length > 0)
        );
    };
    function isNonEmptyObject(obj) {
        return typeof obj === 'object' && obj !== null && Object.keys(obj).length > 0;
    }
    const isNonEmptyArray = (array) => {
        return Array.isArray(array) && array.length > 0;
    };

    const checkOverviewConditions = (overview) => {
        return [
            overview?.production_capacity,
            overview?.total_units,
            overview?.moq,
            overview?.lead_time,
            overview?.shipment_term,
            overview?.payment_policy
        ].some(Boolean);
    };

    const availableTabs = [
        checkOverviewConditions(overview) && "profile",
        isNonEmptyArray(clients) && "clients",
        isNonEmptyArray(certificatesData) && "certifications",
        isNonEmptyArray(faqs) && "faq",
        isNonEmptyObject(contactData) && "contacts",
    ].filter(Boolean);

    const defaultTab = availableTabs.length > 0 ? availableTabs[0] : "profile";

    try {
        const preDataPromise = getDataPreOverview();
        const preData = await preDataPromise;
        const locationsData = preData?.locations || [];

        const googleMapUrl = `https://www.google.com/maps?q=${contactData?.lat_long?.lat ?? '40.718625'},${contactData?.lat_long?.lng ?? '-74.035536'}&z=15&output=embed`;

        return (
            <div>
                {((overview && checkOverviewConditions(overview)) || (clients && isNonEmptyArray(clients)) || (certificatesData && isNonEmptyArray(certificatesData)) ||
                    (decissionMakers && isNonEmptyArray(decissionMakers)) || (faqs && isNonEmptyArray(faqs)) || (contactData && isNonEmptyObject(contactData)) ) && (
                <Tabs
                    defaultValue={defaultTab}
                    className="company-tabs w-full overflow-hidden"
                >
                    <TabsList
                        className="justify-start rounded-2xl border border-gray-200 bg-white px-6 py-0 w-full h-[64px] overflow-x-scroll xl:overflow-hidden">
                        {(checkOverviewConditions(overview)) && (
                        <TabsTrigger
                            className={`bg-transparent border-none rounded-none shadow-none lg:text-base text-sm font-semibold text-gray-600 h-full inline-block capitalize`}
                            value="profile"
                        >
                            Profile
                        </TabsTrigger>)}
                        {clients && isNonEmptyArray(clients) && (
                            <TabsTrigger
                                className={`bg-transparent border-none rounded-none shadow-none lg:text-base text-sm font-semibold text-gray-600 h-full inline-block capitalize`}
                                value="clients"
                            >
                                Clients
                            </TabsTrigger>)}
                        {certificatesData && isNonEmptyArray(certificatesData) && (
                                <TabsTrigger
                                    className={`bg-transparent border-none rounded-none shadow-none lg:text-base text-sm font-semibold text-gray-600 h-full inline-block capitalize`}
                                    value="certifications"
                                >
                                    Certifications
                                </TabsTrigger>)}
                        {((decissionMakers && isNonEmptyArray(decissionMakers)) || (contactData && isNonEmptyObject(contactData))) &&
                            (<TabsTrigger
                                className={`bg-transparent border-none rounded-none shadow-none lg:text-base text-sm font-semibold text-gray-600 h-full inline-block capitalize`}
                                value="contacts"
                            >
                                Contacts
                            </TabsTrigger>)}
                        {faqs && isNonEmptyArray(faqs) && (
                                <TabsTrigger
                                    className={`bg-transparent border-none rounded-none shadow-none lg:text-base text-sm font-semibold text-gray-600 h-full inline-block capitalize`}
                                    value="faq"
                                >
                                    FAQ
                                </TabsTrigger>)}
                    </TabsList>

                    <TabsContent value="profile">
                        {overview && checkOverviewConditions(overview) && (
                            <div
                                className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 bg-white rounded-2xl p-4 lg:p-6">
                                <h3 className="text-base font-semibold text-gray-900">Overview</h3>
                                <div className="grid grid-cols-2 lg:gap-6 gap-[32px]">
                                    {overview?.production_capacity && (
                                        <FeedBackList text={"Manpower"} text2={overview?.production_capacity}/>)}
                                    {overview?.production_capacity && (
                                        <FeedBackList text={"Production capacity"}
                                                      text2={overview?.production_capacity}/>)}
                                    {overview?.total_units && (
                                        <FeedBackList
                                            text={"No of Machine"}
                                            text2={overview?.total_units}
                                        />)}
                                    {overview?.moq && (
                                        <FeedBackList
                                            text={"MOQ"}
                                            text2={overview?.moq}
                                        />)}
                                    {overview?.lead_time && (
                                        <FeedBackList
                                            text={"Lead Time"}
                                            text2={overview?.lead_time}
                                        />)}
                                    {overview?.shipment_term && (
                                        <FeedBackList
                                            text={"Delivery Terms"}
                                            text2={overview?.shipment_term}
                                        />)}
                                    {overview?.payment_policy && (
                                        <FeedBackList
                                            text={"Payment Policy"}
                                            text2={overview?.payment_policy}
                                        />)}
                                </div>
                            </div>)}
                        {overview && BusinessInsight(overview) && (
                        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 mt-12">
                            <h3 className="text-base font-semibold text-gray-900 h-full">
                                Business Insight
                            </h3>

                            <div className="lg:mt-0 mt-6">
                                {overview?.market_share && (
                                <div>
                                    <p className="text-gray-500 text-sm leading-[20px]">
                                        Market Share
                                    </p>
                                    <div className="border rounded-[16px] mt-3">
                                        <MarketShareChart data={overview?.market_share} locations={locationsData}/>
                                    </div>
                                </div>)}
                                {overview?.yearly_turnover && isNonEmptyArray(overview?.yearly_turnover) (
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
                        </div>)}
                    </TabsContent>
                    {clients && isNonEmptyArray(clients) && (
                        <TabsContent value="clients">
                            <div className="bg-white rounded-2xl p-4 lg:p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-8">
                                    Clients
                                </h3>
                                <ClientSlider slideItems={clients}/>
                            </div>
                        </TabsContent>)}
                    {certificatesData && isNonEmptyArray(certificatesData) && (
                            <TabsContent
                                className="bg-white rounded-2xl p-6"
                                value="certifications"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 mb-8">
                                    Certifications
                                </h3>

                                <div className="!w-full max-[1000px]">
                                    <CertificateSlider
                                        slideItems={certificatesData}
                                        className="mr-8"
                                    />
                                </div>
                            </TabsContent>)}
                    <TabsContent value="contacts">
                        <div className="bg-white rounded-2xl p-4 lg:p-6">
                            {/* Business Contact start */}
                            {contactData && isNonEmptyObject(contactData) &&
                                (<div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 mt-6">
                                    <h3 className="text-base font-semibold text-gray-900 h-full">
                                        Business Contact
                                    </h3>

                                    <div className="lg:mt-0 mt-4">
                                        <div className="grid grid-cols-2 gap-6">
                                            <FeedBackList
                                                text="Address"
                                                text2={contactData?.address || ''}
                                                icon={
                                                    <MarkerPinIcon width={30} height={30} stroke="#F7931E"/>
                                                }
                                            />
                                            <FeedBackList
                                                text={"Email"}
                                                text2={contactData?.email || ''}
                                                icon={<EmailIcon width={20} height={20} stroke="#F7931E"/>}
                                            />
                                            <FeedBackList
                                                text={"Whatsapp"}
                                                text2={contactData?.whatsapp || ''}
                                                icon={
                                                    <WhatsAppIcon width={20} height={20} stroke="#F7931E"/>
                                                }
                                            />
                                            <FeedBackList
                                                text={"Phone"}
                                                text2={contactData?.phone || ''}
                                                icon={<PhoneIcon width={20} height={20} stroke="#F7931E"/>}
                                            />
                                            <FeedBackList
                                                text={"Website"}
                                                text2={contactData?.website || ''}
                                                icon={<GlobeIcon width={20} height={20} stroke="#F7931E"/>}
                                                DataType="website"
                                            />
                                        </div>
                                        {contactData?.lat_long && (
                                            <div className="w-full h-[280px] border-2 rounded-[16px] mt-6">
                                                <iframe
                                                    src={googleMapUrl}
                                                    allowFullScreen
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    style={{border: 0}}
                                                    width="100%"
                                                    height="280"
                                                ></iframe>
                                            </div>)}

                                    </div>
                                </div>)}
                            {/* Business Contact end */}

                            {/* Decision Makers start */}
                            {decissionMakers && isNonEmptyArray(decissionMakers) && (
                                <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 lg:gap-8 mt-6 lg:mt-8">
                                    <h3 className="text-base font-semibold text-gray-900">
                                        Decision Makers
                                    </h3>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 lg:gap-y-6 gap-x-8">
                                        {decissionMakers.map((item, index) => (
                                                <ContactCard
                                                    key={item?.id}
                                                    contactId={`Contact ${index + 1}`}
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
                                </div>)}
                            {/* Decision Makers end */}
                        </div>
                    </TabsContent>
                    {faqs && isNonEmptyArray(faqs) && (
                            <TabsContent value="faq">
                                <div className="bg-white rounded-2xl p-4 lg:p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-8">
                                        Frequently asked questions
                                    </h3>
                                    <FrequentlyAskedQuestions faqs={faqs}/>
                                </div>
                            </TabsContent>)}
                </Tabs>)}
            </div>
        );
    } catch (err) {
        console.log(err);
    }
}

export function FeedBackList({text, text2, icon, className, DataType}) {

    if (!text2 || text2.trim() === '') return null;

    return (
        <div className={`${className}`}>
            <p className="text-gray-500 text-sm leading-[20px]">{text}</p>
            <div className="flex items-start gap-3 mt-1">
                {icon && icon}
                <h3 className="text-gray-900 text-base leading-[24px] font-medium">
                    {DataType !== 'website' ? (
                        <span>{text2}</span>
                    ) : (
                        <a target="_blank" href={text2} rel="noopener noreferrer">{text2}</a>
                    )}
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
