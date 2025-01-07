import Image from "next/image";
import image from "@/assets/option.svg";

const Option = ({ index, item }) => {
  const { title, img } = item;
  return (
    <div className="Partner_Benefits flex items-center gap-x-4">
      <div
        className={`rounded-full overflow-hidden ${
          index === 0 ? "size-[44px] md:size-[56px]" : "size-[44px] md:size-[48px]"
        }`}
      >
        <Image
          src={img ? img : image}
          alt="image"
          className={`rounded-full p-0.5 ${index === 0 ? "w-14" : "w-11"}`}
          width={index === 0 ? 52 : 42}
          height={index === 0 ? 52 : 42}
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
