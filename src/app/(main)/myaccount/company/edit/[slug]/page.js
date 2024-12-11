import { EditIcon, ViewAs } from "@/icons";
import { Container } from "@/shared";
import Button from "@/components/ui/button";
import React, {Suspense } from "react";
import profile_pic from "@/assets/profile-pic.png";
import ProductsForm from "./_components/products-form";
import ContactWithBusinessOwner from "./_components/contact-with-business-owner";
import AvailableProducts from "./_components/available-products";
import EditTabs from "./_components/tabs";
import {getCompanyBasic, getDataPreBasic} from "@/services/company";
import ErrorMessage from "@/components/shared/errormessage";
import CompanyForm from "./_components/company-form";

export default async function Page({params: { slug }}){

  try {
    const preDataBasic = await getDataPreBasic();

      const basicPromise = getCompanyBasic(slug);
      const basic = await basicPromise;

    console.log(basic, '===basic');

    return (
        <Suspense fallback={<div>Loading ...</div>}>
        <div className="bg-gray-50">
          <div className="bg-detailBennar bg-no-repeat bg-center bg-cover lg:h-[440px] h-[42.667vw] w-full"></div>
          <Container>
            <div className="bg-white border border-gray-100 p-8 rounded-2xl -mt-[140px]">
              <div className="flex justify-end gap-3">
                <Button secondary>
                  <ViewAs stroke="#000000" />
                  View as
                </Button>
                <Button>
                  <EditIcon stroke="#ffffff" />
                  Edit My Profile
                </Button>
              </div>
              <div className="pt-4">
                  <CompanyForm basic={basic} preData={preDataBasic} />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_370px] xl:gap-x-12 xl:gap-y-8">
              <div className="bg-white border border-gray-100 p-6 rounded-2xl">
                <ProductsForm />
                <div className="max-w-[932px]">
                  <AvailableProducts />
                </div>
              </div>
              <div>
                <ContactWithBusinessOwner />
              </div>
              <div>
                <EditTabs slug={slug} />
              </div>
            </div>
          </Container>
        </div>
        </Suspense>
    );

  }catch (error) {
    return (
        <ErrorMessage message={error?.message}/>
    );
  }
};
