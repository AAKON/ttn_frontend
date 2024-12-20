"use client";
import { Section } from "@/shared";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@/styles/splider.css";
import slider1 from "@/assets/slide-1.jpg";
import slider2 from "@/assets/slide-2.jpg";
import slider3 from "@/assets/slide-3.jpg";
import Link from "next/link";

const SocialSlider = ({webAds}) => {
  return (
    <Section noDefaultStyle className="social-slider py-8 lg:py-10">
      <Splide
        options={{
          perPage: 3,
          // perMove: 1,
          gap: 30,
          omitEnd: true,
          focus: 0,
          breakpoints: {
            1024: {
              perPage: 2,
            },
            768: {
              perPage: 1,
            },
            640: {
              perPage: 1,
            },
          },
          pagination: true,
          speed: 900,
          drag: true,
          arrows: false,
        }}
      >
          {webAds.map((webAd) => (
                  <SplideSlide key={webAd?.id} className="h-[120px]">
                      <Link className="block" href={webAd?.link ? webAd?.link : '#'}>
                          <div className="h-[120px] rounded-xl overflow-hidden">
                              <Image
                                  src={webAd?.image ? webAd?.image : slider1}
                                  height={120}
                                  width={445}
                                  className="w-full h-full object-cover"
                                  alt={"image"}
                              />
                          </div>
                      </Link>
                  </SplideSlide>
          ))}
      </Splide>
    </Section>
  );
};

export default SocialSlider;
