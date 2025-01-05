import Image from "next/image";
import { Section } from "@/shared";
import AboutMap from "@/assets/aboutmap.jpg";
import CounterUp from "@/components/counter/counter-up";
import leftWaterMark from "@/assets/about-water-mark-left.png";
import rightWaterMark from "@/assets/about-water-mark-right.png";
import ContactTeamCard from "@/app/(main)/contact/_contact-team-card";
import Team1 from "@/assets/team1.jpg";
import React from "react";
import {getTeams} from "@/services/contact";

const About = async() => {

    let teamsData = [];

    try {
        teamsData = await getTeams();
        console.log(teamsData, "get teamsData");
    } catch (error) {
        console.error("Error fetching teamsData:", error);
        teamsData = [];
    }

  return (
    <>
      <Section className={"bg-gray-50"}>
        <div className="">
          {/* Heading part */}
          <h1 className="text-center">About Textile Network</h1>
          {/* sub titel part */}
          <p className="text-base md:text-[20px] md:leading-[30px] text-center text-gray-600 pt-2 md:pt-[30px]">
            Textile Network is an apparel and textile industry-based business
            networking platform. Our goal is to create a textile business
            networking platform that can help develop business networks in any
            range of related industries. The service area is to grow business
            awareness, branding, and digital sourcing solutions for the apparel
            and textile business globally.
          </p>
          <div className="py-8 md:py-12 lg:py-16">
            <div className="grid grid-cols-3 gap-[15px] md:items-center md:grid-cols-5 md:gap-8 ">
              <CounterUp
                endValue={10}
                duration={2000}
                role={"Partners"}
                endfix={"+"}
                numberFontSize="text-xl sm:text-[30px] md:text-[40px] 2xl:text-[60px]"
              />
              <CounterUp
                endValue={6}
                duration={2000}
                role={"Countries"}
                endfix={"+"}
                numberFontSize="text-xl sm:text-[30px] md:text-[40px] 2xl:text-[60px]"
              />
              <CounterUp
                endValue={70}
                duration={2000}
                role={"Listed Business"}
                endfix={"+"}
                numberFontSize="text-xl sm:text-[30px] md:text-[40px] 2xl:text-[60px]"
              />
              <CounterUp
                endValue={10}
                duration={2000}
                role={"Factory People"}
                endfix={"k+"}
                numberFontSize="text-xl sm:text-[30px] md:text-[40px] 2xl:text-[60px]"
              />
              <CounterUp
                endValue={300}
                duration={2000}
                role={"Global Audiences"}
                endfix={"k+"}
                numberFontSize="text-xl sm:text-[30px] md:text-[40px] 2xl:text-[60px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <AboutUsCard
              title={"Our Mission"}
              description={
                "To create sustainable sourcing and business transparency network for the apparel & textile industry globally. To create sustainable sourcing and business transparency network for the apparel & textile industry globally."
              }
              image={leftWaterMark}
              leftTopPosition
            />

            <AboutUsCard
              title={"Our Vision"}
              description={
                "To revolutionize the apparel and textile industry by providing a comprehensive business networking platform and empowering businesses in the apparel and textile sector to expand business networks, drive success, and make a significant sustainable business impact in global scale."
              }
              image={rightWaterMark}
            />
          </div>
        </div>
      </Section>
      <Section>
        <h2 className="text-[24px] lg:text-3xl leading-tight text-center text-gray-900">
          Market Share
        </h2>
        <p className="text-sm md:text-xl text-center text-gray-400 pt-2 pb-6">
          Lorem ipsum around 10+ countries
        </p>
        <Image src={AboutMap} alt="aboutpagemap" />
      </Section>
        <Section className="bg-gray-50">
            <h2 className="text-center">Our Team</h2>

            <div className="mt-9 flex flex-wrap flex-col md:flex-row justify-center gap-y-12 md:gap-y-6 lg:gap-y-8">
                {teamsData && teamsData.map((item) => (
                    <ContactTeamCard
                        key={item?.id}
                        src={item?.image ? item?.image :Team1}
                        name={item?.name}
                        title={item?.designation}
                        email={item?.email}
                    />
                ))}
            </div>
        </Section>
    </>
  );
};

const AboutUsCard = ({ title, description, leftTopPosition, image }) => {
  return (
    <div className="border rounded-xl bg-white px-4 py-10 md:px-10 relative z-[1]">
      <h2 className="font-medium text-xl text-center tracking-[1px]">
        {title}
      </h2>
      <p className="text-sm md:text-base text-center text-gray-900 pt-4">
        {description}
      </p>
      <div className={`absolute ${leftTopPosition ? "top-0 left-0" : "bottom-0 right-0"} z-[-1]`} >
        <Image
          src={image}
          alt="shape"
          width={178}
          height={152}
        />
      </div>
    </div>
  );
};

export default About;
