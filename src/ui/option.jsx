import Image from "next/image";
import image from "@/assets/option.svg";

const Option = ({ index, item }) => {
  const { title, img } = item;
  return (
    <div className="Partner_Benefits flex items-center gap-x-4">
      <div
        className={`rounded-full overflow-hidden ${
          index === 0 ? "size-[28px] md:size-[44px]" : "size-[24px] md:size-[40px]"
        }`}
      >
        <Image
          src={img ? img : image}
          alt="image"
          className="w-8 rounded-full"
          width={index === 0 ? 48 : 44}
          height={index === 0 ? 48 : 44}
        />
      </div>
      <p
        className={`leading-normal ${
          index === 0 ? "text-gray-900 active" : "text-gray-700"
        }`}
      >
        {title}
      </p>
    </div>
  );
};

export default Option;
