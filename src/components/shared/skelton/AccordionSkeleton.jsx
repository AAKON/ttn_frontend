import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function AccordionSkeleton(props) {
  return (
    <>
      <Card className="min-w-[400] max-w-[336px]">
        <CardHeader className="grid grid-cols-1 py-5 px-6 h-[76px]">
          <div className="flex items-center justify-between gap-3 pb-[15px]">
            <Skeleton className="w-12 h-8 rounded-none" />
            <Skeleton className="h-8 w-[120px] rounded-none" />
          </div>
          <Skeleton className="h-[1px] w-full rounded-none" />
        </CardHeader>
        <CardContent className="py-5 px-6 h-[112px]">
          <div className="grid grid-cols-1 space-y-2 border-b border-b-gray-200 pb-5">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
        <CardContent className="py-5 px-6 h-[94px] border-b border-b-gray-200">
          <div className="grid grid-cols-1 ">
            <Skeleton className="h-[52px] w-full" />
          </div>
        </CardContent>
        <CardContent className="py-5 px-6 h-[94px] border-b border-b-gray-200">
          <div className="grid grid-cols-1 ">
            <Skeleton className="h-[52px] w-full" />
          </div>
        </CardContent>
        <CardContent className="py-5 px-6 h-[94px] border-b border-b-gray-200">
          <div className="grid grid-cols-1 ">
            <Skeleton className="h-[52px] w-full" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default AccordionSkeleton;
