import Image from "next/image";
import React, { Suspense } from "react";
import ErrorMessage from "@/components/shared/errormessage";
import { getCompanyBasic, getCompanyDetails } from "@/services/company";
import { Container } from "@/shared";
import Frame from "@/components/company/_frame";
import AboutCompany from "@/components/company/about-company";
import ProductShowcase from "@/components/company/product-showcase";
import CompanyTabs from "@/components/company/company-tabs";
import ContactWithBusinessOwner from "@/components/company/contact-with-business-owner";

const CompanyDetails = async ({ params: { slug } }) => {
  try {
    const detailsPromise = getCompanyDetails(slug);
    const details = await detailsPromise;

    const headerData = {
      bannerImage: details?.company?.thumbnail_url,
      profileImage: details?.company?.profile_pic_url,
      moto: details?.company?.moto,
      tags: details?.company?.tags,
      name: details?.company?.name,
      viewCount: details?.company?.view_count,
      location: details?.company?.location?.name,
      category: details?.company?.business_category?.name,
      companySize: details?.company?.manpower,
      created: details?.company?.created_at,
      canEdit: details?.buttons?.edit,
      canClaim: details?.buttons?.claim,
    };
    const faqData = details?.company?.faqs || [];
    const clientsData = details?.company?.clients || [];
    const certificatesData = details?.company?.certificates || [];
    const productsData = details?.company?.products || [];
    const overviewData = details?.company?.overview || null;
    const contactData = details?.company?.contact || null;
    const decissionMakersData = details?.company?.decision_makers || [];


    console.log(details, "get c details");

    return (
      <div className="bg-gray-50 pb-8 md:pb-10 lg:pb-16 xl:pb-20">
        <div className="relative">
          <Frame slug={slug} headerData={headerData} />
          <Container>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_370px] xl:gap-12 relative mt-4 xl:mt-10">
              <div>
                <div className="p-4 lg:p-6 bg-white rounded-2xl z-[2]">
                  {/* AboutCompany part start */}
                  <div className="lg:mb-[32px] relative grid grid-cols-1 gap-6 xl:gap-8">
                    <AboutCompany aboutData={details?.company?.about} />
                    {productsData && Array.isArray(productsData) && productsData.length > 0 ? (
                    <ProductShowcase products={productsData}/>) : (
                        <ErrorMessage message={'No products available'} />
                      )}
                  </div>
                  {/* AboutCompany part end */}
                </div>
                <div className="mt-8">
                  <CompanyTabs
                    faqs={faqData}
                    clients={clientsData}
                    certificatesData={certificatesData}
                    overview={overviewData}
                    contactData={contactData}
                    decissionMakers={decissionMakersData}
                  />
                </div>
              </div>

              <div>
                <ContactWithBusinessOwner headerData={headerData} />
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  } catch (error) {
    return <ErrorMessage message={error?.message} />;
  }
};

export default CompanyDetails;
