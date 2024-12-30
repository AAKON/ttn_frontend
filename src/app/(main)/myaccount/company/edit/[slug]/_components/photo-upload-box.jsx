"use client";
import { useState } from "react";

export default function PhotoUploadBox({ photo, setPhoto }) {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  return (
    <div
      className={`group relative w-full h-[150px] bg-gray-50 border-2 border-dashed rounded-lg overflow-hidden flex justify-center items-center ${
        uploadedImage
          ? "border-gray-200 hover:after:contents-[''] after:w-full after:h-full after:rounded-lg after:absolute after:top-0 after:left-0 after:bg-black after:opacity-0 hover:after:opacity-30 after:z-20"
          : "border-gray-200"
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {uploadedImage && (
        <img
          src={uploadedImage}
          alt="Uploaded preview"
          className="object-cover w-full h-full rounded-lg"
        />
      )}
      <label
        htmlFor="photo-upload"
        className={`${
          uploadedImage ? "opacity-0 group-hover:opacity-100 " : ""
        } flex flex-col items-center justify-center text-brand-400 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50`}
      >
        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
          <svg
            width={56}
            height={56}
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x={4} y={4} width={48} height={48} rx={24} fill="#F9A94B" />
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
        <span
          className={`text-sm text-gray-600 ${
            uploadedImage ? "text-white" : "text-gray-600"
          }`}
        >
          Drag or click to upload new photo/logo
        </span>
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
