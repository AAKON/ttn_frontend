import Image from "next/image";

const BusinessAreaCard = ({ item }) => {
  const { name, image } = item;
  return (
    <div className="justify-center flex text-center flex-col items-center gap-y-1 rounded-[9px] p-2 pb-8 border-2 relative hover:border-brand-200 cursor-pointer">
      <Image src={image} alt="image" width={53} height={53} className="max-w-fit" />
      <h5 className="font-normal text-gray-600 leading-3 text-[9px] capitalize tracking-normal absolute bottom-5">
        {name}
      </h5>
    </div>
  );
};

export default BusinessAreaCard;
