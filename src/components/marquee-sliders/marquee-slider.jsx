
import Marquee from "react-fast-marquee";
import Image from "next/image";

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
          {slideItems?.map((item, index) => (
              <div key={index} className={`cursor-pointer ${className}`} {...props}>
                <Image src={item} className="" alt={"company image"}/>
              </div>
          ))}
        </Marquee>
      </>
  );
};

export default MarqueeSlider;
