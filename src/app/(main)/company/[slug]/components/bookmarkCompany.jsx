"use client";
import React, { useState } from "react";
import { BookmarkIcon } from "@/icons";
import Button from "@/components/shared/button";
import { delFavsCompanyFaq } from "@/services/company";
import { useToast } from "@/hooks/use-toast";

function BookmarkCompany({ slug }) {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  const handleAddFavourite = async (slug) => {
    setIsAdding(true);
    try {
      await delFavsCompanyFaq(slug, toast);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex gap-1">
      <Button
        secondary
        className="border-brand-300 lg:text-[16px] text-[14px] !font-semibold lg:!h-[48px] h-9"
        disabled={isAdding}
        onClick={() => handleAddFavourite(slug)}
      >
        <BookmarkIcon stroke="#f7931e" />
      </Button>
      <Button
        className="border-brand-600 lg:text-[16px] text-[14px] !font-semibold lg:!h-[48px] h-9"
        disabled={isAdding}
        onClick={() => handleAddFavourite(slug)}
      >
        <BookmarkIcon stroke="#ffffff" />
      </Button>
    </div>
  );
}

export default BookmarkCompany;
