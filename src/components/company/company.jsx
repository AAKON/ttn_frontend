import { Section } from "../shared";
import Marquee from "react-fast-marquee";
import compnany1 from "@/assets/company1.jpg";
import compnany2 from "@/assets/company2.jpg";
import compnany3 from "@/assets/company3.jpg";
import compnany4 from "@/assets/company4.jpg";
import Image from "next/image";

const Company = () => {
  const allCompany = [compnany1, compnany2, compnany3, compnany4];
  return (
    <Section>
      <div>
        <h3 className="pb-8 font-medium text-gray-900 uppercase text-xl text-center">
          We’ve worked with some great Companies
        </h3>
        {/* all compnay logo  */}
        <div>
          <Marquee
            autoFill={true}
            gradientColor="white"
            gradientWidth={200}
            gradient={true}
            pauseOnHover={true}
          >
            {allCompany?.map((item, index) => (
              <picture key={index}>
                <Image src={item} className="mr-20 cursor-pointer" alt={"company image"} />
              </picture>
            ))}
          </Marquee>
        </div>
      </div>
    </Section>
  );
};

export default Company;
