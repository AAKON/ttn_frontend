"use client";
import React from 'react';
import ResourceCard from "@/ui/resource-card";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@/styles/companySlider.css";

function ResourceSlider({homeBlogsData}) {

    const options = {
        type: "loop",
        perPage: 3,
        perMove: 1,
        gap: "1.5rem",
        pagination: false,
        arrows: true,
        drag: true,
        snap: true,
        breakpoints: {
            1300: {
                perPage: 3,
            },
            1024: {
                perPage: 3,
            },
            768: {
                perPage: 2,
                gap: "1rem"
            },
            640: {
                perPage: 1,
            },
        },
    };

    return (
        <Splide className="company-slider" options={options}>
            {homeBlogsData.map((item) => (
                <SplideSlide key={item?.id}>
                    <ResourceCard item={item}/>
                </SplideSlide>
            ))}
        </Splide>
    );
}

export default ResourceSlider;