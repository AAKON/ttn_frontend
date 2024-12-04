import { Section } from "@/components/shared";
import Count from "./count";
import Button from "@/components/ui/button";

const  Counter = () => {
  return (
    <Section>
      <div className="flex items-center justify-center flex-col md:flex-row md:justify-between">
        {/* left */}
        <div className="text-center">
          <h3 className="font-semibold text-2xl md:text-4xl text-gray-900 max-w-[350px] leading-normal md:leading-[44px] pb-4 md:pb-10 px-16 md:text-start md:px-0">
            Explore Your Business Needs{" "}
          </h3>
          <div className="flex items-center justify-center md:justify-start gap-x-2">
            <Button secondary>Get quote</Button>
            <Button>Add Company</Button>
          </div>
        </div>
        {/* right */}
        <div className="grid grid-cols-3 mt-8 md:items-center md:max-w-[692px] gap-[15px]">
          <Count value={"12+"} role={"Partners"} />
          <Count value={"7+"} role={"Countries"} />
          <Count value={"9000+"} role={"Professionals Connected"} />
          <Count value={"300,000+"} role={"Global Audiences"} />
          <Count value={"80+"} role={"Business"} />
        </div>
      </div>
    </Section>
  );
};

export default Counter;
