// components/TagsInput.jsx
"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const TagsInput = ({ value, onChange }) => {
  const [tags, setTags] = useState(value || []);

  // Update parent value when tags change
  useEffect(() => {
    onChange(tags);
  }, [tags, onChange]);

  const addTag = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(e.target.value.trim())) {
        setTags([...tags, e.target.value.trim()]);
      }
      e.target.value = "";
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-wrap px-2 py-[2.20px] items-center gap-2 border rounded-md bg-gray-50 border-gray-200">
      {tags.map((tag, index) => (
        <Badge
          key={index}
          className="flex h-7 items-center gap-2 text-sm px-2 py-1 rounded-sm bg-transparent border border-gray-200 text-gray-900 font-normal"
        >
          {tag}
          <X
            className="ml-2 h-4 w-4 cursor-pointer"
            onClick={() => removeTag(index)}
          />
        </Badge>
      ))}
      <Input
        type="text"
        placeholder="Add New"
        onKeyDown={addTag}
        className="flex-1 h-7 my-1.5 bg-gray-50 border-none outline-0 ring-0 focus:ring-0 focus-visible:ring-0"
      />
    </div>
  );
};

export default TagsInput;
