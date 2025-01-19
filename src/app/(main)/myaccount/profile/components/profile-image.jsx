"use client";
import { EditIcon } from "@/components/icons";
import { useState, useEffect } from "react";

const ProfileImage = ({ onImageChange, initialImage }) => {
  const [image, setImage] = useState(initialImage || null); // For preview

  useEffect(() => {
    // Update the preview if the initial image changes
    setImage(initialImage);
  }, [initialImage]);

  const handleFileProcessing = (selectedFile) => {
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Set Base64 preview
        onImageChange({ preview: reader.result, file: selectedFile }); // Pass both preview and file
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFileProcessing(droppedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) handleFileProcessing(selectedFile);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col">
        <div className="size-[96px] border border-gray-200 rounded-full flex items-center justify-center bg-gray-50 cursor-pointer">
          {image && (
            <img
              src={image}
              alt="Preview"
              className="w-full h-full rounded-full object-cover"
            />
          )}
        </div>
      </div>
      <span
        className="cursor-pointer text-gray-600 flex items-center gap-2 font-bold"
        onClick={() => document.getElementById("fileInput").click()}
      >
        <EditIcon width={20} height={20} stroke="#475467" />
        Change profile picture
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
      </span>
    </div>
  );
};

export default ProfileImage;
