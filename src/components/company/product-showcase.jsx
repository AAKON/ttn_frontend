"use client";
import { useState } from "react";
import ProductShowCaseCard from "./product-showcase-card";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const ProductShowCase = ({ products }) => {
    const [activeCategory, setActiveCategory] = useState(
        products[0]?.category_name || ""
    );

    const handleClick = (category) => {
        setActiveCategory(category);
    };

    const tabsOptions = {
        perPage: 7,
        perMove: 1,
        gap: 0,
        arrows: false,
        pagination: false,
        focus: "center",
        breakpoints: {
            1024: {
                perPage: 6,
            },
            768: {
                perPage: 5,
            },
            414: {
                perPage: 4,
            },
        },
    };

    const sliderOptions = {
        perPage: 4,
        perMove: 1,
        gap: 20,
        arrows: true,
        pagination: false,
        breakpoints: {
            1280: {
                perPage: 3,
            },
            768: {
                perPage: 2,
                arrows: false,
            },
            414: {
                perPage: 1,
                arrows: false,
            },
        },
    };

    // Filter products by active category
    const activeProducts =
        products.find((category) => category.category_name === activeCategory)
            ?.products || [];

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-900">
                Products Showcase
            </h2>

            {/* Category Tabs */}
            <ul className="px-3 mt-4 rounded-[12px] border">
                <Splide options={tabsOptions}>
                    {products.map((category, index) => (
                        <SplideSlide
                            key={index}
                            onClick={() => handleClick(category.category_name)}
                            className={`text-base font-semibold text-gray-600 w-[70px] text-center pt-4 pb-3 box-border cursor-pointer capitalize ${
                                activeCategory === category.category_name
                                    ? "border-b-2 border-brand-600 text-gray-900"
                                    : ""
                            }`}
                        >
                            {category.category_name}
                        </SplideSlide>
                    ))}
                </Splide>
            </ul>

            {/* Product Slider */}
            <div className="mt-6 relative before:absolute before:content-[''] before:h-full before:w-[6%] before:bg-gradient-to-r from-white to-transparent before:top-0 before:left-0 before:z-[3] after:absolute after:content-[''] after:h-full after:w-[6%] after:bg-gradient-to-l after:top-0 after:right-0">
                <Splide options={sliderOptions}>
                    {activeProducts.map((product, idx) => (
                        <SplideSlide key={idx}>
                            <ProductShowCaseCard product={product} />
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </div>
    );
};

export default ProductShowCase;
