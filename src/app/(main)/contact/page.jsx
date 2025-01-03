import React from "react";
import { Container, Section } from "@/shared";
import ContactTeamCard from "./_contact-team-card";
import Team1 from "@/assets/team1.jpg";
import Team2 from "@/assets/team2.jpg";
import Team3 from "@/assets/team3.jpg";
import { Email, Phone, Location } from "@/icons";
import ContactUsForm from "./_contact-us-form";
import {getTeams} from "@/services/contact";

const Contact = async() => {

  let teamsData = [];

  try {
    teamsData = await getTeams();
    console.log(teamsData, "get teamsData");
  } catch (error) {
    console.error("Error fetching teamsData:", error);
    teamsData = [];
  }

  return (
    <div>
      {/* Office Information section */}
      <Section className="bg-gray-50">
        <h1 className="text-center">We’d love to hear from you</h1>
        {/* sub titel part */}
        <p className="section_short_description text-center md:pt-4 lg:pt-6">
          Our friendly team is always here to chat.
        </p>
      </Section>

      <Section className="pt-0 lg:pt-20 max-w-[720px] mx-auto">
        <div className="grid grid-cols-1 gap-8 ">
          <div>
            <div className="md:pb-6 lg:pt-0">
              <h2 className="text-center">Get in touch</h2>
              <p className="section_short_description text-center pt-2 md:pt-3 lg:pt-5">
                We’d love to hear from you. Please fill out this form.
              </p>
            </div>
            <ContactUsForm />
          </div>

          {/* Office Information section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-10">
            <div className="flex gap-x-2">
              <Email />
              <div className="pl-[10px]">
                <p className="text-gray-500 ">Email</p>
                <span className="font-semibold text-base text-gray-700">
                  info@thetextilenetwork.com
                </span>
              </div>
            </div>

            <div className="flex gap-x-2">
              <Phone />
              <div className="pl-[10px]">
                <p className="text-gray-500 ">Phone</p>
                <span className="font-semibold text-base text-gray-700">
                  +8801783525434
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-gray-50">
        <h2 className="text-center">Our Team</h2>

        <div className="mt-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-6 lg:gap-8">
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
    </div>
  );
};

export default Contact;
