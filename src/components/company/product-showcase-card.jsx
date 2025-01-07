import Image from "next/image";
import ShowCase1 from "@/assets/ShowCase1.png";
const ProductShowCaseCard = ({ product }) => {
  const description = "Wholesale custom OEM retro checkerboard shoes slip on";

  return (
    <div>
      <div className="image-holder h-[150px] overflow-hidden rounded-2xl">
        <Image
          src={product?.image_url ? product?.image_url : ShowCase1}
          alt={product?.name}
          className="w-full h-full object-cover"
          width={218}
          height={151}
        />
      </div>

      <h4 className="text-sm font-semibold text-brand-600 mt-5 capitalize">
        {product?.name}
      </h4>

      <p className="text-base text-gray-900 font-normal mt-2">{description}</p>

      <div className="mt-2">
        <h4 className="text-base text-gray-900 font-semibold">
          ${product?.price_range}
          {/*<span className="text-gray-400">/pair</span>*/}
        </h4>
        <h4 className="text-base text-gray-900 font-semibold">
            {product?.moq}<span className="text-gray-400 text-sm">(Min. Order)</span>
        </h4>
      </div>
    </div>
  );
};

export default ProductShowCaseCard;
