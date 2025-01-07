"use client";

import React, { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {X} from "lucide-react";

const DropDownTags = ({ value = [], onChange, options }) => {

    const [inputValue, setInputValue] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef();
    const handleAddTag = (tag) => {
        if (!value.includes(tag.value)) {
            onChange([...value, tag.value]); // Only emit `value`
        }
        setInputValue("");
        setIsDropdownOpen(false);
    };
    const handleRemoveTag = (tagValue) => {
        onChange(value.filter((v) => v !== tagValue));
    };
    const filteredOptions = options.filter(
        (opt) =>
            !value.includes(opt.value) &&
            opt.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    // Close dropdown when clicking outside the component
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* Input Field with Selected Tags */}
            <div className="flex flex-wrap px-2 items-center gap-2 border rounded-md bg-gray-50 border-gray-200">
                {value.map((tagValue) => {
                    const tag = options.find((opt) => opt.value === tagValue);
                    return (
                    <Badge
                        key={tag?.value ? tag?.value : tagValue?.value}
                        className="flex h-7 items-center gap-2 text-xs px-2 py-1 rounded-sm bg-transparent border border-gray-200 text-gray-900 font-normal"
                    >
                        {tag?.label ? tag?.label : tagValue?.label}
                        <X
                            className="ml-2 h-4 w-4 cursor-pointer"
                            onClick={() => handleRemoveTag(tagValue)}
                        />
                    </Badge>
                    );
                })}
                <input
                    type="text"
                    placeholder="Add new..."
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setIsDropdownOpen(true);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    className="flex-1 h-[26.4px] text-sm my-1 bg-gray-50 border-none outline-0 ring-0 focus:ring-0 focus-visible:ring-0"
                />
            </div>

            {/* Dropdown */}
            {isDropdownOpen && filteredOptions.length > 0 && (
                <ScrollArea className="z-10 mt-1 h-40 w-full bg-white border border-gray-300 rounded shadow-md">
                    <ul className="pt-1.5">
                        {filteredOptions.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleAddTag(option)}
                                className="px-4 py-2 text-sm cursor-pointer hover:bg-orange-50"
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            )}
        </div>
    );
};

export default DropDownTags;
