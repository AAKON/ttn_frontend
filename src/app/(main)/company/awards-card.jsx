import Image from "next/image"

const AwardsCard = ({ cardData }) => {
  return (
    <div className="p-3 rounded-2xl border border-gray-100">
      <div className="rounded-[6px] overflow-hidden h-[150px]">
        <Image src={cardData.image} alt='image' className='h-full w-full object-cover' />
      </div>
      <div className="pt-4 text-center">
        <h3 className="text-base font-semibold text-gray-900 pb-2">
          {cardData.title}
        </h3>
        <p className="text-sm text-gray-500">{cardData.description}</p>
      </div>
    </div>
  );
};

export default AwardsCard;
