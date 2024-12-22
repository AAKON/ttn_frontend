import { EditIcon, ViewAs } from "@/icons";
import { Container } from "@/shared";
import Button from "@/components/shared/button";
import React, { Suspense } from "react";
import profile_pic from "@/assets/profile-pic.png";
import CompanyForm from "./_components/company-form";
import ProductsForm from "./_components/products-form";
import ContactWithBusinessOwner from "./_components/contact-with-business-owner";
import AvailableProducts from "./_components/available-products";
import EditTabs from "./_components/tabs";
import { getDataPreBasic } from "@/services/company";

export default async function Page() {
  const preDataBasic = await getDataPreBasic();

  return (
    <div className="bg-gray-50">
      <div className="bg-detailBennar bg-no-repeat bg-center bg-cover lg:h-[275px] h-[42.667vw] w-full"></div>
      <Container>
        <div className="bg-white border border-gray-100 p-8 mb-8 rounded-2xl -mt-[140px]">
          {/*<div className="flex justify-end gap-3">*/}
          {/*  <Button secondary>*/}
          {/*    <ViewAs stroke="#000000" />*/}
          {/*    View as*/}
          {/*  </Button>*/}
          {/*  <Button>*/}
          {/*    <EditIcon stroke="#ffffff" />*/}
          {/*    Edit My Profile*/}
          {/*  </Button>*/}
          {/*</div>*/}
          <div className="pt-4">
            <Suspense fallback={<div>Loading ...</div>}>
              <CompanyForm preData={preDataBasic} />
            </Suspense>
          </div>
        </div>
      </Container>
    </div>
  );
}
