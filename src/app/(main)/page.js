"use client"
import Hero from "@/components/hero/hero";
import Counter from "@/components/counter/counter";
import SocialSlider from "@/components/social-slider/social-slider";
import BusinessArea from "@/components/business-area/business-area";
import RecentCompany from "@/components/recent-company-add/recent-company";
import CompanySlider from "@/components/marquee-sliders/marquee-slider";
import GlobalSourcing from "@/components/global-sourcing/global-sourcing";
import GlobalMarket from "@/components/global-market/global-market";
import Resources from "@/components/resources/resources";
import GetInTouch from "@/components/get-in-touch/get-in-touch";
import {Fragment} from "react";
import { Section } from "@/shared";

// company Slide items
import compnany1 from "@/assets/company1.jpg";
import compnany2 from "@/assets/company2.jpg";
import compnany3 from "@/assets/company3.jpg";
import compnany4 from "@/assets/company4.jpg";
const allCompany = [compnany1, compnany2, compnany3, compnany4];

export default function Home() {

  return (
      <>
          <Hero/>
          <Counter/>
          <Fragment>
              <SocialSlider/>
          </Fragment>
          <BusinessArea/>
          <RecentCompany/>
          <Section>
              <h3 className="pb-8 font-medium text-gray-900 uppercase text-xl text-center">
                  We’ve worked with some great Companies
              </h3>
                <CompanySlider slideItems={allCompany}/>
          </Section>
          <GlobalSourcing/>
          <GlobalMarket/>
          <Resources/>
          <GetInTouch/>
      </>
  );
}
