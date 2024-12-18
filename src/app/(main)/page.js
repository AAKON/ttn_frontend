
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
import React, {Fragment} from "react";
import { Section } from "@/shared";

// company Slide items
import compnany1 from "@/assets/company1.jpg";
import compnany2 from "@/assets/company2.jpg";
import compnany3 from "@/assets/company3.jpg";
import compnany4 from "@/assets/company4.jpg";
import ErrorMessage from "@/components/shared/errormessage";
import {getHomeDetails} from "@/services/home";
import {getBlogTTNS} from "@/services/blogs";
const allCompany = [];

export default async function Home() {
    try {
        const blogsPromise =  getBlogTTNS();
        const detailsPromise = getHomeDetails();
        const details = await detailsPromise;

        const recentCompanies = await details?.companies || [];
        const partners = await details?.partners || [];

        console.log(details, 'get detailsPromise')


  return (
      <>
          <Hero/>
          <Counter/>
          <Fragment>
              <SocialSlider/>
          </Fragment>
          <RecentCompany data={recentCompanies}/>
          <BusinessArea />
          <Section className="bg-gray-50">
              <h3 className="pb-8 font-medium text-gray-900 uppercase text-xl text-center">
                  We’ve worked with some great Companies
              </h3>
                <CompanySlider slideItems={partners}/>
          </Section>
          <GlobalSourcing/>
          <GlobalMarket/>
          <Resources blogsPromise={blogsPromise} />
          <GetInTouch/>
      </>
  );

    } catch (error) {
            return (
                <ErrorMessage message={error?.message}/>
            );
        }
}
