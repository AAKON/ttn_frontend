import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";

function DecissionMakerSkeleton(props) {
    return (
        <div className="grid grid-cols-2 gap-6 my-8">
            {[1, 2].map((item) => (
                <div key={item}>
                    <Skeleton className="h-7 w-full"/>
                    <Skeleton className="h-5 w-5/6 my-5"/>
                    <Skeleton className="h-5 w-1/2 mb-3 "/>
                    <Skeleton className="h-4 w-5/6 mb-2 "/>
                    <Skeleton className="h-4 w-5/6 "/>
                </div>
            ))}
        </div>
    );
}

export default DecissionMakerSkeleton;