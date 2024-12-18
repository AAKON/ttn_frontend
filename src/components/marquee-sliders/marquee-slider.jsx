
import Marquee from "react-fast-marquee";
import Image from "next/image";
import Link from "next/link";

const MarqueeSlider = ({slideItems, className="mr-20", ...props}) => {
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
              <Link href={item?.link ? item?.link : '#'} key={item?.id} className={`cursor-pointer ${className}`} {...props}>
                <Image width={148} height={148} src={item?.image ? item?.image : ''} className="object-contain" alt={"company image"}/>
              </Link>
          ))}
        </Marquee>
      </>
  );
};

export default MarqueeSlider;
