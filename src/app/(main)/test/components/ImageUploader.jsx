"use client";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

function Previews(props) {
  const [file, setFile] = useState(null);

  const {
    getRootProps,
    getInputProps,
    isDragActive, // This will indicate if a file is being dragged over the drop zone
  } = useDropzone({
    accept: "image/*", // Accept only image files
    multiple: false, // Disable multiple file selection
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setFile(
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uri to avoid memory leaks, will run on unmount
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  return (
    <div
      {...getRootProps({
        className: `dropzone relative group w-full h-[150px] border-2 rounded-lg overflow-hidden flex justify-center bg-gray-50 cursor-pointer items-center transition-all ${
          isDragActive ? "border-brand-500" : "border-dashed border-gray-200"
        }`,
      })}
    >
      <input {...getInputProps()} />
      {file && (
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={file.preview}
            alt="preview"
            onLoad={() => URL.revokeObjectURL(file.preview)} // Revoke object URL after image is loaded
          />
        </div>
      )}
      <div
        className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center ${
          file ? "bg-black/30" : ""
        }`}
      >
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
        <span
          className={`text-sm text-gray-600 ${
            file ? "text-gray-50" : "text-gray-600"
          }`}
        >
          {file ? "Photo uploaded" : "Drag or click to upload new photo/logo"}
        </span>
      </div>
    </div>
  );
}

export default Previews;
