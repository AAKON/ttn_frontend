import React, { Suspense } from "react";
import { getMyCompanies } from "@/services/company";
import CompanyCardProfile from "./company-card-profile";

export default async function MyCompany() {
  const myCompanies = await getMyCompanies();
  console.log(myCompanies);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h3 className="text-sm md:text-lg font-semibold text-gray-900 pb-9">
        My Companies (<span>23</span>)
      </h3>
      <div className="grid grid-cols-3 gap-6">
        {myCompanies && Array.isArray(myCompanies) && myCompanies.length > 0 ? (
          myCompanies.map((company) => (
            <CompanyCardProfile key={company.id} data={company} />
          ))
        ) : (
          <p>No Companies found.</p>
        )}
      </div>
    </Suspense>
  );
}
