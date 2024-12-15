'use client'
import React, {useEffect, useState} from 'react';
import ProductsForm from "@/app/(main)/myaccount/company/edit/[slug]/_components/products-form";
import AvailableProducts from "@/app/(main)/myaccount/company/edit/[slug]/_components/available-products";
import ContactWithBusinessOwner
    from "@/app/(main)/myaccount/company/edit/[slug]/_components/contact-with-business-owner";
import EditTabs from "@/app/(main)/myaccount/company/edit/[slug]/_components/tabs";
import {getCompanyProducts} from "@/services/product";
import {Skeleton} from "@/components/ui/skeleton";
import ProductSkeleton from "@/components/shared/skelton/productSkeleton";

function CompanyForms({slug, preData}) {


    const [productData, setProductData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    const fetchProductData = async () => {
        try {
            setLoading(true); // Optional: Show loading when refetching
            const response = await getCompanyProducts(slug);
            const data = response?.products;
            setProductData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [slug]);

    return (
        <div
            className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_370px] xl:gap-x-12 xl:gap-y-8">
            <div className="bg-white border border-gray-100 p-6 rounded-2xl">
                <ProductsForm
                    slug={slug}
                    preData={preData}
                    onSuccess={fetchProductData}
                />
                {loading ? (
                        <ProductSkeleton />
                ) : (
                <AvailableProducts
                    slug={slug}
                    preData={preData}
                    productData={productData}
                    onDeleteSuccess={fetchProductData}
                />)}
            </div>
            <div>
                <ContactWithBusinessOwner/>
            </div>
            <div>
                <EditTabs slug={slug}/>
            </div>
        </div>
    );
}

export default CompanyForms;