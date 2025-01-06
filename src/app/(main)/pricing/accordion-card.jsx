"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PricingCard from "./pricing-card";
import { Minus, Plus } from "@/components/icons";

const AccordionCard = ({ item, title, text, tabData }) => {
  const [active2, setactive2] = useState(false);

  const handleItem = () => {
    setactive2(!active2);
  };
  return (
    <Accordion
      type="single"
      collapsible
      className="py-2 pricing-accordion relative"
    >
      <AccordionItem
        value={item}
        className="border border-brand-500 rounded-lg py-6 px-4 lg:px-[50px] lg:py-10"
      >
        <AccordionTrigger
          onClick={() => handleItem()}
          className="!bg-white hover:no-underline flex-none p-0 w-full"
        >
          <div className="flex !justify-between items-center w-full">
            <div className="">
              <h2 className="font-medium text-sm lg:text-[20px] text-brand-600 text-left">
                {title}
              </h2>
              <div className="flex">
                <p className="font-bold text-2xl lg:text-3xl text-gray-900">
                  {text}
                </p>
                {/*<p className="font-semibold text-xl pt-2 text-gray-300">*/}
                {/*  {price}*/}
                {/*</p>*/}
              </div>
            </div>

            <div className="mr-0 lg:-mr-7 bg-white">
              {active2 ? (
                <Minus className="text-gray-400" />
              ) : (
                <Plus className="text-gray-400" />
              )}
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="p-0">
          <PricingCard tabData={tabData} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionCard;
