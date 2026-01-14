import React from 'react';
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"

function SourcingCardSkeleton(props) {
    return (
        <div className="mt-8">
            <div className="grid gap-3 lg:gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                <Card className="w-full" key={item}>
                    <CardHeader className="grid grid-cols-[1fr_36px] gap-2">
                        <div className="flex items-center gap-3">
                            <Skeleton className="size-[64px] rounded-full"/>
                            <div className="flex flex-col gap-y-3 grow">
                                <Skeleton className="h-4 w-3/4"/>
                                <Skeleton className="h-5 w-full"/>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-11/12"/>
                            <Skeleton className="h-4 w-full "/>
                            <Skeleton className="h-4 w-2/3 "/>
                            <Skeleton className="h-4 w-11/12 "/>
                        </div>
                        <div className="flex items-center gap-3 justify-between mt-6">
                            <Skeleton className="h-8 w-2/6 rounded-3xl"/>
                            <Skeleton className="h-8 w-1/2 rounded-3xl"/>
                        </div>
                    </CardContent>
                </Card>
                ))}
            </div>
        </div>
);
}

export default SourcingCardSkeleton;