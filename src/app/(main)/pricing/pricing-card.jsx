"use client";

import {
  ChevronDownIcon,
  UserUpArrowIcon,
  CheckMarkIcon,
} from "@/components/icons";
import Button from "@/components/shared/button";
import { useState } from "react";

const PricingCard = ({ tabData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { keyBenefits, servicesYouGet } = tabData;
  console.log(keyBenefits);
  console.log(servicesYouGet);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 xl:gap-x-[191px] ">
      {/* left Side */}
      <div className="max-w-[550px]">
        <p className="font-semibold text-gray-900 pt-6">Key Benefits</p>
        <div className="grid grid-cols-1">
          {keyBenefits?.map(({ id, text }) => (
            <BenefitList key={id} text={text} />
          ))}
        </div>

        <div className="hidden lg:block">
          <p className="font-medium text-base lg:text-lg text-gray-900 pt-8 pb-12">
            A B2B platform with 300K+ Apparel & Textile professionals offering
            premium promotional solutions for event organizers.
          </p>
          <Button>Contact us</Button>
        </div>
      </div>

      {/* Right Side */}
      <div className="max-w-[550px] relative">
        <p className="font-semibold text-gray-900 pt-5">Services you get</p>
        <div className="grid grid-cols-1">
          {servicesYouGet?.map(({ id, text }) => (
            <ServicesList key={id} text={text} />
          ))}

          {/* Show the content when isOpen is true */}
          <div className="flex justify-end">
            <span
              onClick={toggleAccordion}
              className="font-semibold text-md pl-2 text-blue cursor-pointer inline-flex gap-2 items-center justify-end"
            >
              {isOpen ? "Less" : "See More"}
              {
                <span className={isOpen ? "rotate-180" : ""}>
                  <ChevronDownIcon stroke="#C67618" />
                </span>
              }
            </span>
          </div>
        </div>

        <div className="lg:hidden">
          <p className="font-medium text-base lg:text-lg text-gray-900 py-6 lg:pt-8 lg:pb-12">
            A B2B platform with 300K+ Apparel & Textile professionals offering
            premium promotional solutions for event organizers.
          </p>
          <Button>Contact us</Button>
        </div>
      </div>
    </div>
  );
};

function BenefitList({ text }) {
  return (
    <div className="py-[6px] lg:py-[11px] px-2 flex items-center gap-3">
      <UserUpArrowIcon width={18} height={16} stroke="#F7931E" />
      <p className="font-normal text-sm lg:text-base text-gray-700">{text}</p>
    </div>
  );
}
function ServicesList({ text }) {
  return (
    <div className="py-[6px] lg:py-[11px] px-2 flex items-center gap-3">
      <CheckMarkIcon stroke="#F7931E" />
      <p className="font-normal text-sm lg:text-base text-gray-700">{text}</p>
    </div>
  );
}

export default PricingCard;
