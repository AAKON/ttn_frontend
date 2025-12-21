import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Button from "@/components/shared/button";
import { MarkerPinIcon, LoveIcon } from "@/icons";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { toggleFavsSourcingProposal } from "@/services/company";

const SourcingCard = ({ sourcing }) => {
  const [isFavorite, setIsFavorite] = useState(sourcing?.is_favorited || false);

  const { toast } = useToast();
  const handleToggleFavorite = async () => {
    const previousFavorite = isFavorite;
    setIsFavorite(!previousFavorite);
    try {
      const success = await toggleFavsSourcingProposal(sourcing?.id, toast);
      if (!success) {
        setIsFavorite(previousFavorite);
      }
    } catch (err) {
      setIsFavorite(previousFavorite);
    }
  };

  return (
    <Card className="flex flex-col justify-between border">
      <div>
        {/* Header with Location and Favorite */}
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center font-medium gap-2 text-gray-900">
                <MarkerPinIcon stroke="#101828" width={20} height={20} />
                <span className="text-sm font-medium">
                  {sourcing?.location?.name || sourcing?.location}
                </span>
              </div>
              <div className="flex items-center text-gray-500 mb-3">
                <span className="font-normal pr-2 border-r border-gray-200">
                  {sourcing?.company_name}
                </span>
                <span className="pl-2">{sourcing?.posted_date}</span>
              </div>
            </div>
            {/* Favorite Button - matching company card style */}
            {isFavorite ? (
              <Button
                className="!border-brand-600 !size-9 !py-[3px] !px-2 !bg-brand-600"
                onClick={handleToggleFavorite}
              >
                <LoveIcon stroke="#ffffff" />
              </Button>
            ) : (
              <Button
                secondary
                className="!border-brand-300 !size-9 !py-[3px] !px-2"
                onClick={handleToggleFavorite}
              >
                <LoveIcon stroke="#C67618" />
              </Button>
            )}
          </div>
        </CardHeader>

        {/* Company Name and Date */}
        <CardContent className="pb-3">
          {/* Title */}
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 line-clamp-2">
            {sourcing?.title}
          </h3>

          {/* Tags/Categories */}
          {sourcing?.tags && Array.isArray(sourcing?.tags) && sourcing?.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {sourcing?.tags.map((tag, index) => (
                <button
                  className="border-0 !h-[24px] !py-[2px] px-2 text-xs font-medium text-gray-500 bg-gray-100 rounded-sm "
                  key={index}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}


          {/* Description */}
          <p className="text-gray-500 text-md font-normal leading-6 line-clamp-3">
            {sourcing?.description}
          </p>
        </CardContent>
      </div>

      {/* Footer Buttons - matching company card style */}
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button
          TagName={Link}
          href={`/sourcing/${sourcing?.slug}`}
          secondary
          prefetch={false}
        >
          Contact Supplier
        </Button>
        <Button
          TagName={Link}
          href={`/sourcing/${sourcing?.id}`}
          type="button"
          primaryOutline
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SourcingCard;
