import CompanyCard from "@/components/cards/company-card";
import { Section, SectionHeading } from "@/shared";
import React, {Suspense} from "react";
import {getMyCompanies} from "@/services/company";

export default async function Companies(){
    const myCompanies = await getMyCompanies();
  return (
    <Section>
      <div className="pb-10">
      <SectionHeading heading="My Companies" />
      </div>
        <Suspense fallback={<div>Loading...</div>}>
            <div className="grid grid-cols-3 gap-6">
                {myCompanies && Array.isArray(myCompanies) && myCompanies.length > 0 ?
                    myCompanies.map((company) => (
                        <CompanyCard key={company.id} data={company} />
                    ))
                :
                    <p>No Companies found.</p>
                }
            </div>
        </Suspense>
    </Section>
  );
};
