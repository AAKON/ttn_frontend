"use client";

import {
  ChevronDownIcon,
  UserUpArrowIcon,
  CheckMarkIcon,
} from "@/components/icons";
import Button from "@/components/ui/button";
import { useState } from "react";

const PricingCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="grid grid-cols-2 gap-6 xl:gap-x-[191px] ">
      {/* left Side */}
      <div className="max-w-[550px]">
        <p className="font-semibold text-gray-900 pt-6">Key Benefits</p>
        <div className="grid grid-cols-1">
          <div className="py-[11px] px-2 flex items-center gap-3">
            <UserUpArrowIcon width={18} height={16} stroke="#F7931E" />
            <p className="font-medium text-md text-gray-700">
              Increased brand awareness & credibility
            </p>
          </div>
          <div className="py-[11px] px-2 flex items-center gap-3">
            <UserUpArrowIcon width={18} height={16} stroke="#F7931E" />
            <p className="font-medium text-md text-gray-700">
              Targeted exposure & content creation
            </p>
          </div>
          <div className="py-[11px] px-2 flex items-center gap-3">
            <UserUpArrowIcon width={18} height={16} stroke="#F7931E" />
            <p className="font-medium text-md text-gray-700">
              Networking for relationship building
            </p>
          </div>
          <div className="py-[11px] px-2 flex items-center gap-3">
            <UserUpArrowIcon width={18} height={16} stroke="#F7931E" />
            <p className="font-medium text-md text-gray-700">
              Exclusive content creation opportunities
            </p>
          </div>
        </div>

        <div>
          <p className="font-medium text-lg text-gray-900 pt-8 pb-12">
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
          <div className="py-[11px] px-2 flex items-center gap-3">
            <CheckMarkIcon stroke="#F7931E" />
            <p className="font-medium text-md text-gray-700">
              Profile Creation and Management
            </p>
          </div>
          <div className="py-[11px] px-2 flex items-center gap-3">
            <CheckMarkIcon stroke="#F7931E" />
            <p className="font-medium text-md text-gray-700">
              Branding and Marketing Materials Design
            </p>
          </div>
          <div className="py-[11px] px-2 flex items-center gap-3">
            <CheckMarkIcon stroke="#F7931E" />
            <p className="font-medium text-md text-gray-700">
              Content Creation
            </p>
          </div>
          <div className="py-[11px] px-2 flex items-center gap-3">
            <CheckMarkIcon stroke="#F7931E" />
            <p className="font-medium text-md text-gray-700">
              Social Media Marketing
            </p>
          </div>
          <div className="py-[11px] px-2 flex items-center gap-3">
            <CheckMarkIcon stroke="#F7931E" />
            <p className="font-medium text-md text-gray-700">
              Digital Ads Management
            </p>
          </div>
          <div className="py-[11px] px-2 flex items-center gap-3">
            <CheckMarkIcon stroke="#F7931E" />
            <p className="font-medium text-md text-gray-700">
              Website Development
            </p>
          </div>
          <div className="py-[11px] px-2 flex items-center gap-3">
            <CheckMarkIcon stroke="#F7931E" />
            <p className="font-medium text-md text-gray-700">
              SEO and Website Management
            </p>
          </div>
        </div>
        {/* Show the content when isOpen is true */}
        <span
          onClick={toggleAccordion}
          className="font-semibold text-md pl-2 text-blue cursor-pointer flex items-center absolute bottom-0 z-10 left-1/2 -translate-x-1/2"
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
  );
};

export default PricingCard;
