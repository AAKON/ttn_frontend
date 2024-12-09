import Image from "next/image"
import React, {Suspense} from "react";
import ErrorMessage from "@/components/shared/errormessage";
import {getCompanyBasic} from "@/services/company";
import {Container} from "@/shared";
import Frame from "@/components/company/_frame";
import AboutCompany from "@/components/company/about-company";
import ProductShowcase from "@/components/company/product-showcase";
import CompanyTabs from "@/components/company/company-tabs";
import ContactWithBusinessOwner from "@/components/company/contact-with-business-owner";



const CompanyDetails = async ({params: { slug }}) => {


    try {
        const basicPromise = getCompanyBasic(slug);
        const basic = await basicPromise;

        return (
            <div className="bg-gray-50 pb-8 md:pb-10 lg:pb-16 xl:pb-20">
                <div className="relative">
                    <Frame/>
                    <Container>
                        <div
                            className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_370px] xl:gap-12 relative mt-4 xl:mt-10">
                            <div>
                                <div className="p-4 lg:p-6 bg-white rounded-2xl z-[2]">
                                    {/* AboutCompany part start */}
                                    <div className="lg:mb-[32px] relative grid grid-cols-1 gap-6 xl:gap-8">
                                        <AboutCompany/>
                                        <ProductShowcase/>
                                    </div>
                                    {/* AboutCompany part end */}
                                </div>
                                <div className="mt-8">
                                    <CompanyTabs />
                                </div>
                            </div>

                            <div>
                                <ContactWithBusinessOwner />
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        )
    } catch (error) {
        return (
            <ErrorMessage message={error?.message}/>
        );
    }
}

export default CompanyDetails