"use client"
import {Splide, SplideSlide} from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/react-splide/css/core';


const options = {
    type   : "loop",
    drag   : 'free',
    focus  : 'center',
    gap    : "30px",
    arrows : false,
    pagination : false,
    perPage: 3,
    padding: {left: '250px', right: '250px'},
    autoScroll: {
        speed: 1,
    },
    breakpoints: {
        620: {
            gap    : "12px",
            perPage: 1,
            padding: {left: '30px', right: '30px'},
        },
        768: {
            padding: {left: '40px', right: '40px'},
        },
        1080: {
            perPage: 2,
            padding: {left: '100px', right: '100px'},
        },
        1440: {
            perPage: 2,
            padding: {left: '187px', right: '187px'},
        },
    },
};

function ReviewSlide({ direction= "ltr"}) {
    return (
        <Splide options={{...options, direction }} extensions={{ AutoScroll }} className="overflow-y-visible">
            {[1,2,3,4]?.map( (data, i) => (
                <SplideSlide key={i} className="py-2 md:py-3 overflow-y-visible">
                    <div className='border border-gray-300 p-4'>{data}</div>
                </SplideSlide>
            ) )}
        </Splide>
    )
}

const Reviews = () => {

    return (
        <section className="py-[60px] xl:py-[130px] overflow-x-hidden">
            <div className="pt-[44px] md:pt-[65px]">
                <ReviewSlide />
            </div>
        </section>
    )
}

export default Reviews