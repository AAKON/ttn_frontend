import React from "react";
import {Container} from "@/shared";
import ContactForm from "./_contact-form";
import ContactTeamCard from "./_contact-team-card";
import Team1 from "@/assets/team1.jpg";
import Team2 from "@/assets/team2.jpg";
import Team3 from "@/assets/team3.jpg";
import {Email, Phone, Location} from "@/icons";
import ContactUsForm from "./_contact-us-form";

const Contact = () => {
    return (<div>
        <section className="bg-gray-50 ">
            <Container>
                {/* Heading part */}
                <h1 className="font-semibold text-[28px] tracking-[-2%] leading-tight md:text-[48px] text-center text-gray-900 pt-[70px] ">
                    We’d love to hear from you
                </h1>
                {/* sub titel part */}
                <p className="text-sm md:text-[20px] leading-tight text-center text-gray-600 mt-2 md:pt-4 lg:pt-[30px]">
                    Our friendly team is always here to chat.
                </p>

                {/* Office Information section */}
                <div
                    className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8 lg:mt-[96px] pb-20">
                    <div className="flex gap-x-2">
                        <Email/>
                        <div className="pl-[10px]">
                            <p className="text-gray-500 pt-6 md:pt-0">Email</p>
                            <span className="font-semibold text-base text-gray-700">
                              info@thetexti lenetwork.com
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-x-2">
                        <Location/>
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
                        <Phone/>
                        <div className="pl-[10px]">
                            <p className="text-gray-500 pt-6 md:pt-0">Phone</p>
                            <span className="font-semibold text-base text-gray-700">
                              +88017835252434 (WhatsApp)
                            </span>
                        </div>
                    </div>
                </div>
            </Container>
            {/* Office Information section */}

            {/* Contact Section */}
            <div className="bg-white pb-20">
                <Container>
                    <div className="md:pt-10 lg:pt-[120px] md:pb-10 lg:pb-[60px]">
                        <h2 className="font-semibold text-2xl md:text-4xl leading-normal text-gray-900 text-center">
                            Get in touch
                        </h2>
                        <p className="text-sm leading-normal md:text-xl text-gray-500 text-center pt-2 md:pt-3 lg:pt-5">
                            We’d love to hear from you. Please fill out this form.
                        </p>
                    </div>
                    {/*<ContactForm/>*/}
                    <ContactUsForm/>
                </Container>
            </div>
            {/* Contact Section */}

            <div className="bg-gray-50">
                <Container>
                    <div className="mt-20">
                        <h1 className="font-semibold text-md text-gray-900 text-center">
                            Our Leadership Team
                        </h1>
                    </div>

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
                </Container>
            </div>
        </section>
    </div>);
};

export default Contact;
