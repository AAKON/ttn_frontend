import { Container, Section } from "@/shared";
import Count from "@/ui/count-item";
import Button from "@/components/shared/button";
import Option from "@/ui/option";
import option1 from "@/assets/marketing1.png";
import option from "@/assets/marketing2.png";
import option3 from "@/assets/marketing3.png";
import option4 from "@/assets/marketing4.png";

const GlobalMarket = () => {
  const benefit = [
    {
      title: "Digital Presence Management",
      img: option1,
    },
    {
      title: "Enhanced Online Visibility",
      img: option,
    },
    {
      title: "Targeted Marketing Support",
      img: option3,
    },
    {
      title: "Industry Network Inclusion",
      img: option4,
    },
  ];
  return (
    <>
      <Section>
        <div className="flex lg:flex-row-reverse gap-y-10 flex-col gap-x-6 xl:gap-x-[170px]">
          {/* left */}
          <div className="flex flex-col md:items-start md:justify-start items-center justify-center text-center md:text-start xl:w-[600px]">
            <h4 className="text-gray-900 hidden lg:block pb-[10px] font-semibold text-4xl capitalize">
              Global Marketing Partner Benefits
            </h4>
            <h4 className="text-gray-900 lg:hidden pb-[10px] font-semibold text-xl md:text-4xl capitalize">
              Global Marketing Partner
            </h4>
            <p className="font-normal hidden md:block text-gray-700 text-sm md:text-xl max-w-[305px] md:max-w-[399px]">
              We bridge the gap between you and your business partners
            </p>
            <p className="font-normal md:hidden text-gray-700 text-sm md:text-xl max-w-[305px] md:max-w-[399px]">
              Explore Our Extensive Range of Textile & Apparel Products &
              Services.{" "}
            </p>
            <div className="flex items-center gap-x-4 pt-6 md:pt-12">
              <Button secondary>Get a quote</Button>
              <Button>See Partnership Plan</Button>
            </div>
          </div>
          {/* right */}
          <div className="hidden md:flex flex-col items-start gap-y-8 xl:w-[648px]">
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
    </>
  );
};

export default GlobalMarket;
