import { Skeleton } from "@/components/ui/skeleton"

export function GlobalSkeleton() {
    return (
        <div className="container">
            <div className="flex flex-col gap-8 mt-10 mb-10 md:mt-16 md:mb-14">
                {[1, 2, 3, 4, 5].map((item) => (
                    <div className="space-y-2 w-full" key={item}>
                        <Skeleton className="h-4 w-10/12"/>
                        <Skeleton className="h-4 w-2/3"/>
                        <Skeleton className="h-4 w-11/12"/>
                    </div>
                ))}
            </div>
        </div>
    )
}
