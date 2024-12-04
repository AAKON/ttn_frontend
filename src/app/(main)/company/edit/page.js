import { EditIcon, ViewAs } from "@/icons";
import { Container } from "@/shared";
import Button from "@/components/ui/button";
import React from "react";
import profile_pic from "@/assets/profile-pic.png";
import CompanyForm from "./_components/company-form";
import ProductsForm from "./_components/products-form";
import ContactWithBusinessOwner from "./_components/contact-with-business-owner";

const AdminEdit = () => {
  return (
    <>
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
            <CompanyForm />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_370px] xl:gap-12">
          <div className="bg-white border border-gray-100 p-6 rounded-2xl mt-8">
              <ProductsForm />
          </div>
          <div>
            <ContactWithBusinessOwner />
          </div>
        </div>
      </Container>
    </>
  );
};

export default AdminEdit;
