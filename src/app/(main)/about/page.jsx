import Image from "next/image";
import { Container } from "@/shared";
import AboutMap from "@/assets/aboutmap.jpg";
import CounterUp from "@/components/counter/counter-up";

const About = () => {
  return (
    <div>
      <div className="bg-gray-50">
        <Container>
          {/* Heading part */}
          <h1 className="font-semibold text-[48px] text-gray-900 pt-[70px] text-center ml-10">
            About Textile Network
          </h1>
          {/* sub titel part */}
          <p className="text-[20px] text-center text-gray-600 pt-[30px]">
            Textile Network is an apparel and textile industry-based business
            networking platform. Our goal is to create a textile business
            networking platform that can help develop business networks in any
            range of related industries. The service area is to grow business
            awareness, branding, and digital sourcing solutions for the apparel
            and textile business globally.
          </p>
          <div className="mt-28">
            <div className="grid grid-cols-3 gap-[15px] md:items-center md:grid-cols-5 md:gap-8 ">
            <CounterUp endValue={10} duration={2000} role={"Partners"} endfix={"+"} />
            <CounterUp endValue={6} duration={2000} role={"Countries"} endfix={"+"} />
            <CounterUp endValue={70} duration={2000} role={"Listed Business"} endfix={"+"} />
            <CounterUp endValue={10} duration={2000} role={"Factory People"} endfix={"k+"} />
            <CounterUp endValue={300} duration={2000} role={"Global Audiences"} endfix={"k+"} />
            </div>
          </div>
          <div className="mt-11 pb-20">
            <AboutUsCard />
          </div>
        </Container>

        <div className="bg-white pb-32">
          <Container>
            <h2 className="font-bold text-4xl text-center pt-20 text-gray-900">
              Market Share
            </h2>
            <p className="text-xl text-center text-gray-400 pt-2 pb-9">
              Lorem ipsum around 10+ countries
            </p>
            <Image src={AboutMap} alt="aboutpagemap" />
          </Container>
        </div>
      </div>
    </div>
  );
};

const AboutUsCard = () => {
  return (
    <div className="flex gap-x-6">
      <div className="w-[680px] h-[222px] border rounded-xl bg-white relative">
        <h2 className="font-medium text-xl  text-center pt-8 ">Our Mission</h2>
        <p className="text-base text-center pl-10 pr-10 pt-5  text-gray-900 absolute z-10 ">
          To create sustainable sourcing and business transparency network for
          the apparel & textile industry globally. To create sustainable
          sourcing and business transparency network for the apparel & textile
          industry globally.{" "}
        </p>
      </div>
      <div className="w-[690px] h-[222px] border rounded-xl bg-white relative">
        <h2 className="font-medium text-xl  text-center pt-8">Our Vision</h2>
        <p className="text-[15px] text-center pl-4 pt-5 text-gray-900 absolute z-20 ">
          To revolutionize the apparel and textile industry by providing a
          comprehensive business networking platform and empowering businesses
          in the apparel and textile sector to expand business networks, drive
          success, and make a significant sustainable business impact
          in global scale.
        </p>
      </div>
    </div>
  );
};

export default About;
