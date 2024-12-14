"use client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import React, { useEffect, useState } from 'react';

const AvailableProducts = ({slug, preData}) => {

    const [productData, setProductData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const data = [];

    useEffect(() => {
        const fetchProductData = async () => {

            try {
                const response = await getCompanyProducts(slug);

                console.log(response, 'get');

                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }

                const data = await response.json();
                setProductData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, []);

    console.log(productData, 'get productData')

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
                <AvailableProductsCard product={product} slug={slug} preData={preData} />
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
import ProductEditModal from "@/app/(main)/myaccount/company/edit/[slug]/_components/product-edit-modal";
import {getSSToken} from "@/utils/getSSToken";
import {getCompanyProducts} from "@/services/product";
function AvailableProductsCard({ product, slug, preData }) {
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
        {/*<Button secondary type="button">*/}
        {/*  <EditIcon stroke="#667085" />*/}
        {/*</Button>*/}
        <ProductEditModal slug={slug} preData={preData} />
      </div>
    </div>
  );
}
export { AvailableProductsCard };
export default AvailableProducts;
