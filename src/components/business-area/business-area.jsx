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
import {getBusinessArea} from "@/services/home";
import {useEffect, useState} from "react";
import Button from "@/components/shared/button";
import Link from "next/link";

const BusinessArea = () => {

    const [businessAreas, setBusinessAreas] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getBusinessArea();
                //console.log(data, 'get business data')
                setBusinessAreas(data?.business_categories || []);
            } catch (error) {
                console.error("Failed to fetch business areas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Utility function to split array into chunks of a specified size
    const chunkArray = (array, chunkSize) => {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    };

    // Split the businessAreas array into chunks of 18 items
    const chunkedBusinessAreas = chunkArray(businessAreas, 18);

    //console.log(businessAreas, '===businessAreas')

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

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <Section>
            {/* heading */}
            <SectionHeading heading={"Business Area"}
                            description={"Explore Our Extensive Range of Textile & Apparel Products &  Services."} />
            {/* slider */}
            <div className="relative mt-8 md:mt-12">
                <Splide
                    className="splider2"
                    options={options}
                >
                    {chunkedBusinessAreas.map((chunk, chunkIndex) => (
                    <SplideSlide key={chunkIndex}>
                        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-9 gap-4 lg:gap-7 md:px-10 lg:px-[91px]">
                            {chunk.map((item, index) => (
                                <BusinessAreaCard key={index} item={item} />
                            ))}
                        </div>
                    </SplideSlide>
                    ))}
                </Splide>
            </div>
            <div className="mt-12 flex justify-center">
                <Button icon TagName={Link} href="/myaccount/company/add">Add Business</Button>
            </div>
        </Section>
    );
};

export default BusinessArea;
