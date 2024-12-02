"use client";
import { Container } from "@/shared";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import AccordionCard from "./accordion-card";

const Pricing = () => {
  const arr = ["B2B Partnership", "Marketing Partnership"];
  const [active, setactive] = useState(arr[0]);
  return (
    <div>
      <div className="bg-gray-50 pb-32">
        <Container>
          {/* Heading part */}
          <h1 className="font-semibold text-[48px] text-gray-900 pt-[70px] ml-10 text-center">
            Our Tailored Packages
          </h1>
          {/* sub titel part */}
          <p className="text-[20px] text-center text-gray-600 pt-[30px] pl-[210px] pr-[160px] ">
            Are you looking to expand your horizons in the textile and apparel
            industry? Join our dynamic team as a valued partner and unlock a
            world of opportunities.
          </p>
        </Container>
      </div>
      <Container>
        {/* Tabs part start */}
        <Tabs
          defaultValue="B2B Partnership"
          className="max-w-full mx-auto pt-10 "
        >
          <TabsList className="ml-[440px] py-10 px-4 gap-x-4 rounded-lg">
            {arr.map((el, idx) => {
              return (
                <TabsTrigger
                  key={idx}
                  value={el}
                  onClick={() => setactive(el)}
                  className={`!text-[20px] !px-10 !py-4 ml-2 
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
          </TabsList>

          <TabsContent value="B2B Partnership">
            <div>
              {/* b2b Accordion part Start */}
              <AccordionCard
                item={"item-1"}
                title={"MEDIA & EVENT PARTNERSHIP"}
                text={"Free"}
                price={"/Price"}
              />

              <AccordionCard
                item={"item-2"}
                title={"MEDIA & EVENT PARTNERSHIP"}
                text={"Win-Win"}
                price={"/Price"}
              />

              <AccordionCard
                item={"item-3"}
                title={"MEDIA & EVENT PARTNERSHIP"}
                text={"Contact for Price"}
              />

              <AccordionCard
                item={"item-4"}
                title={"MEDIA & EVENT PARTNERSHIP"}
                text={"1499$"}
                price={"/Price"}
              />

              {/* b2b Accordion part end */}
            </div>
          </TabsContent>

          <TabsContent value="Marketing Partnership">
            <div>
              {/* marketing Accordion part Start */}
              <AccordionCard
                item={"item-1"}
                title={"MEDIA & EVENT PARTNERSHIP"}
                text={"Paid"}
                price={"/Price"}
              />

              <AccordionCard
                item={"item-2"}
                title={"MEDIA & EVENT PARTNERSHIP"}
                text={"Win"}
                price={"/Price"}
              />

              <AccordionCard
                item={"item-3"}
                title={"MEDIA & EVENT PARTNERSHIP"}
                text={"Contact for Price"}
              />

              <AccordionCard
                item={"item-4"}
                title={"MEDIA & EVENT PARTNERSHIP"}
                text={"1799$"}
                price={"/Price"}
              />
              {/* marketing Accordion part end */}
            </div>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
};

export default Pricing;
