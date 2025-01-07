import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

export default function SkeletonBlogTypes() {
    return (
        <div className="flex items-center space-x-4 mb-2.5">
            {[1, 2, 3, 4].map((item) => (
                <Skeleton key={item} className="h-8 rounded-xl w-[250px]"/>
            ))}
        </div>
    );
}
