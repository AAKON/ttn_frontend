"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccordionCard from "@/app/(main)/pricing/accordion-card";
import { Container } from "@/shared";
import { getPricingList } from "@/services/pricing";

function PricingTabs(props) {
  const arr = ["B2B Partnership", "Marketing Partnership"];
  const [active, setactive] = useState(arr[0]);
  const [pricingData, setPricingData] = useState({});

  // Mapping tab names to API types
  const tabTypeMap = {
    "B2B Partnership": "b2b",
    "Marketing Partnership": "marketing",
  };

  // Fetch data when the active tab changes
  useEffect(() => {
    const fetchData = async () => {
      const tabType = tabTypeMap[active];
      // Only fetch if data for this tab doesn't exist
      if (!pricingData[tabType]) {
        try {
          const result = await getPricingList(tabType);
          setPricingData((prevData) => ({
            ...prevData,
            [tabType]: result?.pricings, // Store data in object with tab type as key
          }));
        } catch (error) {
          console.error("Error fetching pricing list:", error);
        }
      }
    };

    fetchData();
  }, [active]);

  return (
    <Container>
      {/* Tabs part start */}
      <Tabs defaultValue="B2B Partnership" className="py-10">
        <TabsList className="!h-auto flex justify-center !bg-transparent">
          <div className="bg-gray-100 p-2 rounded-[12px] !inline-flex justify-center">
            {arr.map((el, idx) => {
              return (
                <TabsTrigger
                  key={idx}
                  value={el}
                  onClick={() => setactive(el)}
                  className={`!text-sm lg:text-xl !px-3 !py-2 rounded-[8px] lg:!py-[10px] lg:px-5
            ${
              active == el
                ? "font-semibold  text-gray-900 bg-white"
                : "font-medium  text-gray-600 !bg-transparent"
            }`}
                >
                  {el}
                </TabsTrigger>
              );
            })}
          </div>
        </TabsList>

        <TabsContent value="B2B Partnership">
          <div>
            {active === "B2B Partnership" &&
              pricingData?.b2b &&
              pricingData?.b2b.map((item, index) => (
                <AccordionCard
                  key={index}
                  item={"item-1"}
                  title={item?.title ?? "MEDIA & EVENT PARTNERSHIP"}
                  text={item?.price}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="Marketing Partnership">
          <div>
            {active === "Marketing Partnership" &&
              pricingData?.marketing &&
              pricingData?.marketing.map((item, index) => (
                <AccordionCard
                  key={index}
                  item={"item-1"}
                  title={item?.title ?? "MEDIA & EVENT PARTNERSHIP"}
                  text={item?.price}
                  // price={`/${item?.price}`}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </Container>
  );
}

export default PricingTabs;
