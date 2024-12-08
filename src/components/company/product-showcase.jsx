"use client"
import { useState } from 'react'
import ProductShowCaseCard from './product-showcase-card'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const ProductShowCase = () => {

    // product part start 
    const categoryList = ["Cap", "Yarn", "T-shirt", "Jacket", "Women", "Ladies", "Sweater", "Pant", "Cap", "Pant", "Yarn"]

    const listArr = categoryList.map(el => el).filter((el, idx, arr) => (arr.indexOf(el) === idx))

    let [active, setactive] = useState(listArr[0])

    let data = [
        Array.from({ length: 7 }, () => ({ name: "cap" })),
        Array.from({ length: 6 }, () => ({ name: "Yarn" })),
        Array.from({ length: 7 }, () => ({ name: "T-shirt" })),
        Array.from({ length: 8 }, () => ({ name: "Jacket" })),
        Array.from({ length: 9 }, () => ({ name: "Women" })),
        Array.from({ length: 5 }, () => ({ name: "Ladies" })),
        Array.from({ length: 6 }, () => ({ name: "Sweater" })),
        Array.from({ length: 3 }, () => ({ name: "Pant" })),
    ].flat()
    // product part end


    const handleClick = (el) => {
        setactive(el)
    }

    const tabsOptions = {
        perPage: 7,
        perMove: 1,
        gap: 0,
        arrows: false,
        pagination: false,
        focus  : 'center',
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
    }

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


    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-900">Products Showcase</h2>

            <ul className='px-3 mt-4 rounded-[12px] border'>
                <Splide options={tabsOptions}>
                {
                    listArr.map((el, idx) => (
                            <SplideSlide key={idx} onClick={() => handleClick(el)} className={`text-base font-semibold text-gray-600 w-[70px] text-center pt-4 pb-3 box-border cursor-pointer capitalize ${active == el ? "border-b-2 border-brand-600  text-gray-900" : false}`}>
                                    {el}
                            </SplideSlide>
                        )
                    )
                }
                </Splide>
            </ul>
            <div
                className="mt-6 relative before:absolute before:content-[''] before:h-full before:w-[6%] before:bg-gradient-to-r from-white to-transparent before:top-0 before:left-0 before:z-[3] after:absolute after:content-[''] after:h-full after:w-[6%] after:bg-gradient-to-l  after:top-0 after:right-0">
                <Splide options={sliderOptions}>
                    {
                        data.map((product, idx) => {
                            if (active.toLowerCase() === product.name.toLowerCase()) {
                                return (
                                    <SplideSlide key={idx}>
                                        <ProductShowCaseCard product={product} />
                                    </SplideSlide>
                                )
                            }
                        })
                    }
                </Splide>
            </div>
        </div>
    )
}

export default ProductShowCase