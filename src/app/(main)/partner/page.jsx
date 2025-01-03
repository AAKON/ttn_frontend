import { Container } from "@/shared";
import Image from "next/image";
import Button from "@/components/shared/button";
import business1 from "@/assets/partner-1.png";
import Link from "next/link";
import ErrorMessage from "@/components/shared/errormessage";
import React from "react";
import { getPartnerList } from "@/services/partner";

export default async function PartnerPage() {
  try {
    const pagePromise = getPartnerList();
    const partnersData = await pagePromise;

    const marketingPartners = partnersData?.marketing || [];
    const b2bPartners = partnersData?.b2b || [];

    return (
      <div>
        <Container>
          <div className="bg-gray-50 py-8 lg:py-[80px] flex items-center flex-col justify-center text-center">
            <h1 className="font-semibold text-[30px] lg:text-5xl text-gray-900 lg:pb-6 pb-2">
              Join as Partner
            </h1>
            <p className="text-gray-600 text-sm lg:text-xl font-normal lg:leading-7 leading-5 max-w-[800px] pb-4 lg:pb-8">
              Are you looking to expand your horizons in the textile and apparel
              industry? Join our dynamic team as a valued partner and unlock a
              world of opportunities.
            </p>
            <Button TagName={Link} href={"/contact"} primaryOutline>
              Join as a partner
            </Button>
          </div>
          <div className="lg:py-[80px] py-8">
            {/* Business Partner */}
            <div>
              <BusinessPartner
                heading={"B2B Partner"}
                summary={
                  "Offering wide range of business sourcing services, such as product development, sampling, production, quality control, logistics, and after-sales support."
                }
              />
              {b2bPartners &&
                Array.isArray(b2bPartners) &&
                b2bPartners.length > 0 && (
                  <div className="pt-10 grid grid-cols-[repeat(auto-fit,minmax(150px,200px))] gap-6 justify-center">
                    {b2bPartners?.map((item) => (
                      <CompanyPartnerCard key={item?.id} image={item} />
                    ))}
                  </div>
                )}
            </div>
            {/* Event & Media Partner */}
            <div className="lg:py-[80px] py-8">
              <BusinessPartner
                heading={"Media & Marketing Partner"}
                summary={
                  "To help reach event and more engaged audience through our website, social media channels, and newsletters."
                }
              />
              {marketingPartners &&
                Array.isArray(marketingPartners) &&
                marketingPartners.length > 0 && (
                  <div className="pt-10 grid grid-cols-[repeat(auto-fit,minmax(140px,140px))] lg:grid-cols-[repeat(auto-fit,minmax(150px,200px))] gap-6 justify-center">
                    {marketingPartners?.map((item) => (
                      <CompanyPartnerCard key={item?.id} image={item} />
                    ))}
                  </div>
                )}
            </div>
          </div>
        </Container>
      </div>
    );
  } catch (error) {
    return <ErrorMessage message={error?.message} />;
  }
}

function BusinessPartner({ heading, summary }) {
  return (
    <div className="flex items-center flex-col justify-center text-center">
      <h2 className="text-lg lg:text-4xl pb-2 lg:pb-4 font-semibold text-gray-900">
        {heading ? heading : "Business Partner"}
      </h2>
      <p className="font-normal text-sm lg:text-base text-gray-600 w-full sm:max-w-[800px] leading-5 lg:leading-6">
        {summary
          ? summary
          : "Offering wide range of business sourcing services, such as product development, sampling, production, quality control, logistics, and after-sales support."}
      </p>
    </div>
  );
}

function CompanyPartnerCard({ image }) {
  return (
    <div className="h-[100px] md:h-[140px] xl:h-[200px] flex items-center justify-center rounded-md outline-2 outline-gray-200 outline p-1 lg:p-2">
      <Image
        src={image?.image ? image?.image : business1}
        alt="logo"
        width={200}
        height={200}
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
}

export { BusinessPartner, CompanyPartnerCard };
