"use client";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Grid } from '@splidejs/splide-extension-grid';
import "@/styles/businessSlider.css";
import {Section, SectionHeading} from "@/shared";

import BusinessAreaCard from "./business-area-card";
import washing from "../../assets/Washing.svg";
import HumanResourceService from "../../assets/HumanResourceService.svg";
import Cap from "../../assets/cap.svg";
import Stocklot from "../../assets/Stocklot.svg";
import Outwear from "../../assets/Outwear.svg";
import Machineries from "../../assets/Machineries.svg";
import NewsPublication from "../../assets/News&Publication.svg";
import Sweater from "../../assets/Sweater.svg";
import Woven from "../../assets/Woven.svg";
import MediaMarketing from "../../assets/Media&Marketing.svg";
import Yarn from "../../assets/Yarn.svg";
import DyesChemical from "../../assets/Dyes&Chemical.svg";
import OnlineSourcing from "../../assets/OnlineSourcing.svg";
import Printing from "../../assets/Printing.svg";
import Knit from "../../assets/Knit.svg";
import Fabric from "../../assets/Fabric.svg";
import Denim from "../../assets/Denim.svg";
import Composite from "../../assets/Composite.svg";

const BusinessArea = () => {
    const allcard = [
        {
            title: "Washing",
            image: washing,
        },
        {
            title: "Human Resource Service",
            image: HumanResourceService,
        },
        {
            title: "Cap",
            image: Cap,
        },
        {
            title: "Stocklot",
            image: Stocklot,
        },
        {
            title: "Outwear",
            image: Outwear,
        },
        {
            title: "Machineries",
            image: Machineries,
        },
        {
            title: "News & Publication",
            image: NewsPublication,
        },
        {
            title: "Sweater",
            image: Sweater,
        },
        {
            title: "Woven",
            image: Woven,
        },
        {
            title: "Media & Marketing",
            image: MediaMarketing,
        },
        {
            title: "Yarn",
            image: Yarn,
        },
        {
            title: "Dyes & Chemical",
            image: DyesChemical,
        },
        {
            title: "Online Sourcing",
            image: OnlineSourcing,
        },
        {
            title: "Printing",
            image: Printing,
        },
        {
            title: "Knit",
            image: Knit,
        },
        {
            title: "Fabric",
            image: Fabric,
        },
        {
            title: "Denim",
            image: Denim,
        },
        {
            title: "Composite",
            image: Composite,
        },
    ];
    const options = {
        pagination: false,
        arrows: true,
        perPage: 1,
        breakpoints: {
            640: {
                perPage: 1,
                arrows: false,
            },
        },
    };
    return (
        <Section>
            {/* heading */}
            <SectionHeading heading={"Business Area"} description={"Explore Our Extensive Range of Textile & Apparel Products &  Services."} />
            {/* slider */}
            <div className="relative mt-12">
                <Splide
                    className="splider2"
                    options={options}
                >
                    <SplideSlide>
                        <div className="grid grid-cols-3 lg:grid-cols-9 gap-4 lg:gap-7 md:px-10 lg:px-[91px]">
                            {allcard?.map((item, index) => (
                                <BusinessAreaCard key={index} item={item} />
                            ))}
                        </div>
                    </SplideSlide>
                    <SplideSlide>
                        <div className="grid grid-cols-3 lg:grid-cols-9 gap-4 lg:gap-7 md:px-10 lg:px-[91px]">
                            {allcard?.map((item, index) => (
                                <BusinessAreaCard key={index} item={item} />
                            ))}
                        </div>
                    </SplideSlide>
                </Splide>
            </div>
        </Section>
    );
};

export default BusinessArea;
