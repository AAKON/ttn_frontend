import { Container } from "@/shared";
import Image from "next/image";
import Button from "@/components/shared/button";
import business1 from "@/assets/partner-1.png";
import business2 from "@/assets/partner-2.png";
import business3 from "@/assets/partner-3.png";
import business4 from "@/assets/partner-4.png";
import business5 from "@/assets/partner-5.png";
import business6 from "@/assets/partner-6.png";
import Link from "next/link";

const PartnerPage = () => {
  const businessPartnerLogo = [
    business1,
    business2,
    business3,
    business4,
    business5,
    business6,
  ];
  const EventPartnerLogo = [
    business1,
    business2,
    business3,
    business4,
    business5,
    business6,
  ];
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
          <Button TagName={Link} href={'/contact'} primaryOutline>Join as a partner</Button>
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
            {/* company logo */}
            <div className="pt-10 grid grid-cols-2 gap-6 justify-center sm:grid-cols-3 lg:grid-cols-6">
              {businessPartnerLogo?.map((item, index) => (
                <CompanyPartnerCard key={index} image={item} />
              ))}
            </div>
          </div>
          {/* Event & Media Partner */}
          <div className="lg:py-[80px] py-8">
            <BusinessPartner
              heading={"Media & Marketing Partner"}
              summary={
                "To help reach event and more engaged audience through our website, social media channels, and newsletters."
              }
            />
            {/* company logo */}
            <div className="pt-10 grid grid-cols-2 gap-6 justify-center sm:grid-cols-3 lg:grid-cols-6">
              {EventPartnerLogo?.map((item, index) => (
                <CompanyPartnerCard key={index} image={item} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

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
    <div className="h-[75px] xl:h-[100px] flex items-center rounded-md border-2 border-gray-200 justify-center p-3 lg:p-6">
      <Image
        src={image}
        alt="logo"
        className="max-w-full max-h-full object-cover"
      />
    </div>
  );
}

export { BusinessPartner, CompanyPartnerCard };

export default PartnerPage;
