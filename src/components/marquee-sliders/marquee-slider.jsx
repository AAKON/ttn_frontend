import Marquee from "react-fast-marquee";
import Image from "next/image";
import Link from "next/link";

const MarqueeSlider = ({ slideItems, className = "mr-20", ...props }) => {
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
          <Link
            href={item?.link ? item?.link : "#"}
            key={item?.id}
            className={`size-[100px] flex items-center justify-center bg-white border border-gray-300 ${(className =
              "mr-[85px]")}`}
            {...props}
          >
            <Image
              width={100}
              height={100}
              src={item?.image ? item?.image : ""}
              className="w-full h-full object-contain"
              alt={"company image"}
            />
          </Link>
        ))}
      </Marquee>
    </>
  );
};

export default MarqueeSlider;
