import React from "react";
import { Container, Section } from "@/shared";
import ContactTeamCard from "./_contact-team-card";
import Team1 from "@/assets/team1.jpg";
import Team2 from "@/assets/team2.jpg";
import Team3 from "@/assets/team3.jpg";
import { Email, Phone, Location } from "@/icons";
import ContactUsForm from "./_contact-us-form";

const Contact = () => {
  return (
    <div>
      {/* Office Information section */}
      <Section className="bg-gray-50">
        <h1 className="text-center">
          We’d love to hear from you
        </h1>
        {/* sub titel part */}
        <p className="section_short_description text-center md:pt-4 lg:pt-6">
          Our friendly team is always here to chat.
        </p>
      </Section>

      <Section className="pt-0 lg:pt-20">
        <div className="grid grid-cols-1 lg:gap-6 items-start lg:grid-cols-[2fr_3fr]">
          {/* Office Information section */}
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-10 pb-8 lg:pb-0 bg-gray-50 lg:bg-white">
            <div className="flex gap-x-2">
              <Email />
              <div className="pl-[10px]">
                <p className="text-gray-500 pt-6 md:pt-0">Email</p>
                <span className="font-semibold text-base text-gray-700">
                  info@thetexti lenetwork.com
                </span>
              </div>
            </div>

            <div className="flex gap-x-2">
              <Location />
              <div className="pl-[10px]">
                <p className="text-gray-500 pt-6 md:pt-0">Office</p>
                <span className="font-semibold text-base text-gray-700">
                  18/7, Nikunja-2, Khilkhet, Dhaka,{" "}
                </span>
                <p className="font-semibold text-base text-gray-700">
                  Bangladesh-1229{" "}
                </p>
              </div>
            </div>

            <div className="flex gap-x-2">
              <Phone />
              <div className="pl-[10px]">
                <p className="text-gray-500 pt-6 md:pt-0">Phone</p>
                <span className="font-semibold text-base text-gray-700">
                  +88017835252434 (WhatsApp)
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="md:pb-10 lg:pb-[60px] pt-8 lg:pt-0">
              <h2 className="text-center">
                Get in touch
              </h2>
              <p className="section_short_description text-center pt-2 md:pt-3 lg:pt-5">
                We’d love to hear from you. Please fill out this form.
              </p>
            </div>
            <ContactUsForm />
          </div>
        </div>
      </Section>

      <Section className="bg-gray-50">
        <h2 className="text-center">Our Team</h2>

        <div className="mt-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-6 lg:gap-8">
          <ContactTeamCard
            src={Team1}
            name={"Naim Hasan"}
            title={"Founder & CEO"}
            email={"naim.hassan@gmail.com"}
          />

          <ContactTeamCard
            src={Team2}
            name={"Naim Hasan"}
            title={"Founder & CEO"}
            email={"naim.hassan@gmail.com"}
          />

          <ContactTeamCard
            src={Team3}
            name={"Naim Hasan"}
            title={"Founder & CEO"}
            email={"naim.hassan@gmail.com"}
          />
          <ContactTeamCard
            src={Team1}
            name={"Naim Hasan"}
            title={"Founder & CEO"}
            email={"naim.hassan@gmail.com"}
          />

          <ContactTeamCard
            src={Team2}
            name={"Naim Hasan"}
            title={"Founder & CEO"}
            email={"naim.hassan@gmail.com"}
          />

          <ContactTeamCard
            src={Team3}
            name={"Naim Hasan"}
            title={"Founder & CEO"}
            email={"naim.hassan@gmail.com"}
          />
        </div>
      </Section>
    </div>
  );
};

export default Contact;
