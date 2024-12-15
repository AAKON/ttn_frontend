import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";

function ProductSkeleton(props) {
    return (
        <div className="flex gap-6 my-8">
            {[1, 2, 3, 4].map((item) => (
                <div key={item} className="min-w-[215px]">
                    <Skeleton className="h-32 w-full mb-4"/>
                    <Skeleton className="h-6 w-full mb-4"/>
                    <Skeleton className="h-6 w-3/4 "/>
                </div>
            ))}
        </div>
    );
}

export default ProductSkeleton;