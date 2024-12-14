"use client";
import { useState, useEffect } from "react";

const DragDropUploadImage = ({ onImageChange, initialImage }) => {
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
        <div className="group relative w-full h-[150px] bg-gray-50 border-2 border-dashed rounded-lg overflow-hidden flex justify-center items-center">
            <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById("dragInput").click()}
                className={`bg-orange-100 flex items-center justify-center ${
                    image ? "p-8 bg-transparent rounded-lg" : "rounded-full"
                }`}
            >
                {image ? (
                    <img
                        src={image}
                        alt="Preview"
                        className={`w-full object-cover h-[130px] ${image ? "rounded-lg" : "rounded-full"}`}
                    />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                        <svg
                            width={56}
                            height={56}
                            viewBox="0 0 56 56"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect x={4} y={4} width={48} height={48} rx={24} fill="#F9A94B"/>
                            <rect
                                x={4}
                                y={4}
                                width={48}
                                height={48}
                                rx={24}
                                stroke="#FDE9D2"
                                strokeWidth={8}
                            />
                            <path
                                d="M24 32L28 28M28 28L32 32M28 28V37M36 32.7428C37.2215 31.734 38 30.2079 38 28.5C38 25.4624 35.5376 23 32.5 23C32.2815 23 32.0771 22.886 31.9661 22.6977C30.6621 20.4848 28.2544 19 25.5 19C21.3579 19 18 22.3579 18 26.5C18 28.5661 18.8354 30.4371 20.1869 31.7935"
                                stroke="white"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                )}
            </div>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="dragInput"
            />
        </div>
    );
};

export default DragDropUploadImage;
