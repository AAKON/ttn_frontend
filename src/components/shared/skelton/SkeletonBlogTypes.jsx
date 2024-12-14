import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

export default function SkeletonBlogTypes() {
    return (
        <Card className="min-w-[400] max-w-[336px]">
            {[1, 2, 3, 4].map((item) => (
                <CardContent key={item} className="py-5 px-6 h-[112px]">
                    <div className="grid grid-cols-1 space-y-2 border-b border-b-gray-200 pb-5">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
            ))}
        </Card>
    );
}
