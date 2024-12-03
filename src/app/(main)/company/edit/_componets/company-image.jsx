"use client";
import { useState } from "react";

const CompanyDragAndDropImage = ({ onImageChange }) => {
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        if (onImageChange) onImageChange(reader.result); // Notify parent component
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`size-[96px] border border-gray-200 rounded-full flex items-center justify-center bg-gray-100 cursor-pointer ${
          isDragging ? "border-brand-600 border-dotted" : "border-gray-200"
        }`}
        onClick={() => document.getElementById("fileInput").click()}
      >
        {image ? (
          <img
            src={image}
            alt="Preview"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-[10px]">
            Drop or click
          </span>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="fileInput"
      />
    </div>
  );
};

export default CompanyDragAndDropImage;
