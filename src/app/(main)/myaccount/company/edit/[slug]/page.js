import { ViewAs } from "@/icons";
import { Container } from "@/shared";
import Button from "@/components/shared/button";
import React, { Suspense } from "react";
import { getCompanyBasic, getDataPreBasic } from "@/services/company";
import ErrorMessage from "@/components/shared/errormessage";
import CompanyBasicForm from "./_components/company-form";
import CompanyForms from "@/app/(main)/myaccount/company/edit/[slug]/_components/company-forms";
import Company404 from "@/app/(main)/company/[slug]/not-found";
import Link from "next/link";
import { GlobalSkeleton } from "@/components/shared/skelton/globalSkeleton";

export default async function Page({ params }) {
  const { slug } = await params;
  try {
    const basic = await getCompanyBasic(slug);
    const preDataBasic = await getDataPreBasic();

    if (!basic?.status && basic?.code === 404) {
      return <Company404 />;
    }

    console.log(basic, "get basic");

    return (
      <Suspense fallback={<GlobalSkeleton />}>
        <div className="bg-gray-50">
          <div className="bg-detailBennar bg-no-repeat bg-center bg-cover lg:h-[275px] h-[42.667vw] w-full"></div>
          <Container>
            <div className="bg-white border border-gray-100 p-8 rounded-2xl -mt-[140px]">
              <div className="flex justify-end gap-3">
                <Button TagName={Link} href={`/company/${slug}`} secondary>
                  <ViewAs stroke="#000000" />
                  Preview
                </Button>
                {/*<Button>*/}
                {/*  <EditIcon stroke="#ffffff" />*/}
                {/*  Edit My Profile*/}
                {/*</Button>*/}
              </div>
              <div className="pt-4">
                <CompanyBasicForm slug={slug} basic={basic?.data} preData={preDataBasic} />
              </div>
            </div>
            <CompanyForms slug={slug} preData={preDataBasic} />
          </Container>
        </div>
      </Suspense>
    );
  } catch (error) {
    return <ErrorMessage message={error?.message} />;
  }
}
