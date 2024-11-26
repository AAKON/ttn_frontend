import React from "react";
import { Section} from "@/shared";
import Count from "@/ui/count-item";
import Button from "@/components/ui/button";
import Option from "@/ui/option";
import option1 from "@/assets/option1.png";
import option from "@/assets/option.svg";
import option3 from "@/assets/option3.png";
import option4 from "@/assets/option4.png";
import option5 from "@/assets/option5.png";
import option6 from "@/assets/option6.png";

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
    <Section className="bg-gray-100">
        <div className="flex flex-col gap-y-10 lg:flex-row justify-between">
          {/* left */}
          <div className="flex flex-col md:items-start md:justify-start items-center justify-center text-center md:text-start">
            <h4 className="text-gray-900 hidden lg:block pb-[10px] font-semibold text-4xl capitalize">
              Global Sourcing Partner Benefits
            </h4>
            <h4 className="text-gray-900 lg:hidden pb-[10px] font-semibold text-xl md:text-4xl capitalize">
              Global Sourcing Partner
            </h4>
            <p className="font-normal hidden md:block text-gray-700 text-sm md:text-xl max-w-[305px] md:max-w-[399px]">
              We bridge the gap between you and your business partners
            </p>
            <p className="font-normal md:hidden text-gray-700 text-sm md:text-xl max-w-[305px] md:max-w-[399px]">
              Explore Our Extensive Range of Textile & Apparel Products &
              Services.{" "}
            </p>
            <div className="flex items-center gap-x-4 pt-6 md:pt-12">
              <Button secondary >
                Get a quote
              </Button>
              <Button>See Partnership Plan</Button>
            </div>
          </div>
          {/* right */}
          <div className="hidden md:flex flex-col items-start gap-y-8">
            {benefit?.map((item, index) => (
              <Option key={index} index={index} item={item} />
            ))}
          </div>
          <div className="flex mt-8 gap-y-6 md:hidden flex-wrap items-center justify-between">
            <Count
              titleClass={"text-xl"}
              roleClass={"text-xs"}
              className={"!w-[120px] sm:!w-[185px] pl-2"}
              title={"10,000+"}
              role={"Factory People"}
            />
            <Count
              titleClass={"text-xl"}
              roleClass={"text-xs"}
              className={"!w-[120px] sm:!w-[185px] pl-2"}
              title={"300k+"}
              role={"Global Audiences"}
            />
            <Count
              titleClass={"text-xl"}
              roleClass={"text-xs"}
              className={"!w-[120px] sm:!w-[185px] pl-2"}
              title={"70+"}
              role={"Listed Business"}
            />
            <Count
              titleClass={"text-xl"}
              roleClass={"text-xs"}
              className={"!w-[120px] sm:!w-[185px] pl-2"}
              title={"10+"}
              role={"Partners"}
            />
            <Count
              titleClass={"text-xl"}
              roleClass={"text-xs"}
              className={"!w-[120px] sm:!w-[185px] pl-2"}
              title={"06+"}
              role={"Countries"}
            />
            <Count
              titleClass={"text-xl"}
              roleClass={"text-xs"}
              className={"!w-[120px] sm:!w-[185px] pl-2"}
              title={"Free"}
              role={"Business listing"}
            />
          </div>
        </div>
    </Section>
  );
};

export default GlobalSourcing;
