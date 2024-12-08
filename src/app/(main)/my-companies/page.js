import CompanyCard from "@/components/cards/company-card";
import { Section, SectionHeading } from "@/components/shared";
import React from "react";

const Companies = () => {
  return (
    <Section>
      <div className="pb-10">
      <SectionHeading heading="My Companies" />
      </div>
      <div className="grid grid-cols-3 gap-6">
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
      </div>
    </Section>
  );
};

export default Companies;
