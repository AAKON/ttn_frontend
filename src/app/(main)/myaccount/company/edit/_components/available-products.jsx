"use client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const AvailableProducts = () => {
  let data = [
    Array.from({ length: 7 }, () => ({ name: "cap" })),
    Array.from({ length: 6 }, () => ({ name: "Yarn" })),
    Array.from({ length: 7 }, () => ({ name: "T-shirt" })),
    Array.from({ length: 8 }, () => ({ name: "Jacket" })),
    Array.from({ length: 9 }, () => ({ name: "Women" })),
    Array.from({ length: 5 }, () => ({ name: "Ladies" })),
    Array.from({ length: 6 }, () => ({ name: "Sweater" })),
    Array.from({ length: 3 }, () => ({ name: "Pant" })),
  ].flat();
  // product part end

  const sliderOptions = {
    perPage: 4,
    perMove: 1,
    gap: 20,
    arrows: true,
    pagination: false,
    breakpoints: {
      1280: {
        perPage: 3,
      },
      768: {
        perPage: 2,
        arrows: false,
      },
      414: {
        perPage: 1,
        arrows: false,
      },
    },
  };

  return (
    <div className="mt-4">
      <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 font-medium">
        Available Products
      </label>
      <div className="mt-3 relative before:absolute before:content-[''] before:h-full before:w-[6%] before:bg-gradient-to-r from-white to-transparent before:top-0 before:left-0 before:z-[3] after:absolute after:content-[''] after:h-full after:w-[6%] after:bg-gradient-to-l  after:top-0 after:right-0">
        <Splide options={sliderOptions}>
          {data.map((product, idx) => {
            return (
              <SplideSlide key={idx}>
                <AvailableProductsCard product={product} />
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>
  );
};

// Available Products Card
import Image from "next/image";
import ShowCase1 from "@/assets/ShowCase1.png";
import Button from "@/components/shared/button";
import { DeleteIcon, EditIcon } from "@/icons";
import ProductEditModal from "./product-edit-modal";
function AvailableProductsCard({ product }) {
  const description = "Wholesale custom OEM retro checkerboard shoes slip on";

  return (
    <div>
      <Image src={ShowCase1} alt="ShowCase1" className="w-[100%]" />

      <h4 className="text-sm font-semibold text-brand-600 mt-5 capitalize">
        {product.name}
      </h4>

      <p className="text-base text-gray-900 font-normal mt-2">{description}</p>

      <div className="mt-2">
        <p className="text-xl text-gray-900 font-semibold">$0.31-11.00</p>
        <p className="text-sm text-gray-500">Min. order: 100 pieces</p>
      </div>
      <div className="flex gap-2 mt-2">
        <Button secondary type="button" className="flex-1 text-[#F04438]">
          Delete
          <DeleteIcon stroke="#F04438" />
        </Button>
        <ProductEditModal />
      </div>
    </div>
  );
}
export { AvailableProductsCard };
export default AvailableProducts;
