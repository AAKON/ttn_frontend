
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
          {slideItems?.map((item) => (
              <div key={item?.id} className={`cursor-pointer ${className}`} {...props}>
                <Image width={148} height={48} src={item?.image_url} className="object-contain" alt={"company image"}/>
              </div>
          ))}
        </Marquee>
      </>
  );
};

export default MarqueeSlider;
