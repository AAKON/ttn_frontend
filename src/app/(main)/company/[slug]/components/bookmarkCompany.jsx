"use client";
import React, { useState } from "react";
import { BookmarkIcon } from "@/icons";
import Button from "@/components/shared/button";
import { delFavsCompanyFaq } from "@/services/company";
import { useToast } from "@/hooks/use-toast";

function BookmarkCompany({ slug, is_favorite: initialFavorite }) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  const handleAddFavourite = async (slug) => {
    setIsAdding(true);
    try {
      setIsFavorite((prev) => !prev);
      await delFavsCompanyFaq(slug, toast);
    } catch (err) {
      setError(err.message);
      setIsFavorite((prev) => !prev);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex gap-1">
      <Button
          secondary={!isFavorite}
          className={`${isFavorite ? 'border-brand-600' : 'border-brand-300'} lg:text-[16px] text-[14px] !font-semibold lg:!h-[48px] h-9`}
          disabled={isAdding}
          onClick={() => handleAddFavourite(slug)}
      >
        <BookmarkIcon stroke={isFavorite ? '#ffffff' : '#f7931e'} />
      </Button>
    </div>
  );
}

export default BookmarkCompany;
