import Image from "next/image";
import Link from "next/link";

const BusinessAreaCard = ({ item }) => {
  const { name, image } = item;
  return (
    <Link
      href={`#`}
      className={`justify-center flex text-center flex-col items-center gap-y-1 rounded-[9px] h-[96px] p-2 ${
        image ? "pb-8" : ""
      } border-2 relative hover:border-brand-200 cursor-pointer`}
    >
      {image && (
        <div className="h-[53px] w-[53px] overflow-hidden flex items-center justify-center">
          <Image
            src={image}
            alt="image"
            width={53}
            height={53}
            className="max-w-fit"
          />
        </div>
      )}
      <h5
        className={`font-normal text-gray-600 leading-3 text-[9px] capitalize tracking-normal line-clamp-2 px-1 ${
          image
            ? "absolute top-[62px]"
            : "static h-full w-full flex items-center justify-center"
        } `}
      >
        {name}
      </h5>
    </Link>
  );
};

export default BusinessAreaCard;
