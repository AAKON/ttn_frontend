import React from "react";
import { Section } from "@/shared";
import Count from "@/ui/count-item";
import Button from "@/components/shared/button";
import Option from "@/ui/option";
import option1 from "@/assets/option1.png";
import option from "@/assets/option.svg";
import option3 from "@/assets/option3.png";
import option4 from "@/assets/option4.png";
import option5 from "@/assets/option5.png";
import option6 from "@/assets/option6.png";
import Link from "next/link";

const GlobalSourcing = () => {
  const benefit = [
    {
      title: "Optimized Supplier Matching",
      img: option1,
    },
    {
      title: "Development & Flexible MOQ",
      img: option3,
    },
    {
      title: "Best Quality, Best Pricing",
      img: option4,
    },
    {
      title: "One-stop Sourcing Solution",
      img: option5,
    },
    {
      title: "Logistics & Service Transparency",
      img: option6,
    },
    {
      title: "Market Exposure",
      img: option4,
    },
  ];

  return (
    <Section>
      <div className="flex flex-col gap-x-6 xl:gap-x-[170px] gap-y-10 lg:flex-row">
        {/* left */}
        <div className="flex flex-col md:items-start md:justify-start items-center justify-center text-center md:text-start xl:w-[582px]">
          <h4 className="text-gray-900 pb-[10px] font-semibold text-[20px] md:text-4xl capitalize">
            Sourcing Partner Benefits
          </h4>
          <p className="font-normal hidden md:block text-gray-700 text-sm md:text-xl max-w-[305px] md:max-w-[399px]">
            We bridge the gap between you and your business partners
          </p>
          <p className="font-normal md:hidden text-gray-700 text-sm md:text-xl max-w-[305px] md:max-w-[399px]">
            Explore Our Extensive Range of Textile & Apparel Products &
            Services.{" "}
          </p>
          <div className="flex items-center gap-x-4 pt-6 md:pt-12">
            <Button secondary TagName={Link} href="/contact">Get a quote</Button>
            <Button TagName={Link} href="/pricing">See Partnership Plan</Button>
          </div>
        </div>
        {/* right */}
        <div className="flex flex-col items-start gap-y-[14px] md:gap-y-8 xl:w-[648px]">
          {benefit?.map((item, index) => (
            <Option key={index} index={index} item={item} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default GlobalSourcing;
