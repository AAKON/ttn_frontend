import React, {useState, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import {useController} from 'react-hook-form';

const DragDropFile = ({
                          name,
                          control,
                          label = '',
                          accept = { 'image/*': [] },
                          maxSize = 5 * 1024 * 1024, // Default: 5MB
                          initialFile = null, // For previewing an initial file
                          defaultValue = null
                      }) => {
    const {
        field: {onChange, value},
        fieldState: {error},
    } = useController({name, control});

    const [preview, setPreview] = useState(initialFile);

    const onDrop = (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
            return false;
        }

        const file = acceptedFiles[0];
        if (file) {
            setPreview(URL.createObjectURL(file)); // Generate a preview URL
            onChange([file]); // Attach file to the form
        }
    };

    const {getRootProps, getInputProps, isDragActive, fileRejections} = useDropzone({
        onDrop,
        accept,
        maxSize,
        multiple: false,
    });

    // Reset preview when defaultValue changes
    useEffect(() => {
        if (defaultValue === null) {
            setPreview(null);
            onChange([]); // Clear the value
        } else if (initialFile) {
            setPreview(initialFile);
        }
    }, [defaultValue, initialFile, onChange]);

    // Cleanup the preview URL when the component unmounts
    useEffect(() => {
        return () => {
            if (preview && !initialFile) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview, initialFile]);

    return (
        <div className="space-y-2">
            {label && <label className="font-medium">{label}</label>}
            <div
                {...getRootProps({
                    className: `dropzone relative group w-full h-[150px] border-2 rounded-lg overflow-hidden flex justify-center bg-gray-50 cursor-pointer items-center transition-all ${
                        isDragActive ? "border-brand-500" : "border-dashed border-gray-200"
                    }`,
                })}
            >
                <input {...getInputProps()} />
                {preview && (
                    <div className="w-full h-full flex flex-wrap gap-2 items-center justify-center overflow-hidden">
                        <div className="border border-gray-200 rounded-lg overflow-hidden relative">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}
                <div
                    className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center ${
                        value?.length > 0 ? "bg-black/30" : ""
                    }`}
                >
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
                    <span
                        className={`text-sm ${
                            value?.length > 0 || preview ? "text-gray-50" : "text-gray-600"
                        }`}
                                        >
                        {value?.length > 0 || preview
                            ? `${value?.length || 1} file(s) uploaded`
                            : "Drag or click to upload files"}
                    </span>
                </div>
            </div>

            {/* Error messages */}
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
            {fileRejections.length > 0 && (
                <p className="text-red-500 text-sm">Invalid file type or size. Please try again.</p>
            )}
        </div>
    );
};

export default DragDropFile;
