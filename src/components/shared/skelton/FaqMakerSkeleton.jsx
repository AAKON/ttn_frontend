import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";

function FaqSkeleton(props) {
    return (
        <div className="flex flex-col gap-y-8">
            {[1, 2].map((item) => (
                <div key={item}>
                    <Skeleton className="h-7 w-2/6 "/>
                    <Skeleton className="h-5 w-5/6 my-5"/>
                    <Skeleton className="h-4 w-10/12 "/>
                </div>
            ))}
        </div>
    );
}

export default FaqSkeleton;