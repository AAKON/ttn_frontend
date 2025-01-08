"use client";

import React, { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import TagsList from "@/app/(main)/company/[slug]/components/tags-list";

function TagsView({btypes}) {

    const tagList = btypes && btypes.length > 0 ? btypes.map((btype) => btype.name) : [];
    // Display first 4 tags initially
    const initialTags = tagList.slice(0, 4);
    const remainingTags = tagList.slice(4);

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return (
        <div className="flex flex-wrap gap-2">
            {/* Display the first 4 tags */}
            <TagsList initialTags={initialTags} />

            {/* Display the count badge if there are remaining tags */}
            {remainingTags.length > 0 && (
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger className="px-2 !py-[1px] border border-gray-300 !bg-transparent rounded-lg cursor-pointer">
                        <span className="text-sm text-gray-400">
                            +{remainingTags.length}
                        </span>
                    </PopoverTrigger>
                    <PopoverContent className="p-4">
                        <div className="flex flex-wrap gap-2">
                            {remainingTags.map((tag, index) => (
                                <span key={index} className="px-2 py-[1px] text-sm font-semibold border border-gray-300 bg-transparent text-gray-400 leading-[21px] rounded-lg">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            )}
        </div>
    );
}

export default TagsView;
