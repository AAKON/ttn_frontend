'use client'
import Marquee from "react-fast-marquee";
import Image from "next/image";
import Link from "next/link";

const CertificateSlider = ({ slideItems, className = "mr-20", ...props }) => {
    return (
        <>
            <Marquee
                autoFill={true}
                gradientColor="white"
                gradientWidth={200}
                gradient={true}
                pauseOnHover={true}
            >
                {slideItems?.map((item) => (
                    <div
                        key={item?.id}
                        className={`size-[100px] flex items-center justify-center bg-white border border-gray-300 ${(className =
                            "mr-[85px]")}`}
                        {...props}
                    >
                        <Image
                            width={100}
                            height={100}
                            src={item?.image_url ? item?.image_url : ""}
                            className="w-full h-full object-contain"
                            alt={item?.name}
                        />
                    </div>
                ))}
            </Marquee>
        </>
    );
};

export default CertificateSlider;
