import { Section } from "@/components/shared";
import Button from "@/components/shared/button";
import Link from "next/link";
import CounterUp from "./counter-up";

const Counter = ({homeStats}) => {
  return (
    <Section>
      <div className="flex items-center justify-center flex-col md:flex-row md:justify-between">
        {/* left */}
        <div className="text-center">
          <h2 className="max-w-[224px] sm:max-w-[350px] pb-4 md:pb-10 md:text-start">
            Grow Your Business Network{" "}
          </h2>
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
            endValue={homeStats?.partners}
            duration={2000}
            role={"Partners"}
            endfix={"+"}
          />
          <CounterUp
            endValue={homeStats?.countries}
            duration={2000}
            role={"Countries"}
            endfix={"+"}
          />
          <CounterUp
            endValue={homeStats?.factory_people}
            duration={2000}
            role={"Professionals Connected"}
            endfix={"+"}
          />
          <CounterUp
            endValue={homeStats?.global_audience}
            duration={2000}
            role={"Global Audiences"}
            endfix={"+"}
          />
          <CounterUp
            endValue={homeStats?.listed_business}
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
