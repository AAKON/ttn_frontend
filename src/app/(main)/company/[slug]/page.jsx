import Image from "next/image"
import React, {Suspense} from "react";
import ErrorMessage from "@/components/shared/errormessage";
import {getCompanyBasic} from "@/services/company";
import BasicCompanyView from "@/app/(main)/company/[slug]/components/basicCompanyView";
import {Container} from "@/shared";
import Button from "@/components/ui/button";
import {EditIcon, ViewAs} from "@/icons";
import Link from "next/link";



const CompanyDetails = async ({params: { slug }}) => {


    try {
        const basicPromise = getCompanyBasic(slug);
        const basic = await basicPromise;

        return (
            <div className="bg-gray-50">
                <div className="bg-detailBennar bg-no-repeat bg-center bg-cover lg:h-[440px] h-[42.667vw] w-full"></div>
                <Container>
                    <div className="bg-white border border-gray-100 p-8 mb-8 rounded-2xl -mt-[140px]">
                        <div className="flex justify-end gap-3">
                            <Button secondary>
                                <ViewAs stroke="#000000"/>
                                View as
                            </Button>
                            <Button TagName={Link} href={`/myaccount/company/edit/${slug}`}>
                                <EditIcon stroke="#ffffff"/>
                                Edit My Profile
                            </Button>
                        </div>
                        <div className="pt-4">
                            <Suspense fallback={<div>Loading ...</div>}>
                                <BasicCompanyView basic={basic}/>
                            </Suspense>
                        </div>
                    </div>
                </Container>
            </div>
        )
    } catch (error) {
        return (
            <ErrorMessage message={error?.message}/>
        );
    }
}

export default CompanyDetails