import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useController } from "react-hook-form";
import { X, Image as ImageIcon, FileText, UploadCloud } from "lucide-react";
import { UploadCloudIcon } from "../icons/upload-cloud-icon";

const StepFormDragDropFile = ({
	name,
	control,
	label = "",
	accept = {
		"image/*": [],
		"application/pdf": [],
		"application/msword": [],
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document":
			[],
	},
	maxSize = 10 * 1024 * 1024, // 10MB
	multiple = true,
}) => {
	const {
		field: { onChange, value },
		fieldState: { error },
	} = useController({ name, control });

	const [previews, setPreviews] = useState([]);

	// Sync previews with value
	useEffect(() => {
		const newPreviews = [];
		const files = value || [];

		// Revoke old object URLs to avoid memory leaks
		previews.forEach((p) => {
			if (p.url && !p.isExternal) URL.revokeObjectURL(p.url);
		});

		if (Array.isArray(files) && files.length > 0) {
			files.forEach((file) => {
				if (typeof file === "string") {
					// Existing URL
					newPreviews.push({
						type: "image",
						url: file,
						isExternal: true,
						name: file,
					});
				} else if (file instanceof File) {
					// New File
					if (file.type.startsWith("image/")) {
						newPreviews.push({
							type: "image",
							url: URL.createObjectURL(file), // Create new URL
							isExternal: false,
							name: file.name,
						});
					} else {
						newPreviews.push({
							type: "file",
							url: null,
							isExternal: false,
							name: file.name,
						});
					}
				}
			});
		}

		setPreviews(newPreviews);

		// Cleanup function for when component unmounts or updates
		return () => {
			newPreviews.forEach((p) => {
				if (p.url && !p.isExternal) URL.revokeObjectURL(p.url);
			});
		};
		// eslint-disable-next-line
	}, [value]); // Only re-run when value changes

	const onDrop = (acceptedFiles) => {
		const currentFiles = Array.isArray(value) ? value : [];
		const newFiles = multiple
			? [...currentFiles, ...acceptedFiles]
			: acceptedFiles;
		onChange(newFiles);
	};

	const removeFile = (index) => {
		const currentFiles = Array.isArray(value) ? value : [];
		const newFiles = currentFiles.filter((_, i) => i !== index);
		onChange(newFiles);
	};

	const { getRootProps, getInputProps, isDragActive, fileRejections } =
		useDropzone({
			onDrop,
			accept,
			maxSize,
			multiple,
		});

	return (
		<div className="space-y-4">
			{label && <label className="font-medium text-gray-700">{label}</label>}

			{/* Dropzone Area */}
			<div
				{...getRootProps({
					className: `relative group w-full h-[160px] border-2 border-dashed rounded-xl flex flex-col justify-center items-center transition-all cursor-pointer bg-gray-50 hover:bg-gray-100 ${
						isDragActive ? "border-brand-500 bg-brand-50" : "border-gray-200"
					}`,
				})}
			>
				<input {...getInputProps()} />
				<div className="flex flex-col items-center justify-center text-center p-4 space-y-3">
					<div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
						<UploadCloudIcon
							stroke="#FDE9D2"
							width={56}
							height={56}
							strokeWidth={1.66667}
						/>
					</div>
					<div className="space-y-1">
						<p className="text-gray-700 font-medium">
							Drag or click to upload new photo/logo
						</p>
					</div>
				</div>
			</div>

			{/* Error messages */}
			{error && <p className="text-red-500 text-sm">{error.message}</p>}
			{fileRejections.length > 0 && (
				<p className="text-red-500 text-sm">
					Some files were rejected. Check file type and size.
				</p>
			)}

			{/* Previews Grid */}
			{previews.length > 0 && (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
					{previews.map((file, index) => (
						<div
							key={index}
							className="relative group aspect-square rounded-xl border border-gray-200 bg-gray-50 "
						>
							{/* Content */}
							<div className="w-full h-full flex items-center justify-center p-2">
								{file.type === "image" ? (
									<img
										src={file.url}
										alt={file.name}
										className="w-full h-full object-cover rounded-lg"
									/>
								) : (
									<div className="flex flex-col items-center justify-center text-center">
										<FileText className="w-10 h-10 text-gray-400 mb-2" />
										<span className="text-xs text-gray-500 line-clamp-2 px-1 break-all">
											{file.name}
										</span>
									</div>
								)}
							</div>

							{/* Icon Overlay (Bottom Left) */}
							<div className="absolute bottom-2 left-2 z-10">
								<div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shadow-sm">
									{file.type === "image" ? (
										<ImageIcon className="w-5 h-5 text-white" />
									) : (
										<FileText className="w-5 h-5 text-white" />
									)}
								</div>
							</div>

							{/* Delete Button (Top Right) */}
							<span
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									removeFile(index);
								}}
								className="absolute -top-2 -right-2 !w-6 !h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors z-20 cursor-pointer"
							>
								<X className="w-4 h-4 text-white" />
							</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default StepFormDragDropFile;
