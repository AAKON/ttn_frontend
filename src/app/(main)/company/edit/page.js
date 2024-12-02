import { EditIcon, ViewAs } from "@/icons";
import { Container } from "@/shared";
import Button from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import profile_pic from "@/assets/profile-pic.png";
import CompanyForm from "./company-form";

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
          <div className="size-[96px] rounded-full overflow-hidden">
            <Image src={profile_pic} alt="avatar" width={96} height={96} />
          </div>
          <div className="pt-4">
            <CompanyForm />
          </div>
        </div>
      </Container>
    </>
  );
};

export default AdminEdit;
