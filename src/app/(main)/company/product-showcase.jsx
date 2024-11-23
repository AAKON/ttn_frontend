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
        Array.from({ length: 7 }, () => ({ name: "Pant" })),
    ].flat()
    // product part end


    const handleClick = (el) => {
        setactive(el)
    }


    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-900">Products Showcase</h2>

            <ul className='lg:flex justify-between px-3 mt-4 rounded-[12px] border hidden'>
                {
                    listArr.map((el, idx) => (
                            <li key={idx}
                                onClick={() => handleClick(el)}
                                className={`
                            text-base 
                            font-semibold 
                            text-gray-600 
                            w-[70px] text-center pt-4 pb-3 box-border cursor-pointer capitalize ${active == el ? "border-b-2 border-brand-600  text-gray-900" : false}`}>
                                {el}
                            </li>
                        )
                    )
                }
            </ul>

            {/* responsive part */}
            <ul className='lg:hidden justify-between px-3 mt-4 rounded-[12px] border block'>
                <Splide options={{
                    perPage: 4,
                    perMove: 1,
                    gap: 20,
                    arrows: false
                }}>
                    {
                        listArr.map((el, idx) => (
                                <SplideSlide key={idx}>
                                    <h3 onClick={() => handleClick(el)}
                                        className={`text-base font-semibold text-gray-600 w-[70px] text-center pt-4 pb-3 box-border cursor-pointer capitalize ${active == el ? "border-b-2 border-brand-600  text-gray-900" : false}`}>
                                        {el}
                                    </h3>
                                </SplideSlide>
                            )
                        )
                    }
                </Splide>
            </ul>
            {/* responsive part */}

            <div className="mt-6 relative before:absolute before:content-[''] before:h-full before:w-[6%] before:bg-gradient-to-r from-white to-transparent before:top-0 before:left-0 before:z-[3] after:absolute after:content-[''] after:h-full after:w-[6%] after:bg-gradient-to-l  after:top-0 after:right-0 lg:block hidden">
                <Splide options={{
                    perPage: 4,
                    perMove: 1,
                    gap: 20,
                }}>
                    {
                        data.map((el, idx) => {
                            if (active.toLowerCase() === el.name.toLowerCase()) {
                                return (
                                    <SplideSlide key={idx}>
                                        <ProductShowCaseCard type={el.name} />
                                    </SplideSlide>
                                )
                            }
                        })
                    }
                </Splide>
            </div>


            {/* responsive part */}
            <div className="mt-6 relative before:absolute before:content-[''] before:h-full before:w-[6%] before:bg-gradient-to-r from-white to-transparent before:top-0 before:left-0 before:z-[3] after:absolute after:content-[''] after:h-full after:w-[6%] after:bg-gradient-to-l  after:top-0 after:right-0 lg:hidden block">
                <Splide options={{
                    perPage: 2,
                    perMove: 1,
                    gap: 20,
                    arrows: false
                }}>
                    {
                        data.map((el, idx) => {
                            if (active.toLowerCase() === el.name.toLowerCase()) {
                                return (
                                    <SplideSlide key={idx}>
                                        <ProductShowCaseCard type={el.name} />
                                    </SplideSlide>
                                )
                            }
                        })
                    }
                </Splide>
                {/* responsive part */}
            </div>
        </div>
    )
}

export default ProductShowCase