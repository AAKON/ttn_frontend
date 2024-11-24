import { Container } from "@/shared";
import Frame from "./_frame";
import AboutCompany from "./about-company";
import ProductShowCase from "./product-showcase";
import ContactWithBusinessOwner from "./contact-with-business-owner";
import CompanyTabs from "./company-tabs";

function Company() {
  return (
    <div className="bg-gray-50 pb-8 md:pb-10 lg:pb-16 xl:pb-20">
      <div className="relative">
        <Frame />
        <Container>
          <div className="lg:flex gap-6 xl:gap-12 lg:justify-between relative mt-4 xl:mt-10">
            <div className="lg:flex-1">
              <div className="p-4 lg:p-6 bg-white rounded-2xl z-[2]">
                {/* AboutCompany part start */}
                <div className="lg:mb-[32px] relative grid grid-cols-1 gap-6 xl:gap-8">
                  <AboutCompany />
                  <ProductShowCase />
                </div>
                {/* AboutCompany part end */}
              </div>
              <div className="mt-8">
                <CompanyTabs />
              </div>
            </div>

            <div className="lg:w-[340px] xl:w-[370px] w-full">
              <ContactWithBusinessOwner />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Company;
