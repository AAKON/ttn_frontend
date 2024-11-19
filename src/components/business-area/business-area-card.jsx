
import Image from "next/image";

const BusinessAreaCard = ({ item }) => {
  const { title, image } = item;
  return (
    <div className=" justify-center flex text-center flex-col items-center gap-y-1 rounded-[9px] p-2 pb-8 border-2  relative">
      <Image src={image} alt="image" className="max-w-fit" />
      <h5 className="font-normal text-gray-600 leading-3 text-[9px] capitalize tracking-normal absolute bottom-5">
        {title}
      </h5>
    </div>
  );
};

export default BusinessAreaCard;
