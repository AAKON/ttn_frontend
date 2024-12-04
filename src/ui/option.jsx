import Image from "next/image";
import image from "@/assets/option.svg";

const Option = ({ index, item }) => {
  const { title, img } = item;
  return (
    <div className="flex items-center gap-x-4">
      <Image
        src={img ? img : image}
        alt="image"
        className={` ${index === 0 ? "w-[64px]" : "w-[56px]"}`}
      />
      <h4
        className={`leading-normal ${
          index === 0 ? "text-gray-900 text-[30px]" : "text-gray-700 text-2xl"
        }`}
      >
        {title}
      </h4>
    </div>
  );
};

export default Option;
