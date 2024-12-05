import { Container } from "@/shared";
import PricingTabs from "@/app/(main)/pricing/components/pricing-tabs";

const Pricing = () => {
  return (
    <div>
      <div className="bg-gray-50 pb-32">
        <Container>
          {/* Heading part */}
          <h1 className="font-semibold text-[48px] text-gray-900 pt-[70px] ml-10 text-center">
            Our Tailored Packages
          </h1>
          {/* sub titel part */}
          <p className="text-[20px] text-center text-gray-600 pt-[30px] pl-[210px] pr-[160px] ">
            Are you looking to expand your horizons in the textile and apparel
            industry? Join our dynamic team as a valued partner and unlock a
            world of opportunities.
          </p>
        </Container>
      </div>
      <PricingTabs />
    </div>
  );
};

export default Pricing;
