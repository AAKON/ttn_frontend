"use client";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import React, {useEffect, useState} from 'react';
import {useToast} from "@/hooks/use-toast";

const AvailableProducts = ({slug, productData, preData, onDeleteSuccess}) => {

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
        <div className="max-w-[932px]">
            <div className="mt-4">
                <label
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 font-medium">
                    Available Products
                </label>
                {productData && Array.isArray(productData) && productData.length > 0 && (
                    <div
                        className="mt-3 relative before:absolute before:content-[''] before:h-full before:w-[6%] before:bg-gradient-to-r from-white to-transparent before:top-0 before:left-0 before:z-[3] after:absolute after:content-[''] after:h-full after:w-[6%] after:bg-gradient-to-l  after:top-0 after:right-0">
                        <Splide options={sliderOptions}>
                            {productData?.map((product) => {
                                return (
                                    <SplideSlide key={product?.id}>
                                        <AvailableProductsCard
                                            product={product}
                                            slug={slug} preData={preData}
                                            onDeleteSuccess={onDeleteSuccess} />
                                    </SplideSlide>
                                );
                            })}
                        </Splide>
                    </div>)}
            </div>
        </div>
    );
};

// Available Products Card
import Image from "next/image";
import ShowCase1 from "@/assets/ShowCase1.png";
import Button from "@/components/shared/button";
import {DeleteIcon, EditIcon} from "@/icons";
import ProductEditModal from "@/app/(main)/myaccount/company/edit/[slug]/_components/product-edit-modal";
import {getSSToken} from "@/utils/getSSToken";
import {delCompanyProduct, getCompanyProducts} from "@/services/product";
import ConfirmDeleteDialog from "@/app/(main)/myaccount/company/edit/[slug]/_components/confirmDeleteDialog";

function AvailableProductsCard({product, slug, preData, onDeleteSuccess}) {
    const {toast} = useToast();
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async (id) => {
        setIsDeleting(true);
        try {
            const response = await delCompanyProduct(id, slug, toast);
            if (response) {
                setOpenDialog(false);
                onDeleteSuccess();
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div>
            <Image
                src={product?.image_url ? product?.image_url : ShowCase1}
                alt="ShowCase1"
                className="w-[100%]"
                width="215"
                height="150"
            />
            <h4 className="text-sm font-semibold text-brand-600 mt-5 capitalize">
                {product?.product_category?.name}
            </h4>
            <p className="text-base text-gray-900 font-normal mt-2 line-clamp-3">{product?.name}</p>
            <div className="mt-2">
                <p className="text-xl text-gray-900 font-semibold">{product?.price_range}</p>
                <p className="text-sm text-gray-500">Min. order: 100 pieces</p>
            </div>
            <div className="flex gap-2 mt-2">
                <ConfirmDeleteDialog
                    open={openDialog}
                    setOpen={setOpenDialog}
                    onConfirm={() => handleDelete(product?.id)}
                    isDeleting={isDeleting}
                />
                <ProductEditModal slug={slug} preData={preData}/>
            </div>
        </div>
    );
}

export {AvailableProductsCard};
export default AvailableProducts;
