import { Container } from "@/shared";
import PricingTabs from "@/app/(main)/pricing/components/pricing-tabs";

const Pricing = () => {
  return (
    <div>
      <div className="bg-gray-50">
        <Container>
          <div className="max-w-[660px] mx-auto py-8 sm:py-10 lg:py-14 xl:py-20">
            {/* Heading part */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-[40px] text-center">Our Tailored Packages</h1>
            {/* sub titel part */}
            <p className="text-sm md:text-base xl:text-[20px] text-center text-gray-600 pt-6">
              Are you looking to expand your horizons in the textile and apparel
              industry? Join as a valued partner and unlock a
              world of opportunities.
            </p>
          </div>
        </Container>
      </div>
      <PricingTabs />
    </div>
  );
};

export default Pricing;
