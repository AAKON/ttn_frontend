"use client";
import React, { useState } from "react";
import { BookmarkIcon } from "@/icons";
import Button from "@/components/shared/button";
import { toggleFavsSourcingProposal } from "@/services/company";
import { useToast } from "@/hooks/use-toast";
import { HeartIcon } from "lucide-react";

function BookmarkProposal({ id, is_favorite: initialFavorite, heartIcon = false }) {
    const [isFavorite, setIsFavorite] = useState(initialFavorite);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState(null);
    const { toast } = useToast();

    const handleToggleFavourite = async (id) => {
        setIsAdding(true);
        // Optimistic update
        const previousFavorite = isFavorite;
        setIsFavorite(!previousFavorite);

        try {
            const success = await toggleFavsSourcingProposal(id, toast);
            if (!success) {
                // Rollback if failed
                setIsFavorite(previousFavorite);
            }
        } catch (err) {
            setError(err.message);
            // Rollback on error
            setIsFavorite(previousFavorite);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="flex gap-1">
            <Button
                secondary
                className={`${isFavorite ? '!border-brand-100' : ''} lg:text-[16px] text-[14px] !font-semibold lg:!size-[48px] !p-3 text-gray-400`}
                disabled={isAdding}
                onClick={() => handleToggleFavourite(id)}
            >
                {heartIcon ? <HeartIcon stroke={isFavorite ? '#C67618' : '#98A2B3'} fill={isFavorite ? '#ffffff' : 'none'} /> : <BookmarkIcon stroke={isFavorite ? '#C67618' : '#f7931e'} />}
            </Button>
        </div>
    );
}

export default BookmarkProposal;
