import React from 'react';
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonBlogData() {
    return (
        <div className="pt-8 flex flex-col gap-4">
            {[1, 2, 3, 4].map((item) => (
                <Card key={item} className="min-w-[400]">
                    <CardHeader className="grid grid-cols-[1fr_36px] gap-2">
                        <div className="flex items-center gap-3">
                            <Skeleton className="size-[64px] rounded-full"/>
                            <Skeleton className="h-4 w-[200px]"/>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]"/>
                            <Skeleton className="h-4 w-[250px]"/>
                            <Skeleton className="h-4 w-[240px]"/>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
