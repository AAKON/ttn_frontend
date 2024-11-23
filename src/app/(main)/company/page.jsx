import {Container} from "@/shared";
import Frame from "./_frame";
import AboutCompany from "./about-company";
import ProductShowCase from "./product-showcase";
import ContactWithBusinessOwner from "./contact-with-business-owner";

function Company() {
    return (
        <div className="bg-gray-50">
            <div className="relative w-full">

                <div className="">
                    <Frame />
                </div>

                <Container>
                    <div className="h-full w-full lg:mt-[183px] mt-[415px] lg:flex lg:justify-between relative">

                        <div className="lg:w-[982px] lg:p-6 w-container p-4 bg-white rounded-2xl z-[2]">
                            {/* AboutCompany part start */}
                            <div className="lg:mb-[32px] pb-4 relative bg-white">
                                <AboutCompany />
                            </div>
                            {/* AboutCompany part end */}

                            <div className="bg-white w-full">
                                <ProductShowCase />
                                {/*<Feedback />*/}
                            </div>
                        </div>

                        <div
                            className="
                            lg:w-[370px]
                            w-full lg:p-6 px-4 lg:relative lg:top-0 absolute top-[210px] left-0 z-[5]">
                            <ContactWithBusinessOwner />
                        </div>

                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Company;