import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { X } from "lucide-react";

const TagsInputDropdown = ({ options, value = [], onChange }) => {
    const [selectedTags, setSelectedTags] = useState(value);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const addTag = (selectedValue) => {
        if (!selectedTags.find((tag) => tag.value === selectedValue.value)) {
            const newTags = [...selectedTags, selectedValue];
            setSelectedTags(newTags);
            onChange(newTags);
        }
    };

    const removeTag = (index) => {
        const newTags = selectedTags.filter((_, i) => i !== index);
        setSelectedTags(newTags);
        onChange(newTags);
    };

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    className={`flex flex-wrap items-center gap-1 px-2 py-1 border rounded-md border-gray-300 bg-white cursor-text`}
                    tabIndex={0}
                >
                    {selectedTags.map((tag, index) => (
                        <Badge
                            key={index}
                            className="flex items-center gap-1 px-2 py-1 text-sm font-normal bg-blue-100 text-blue-800"
                        >
                            {tag.label}
                            <X
                                className="h-4 w-4 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent dropdown from closing
                                    removeTag(index);
                                }}
                            />
                        </Badge>
                    ))}

                    {/* Input for filtering */}
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Add tags..."
                        className="flex-1 border-none outline-none focus:ring-0 text-sm text-gray-800"
                    />
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="max-h-60 overflow-y-auto">
                {filteredOptions.map((option) => (
                    <DropdownMenuItem
                        key={option.value}
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => {
                            addTag(option);
                            setSearchTerm(""); // Clear search term
                        }}
                    >
                        {option.label}
                        {selectedTags.find((tag) => tag.value === option.value) && (
                            <span className="text-sm text-gray-400">✔</span>
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default TagsInputDropdown;
