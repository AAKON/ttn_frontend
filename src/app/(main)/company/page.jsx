import {Container} from "@/shared";
import Frame from "./_frame";
import AboutCompany from "./about-company";
import ProductShowCase from "./product-showcase";
import ContactWithBusinessOwner from "./contact-with-business-owner";
import CompanyTabs from "./company-tabs";

function Company() {
    return (
        <div className="bg-gray-50 pb-8 md:pb-10 lg:pb-16 xl:pb-20">
            <div className="relative w-full">

                <div className="">
                    <Frame />
                </div>

                <Container>
                    <div className="h-full w-full lg:mt-[183px] mt-[415px] lg:flex lg:gap-12 lg:justify-between relative">

                        <div className="lg:flex-1">
                            <div className="p-4 lg:p-6 bg-white rounded-2xl z-[2]">
                                {/* AboutCompany part start */}
                                <div className="lg:mb-[32px] pb-4 relative bg-white">
                                    <AboutCompany />
                                </div>
                                {/* AboutCompany part end */}

                                <div className="bg-white w-full">
                                    <ProductShowCase />
                                </div>
                            </div>
                            <div className="mt-8">
                                <CompanyTabs/>
                            </div>
                        </div>

                        <div className="lg:w-[370px] w-full">
                            <ContactWithBusinessOwner />
                        </div>

                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Company;