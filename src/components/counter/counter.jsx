import { Section } from "@/components/shared";
import Button from "@/components/shared/button";
import Link from "next/link";
import CounterUp from "./counter-up";

const Counter = () => {
  return (
    <Section>
      <div className="flex items-center justify-center flex-col md:flex-row md:justify-between">
        {/* left */}
        <div className="text-center">
          <h3 className="font-semibold text-2xl md:text-4xl text-gray-900 max-w-[350px] leading-normal md:leading-[44px] pb-4 md:pb-10 px-16 md:text-start md:px-0">
            Grow Your Business Network{" "}
          </h3>
          <div className="flex items-center justify-center md:justify-start gap-x-2">
            <Button
              TagName={Link}
              href="/contact"
              secondary
              className="hidden md:flex"
            >
              Get quote
            </Button>
            <Button TagName={Link} href="/myaccount/company/add" icon>
              Add Company
            </Button>
          </div>
        </div>
        {/* right */}
        <div className="grid grid-cols-3 mt-8 md:items-center md:max-w-[692px] gap-[15px]">
          <CounterUp
            endValue={12}
            duration={2000}
            role={"Partners"}
            endfix={"+"}
          />
          <CounterUp
            endValue={7}
            duration={2000}
            role={"Countries"}
            endfix={"+"}
          />
          <CounterUp
            endValue={9000}
            duration={2000}
            role={"Professionals Connected"}
            endfix={"+"}
          />
          <CounterUp
            endValue={300000}
            duration={2000}
            role={"Global Audiences"}
            endfix={"+"}
          />
          <CounterUp
            endValue={80}
            duration={2000}
            role={"Business"}
            endfix={"+"}
          />
        </div>
      </div>
    </Section>
  );
};

export default Counter;
