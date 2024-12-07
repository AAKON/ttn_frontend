"use client";
import { useState } from "react";

const FileUploadPreview = ({ onImageChange }) => {
    const [image, setImage] = useState(null); // For preview

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
        <div className="flex flex-col">
            <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById("fileInput").click()}
                className="size-[96px] border border-gray-200 rounded-full flex items-center justify-center bg-gray-50 cursor-pointer"
            >
                {image ? (
                    <img
                        src={image}
                        alt="Preview"
                        className="w-full h-full rounded-full object-cover"
                    />
                ) : (
                    <span className="text-gray-400 text-[10px]">Drop or click</span>
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

export default FileUploadPreview;
