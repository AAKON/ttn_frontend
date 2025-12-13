import Image from "next/image";
import ShowCase1 from "@/assets/ShowCase1.png";
const ProductShowCaseCard = ({ product }) => {
  const description = "Wholesale custom OEM retro checkerboard shoes slip on";

  return (
    <div>
      <div className="image-holder h-[140px] overflow-hidden rounded-2xl flex items-center justify-center">
        <Image
          src={product?.image_url ? product?.image_url : ShowCase1}
          alt={product?.name}
          className=""
          layout="responsive"
          width={16}
          height={9}
        />
      </div>

      <h4 className="text-sm font-semibold text-brand-600 mt-5 capitalize line-clamp-1">
        {product?.name}
      </h4>

      <p className="text-base text-gray-900 font-normal mt-2 line-clamp-3">
        {description}
      </p>

      <div className="mt-2">
        <h4 className="text-base text-gray-900 font-semibold">
          ${product?.price_range}
          {/*<span className="text-gray-400">/pair</span>*/}
        </h4>
        <h4 className="text-base text-gray-900 font-semibold">
          {product?.moq}
          <span className="text-gray-400 text-sm">(Min. Order)</span>
        </h4>
      </div>
    </div>
  );
};

export default ProductShowCaseCard;
