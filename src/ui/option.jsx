import Image from "next/image";
import image from "@/assets/option.svg";

const Option = ({ index, item }) => {
  const { title, img } = item;
  return (
    <div className="Partner_Benefits flex items-center gap-x-4">
      <div
        className={`rounded-full overflow-hidden ${
          index === 0 ? "size-[28px] md:size-[64px]" : "size-[28px] md:size-[56px]"
        }`}
      >
        <Image
          src={img ? img : image}
          alt="image"
          className="size-full rounded-full"
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
