"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogClose,
} from "@/components/ui/dialog";
import { X, FileText } from "lucide-react";

export default function ImageSlider({ images, title }) {
	const [selectedImage, setSelectedImage] = useState(null);
	const [isOpen, setIsOpen] = useState(false);

	const options = {
		type: "slide",
		autoplay: false,
		rewind: false,
		perPage: 3,
		perMove: 1,
		gap: "20px",
		pagination: false,
		arrows: true,
		padding: { right: "80px" },
		drag: true,
		snap: true,
		breakpoints: {
			768: {
				perPage: 2,
				padding: { right: "60px" },
			},
		},
	};

	const handleImageClick = (image) => {
		if (image.mime_type === "application/pdf") {
			window.open(image.original, "_blank");
		} else {
			setSelectedImage(image.original);
			setIsOpen(true);
		}
	};

	return (
		<>
			<div className="mb-8">
				<div className="relative">
					<Splide options={options}>
						{images?.map((image, index) => (
							<SplideSlide key={index}>
								<div
									onClick={() => handleImageClick(image)}
									className="cursor-pointer hover:opacity-90 transition-opacity"
								>
									<Image
										src={image.thumbnail}
										alt={title}
										width={240}
										height={180}
										className="w-full min-h-[100px] h-auto object-cover rounded-lg"
									/>
									{image.mime_type === "application/pdf" && (
										<div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[1px] rounded-lg">
											<div className="bg-white/90 p-2 rounded-full shadow-sm border border-red-100 scale-110">
												<FileText size={24} className="text-red-500" strokeWidth={2.5} />
											</div>
										</div>
									)}
								</div>
							</SplideSlide>
						))}
					</Splide>
					{/* Gradient Overlay */}
					<div className="absolute top-0 right-0 h-full w-[80px] bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
				</div>
			</div>

			{/* Lightbox Dialog */}
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="max-w-[80vw] max-h-[80vh] w-auto h-auto p-0 overflow-hidden bg-brand-700 border-none [&>button]:text-white [&>button]:hover:text-white/80 [&>button]:bg-brand-600/50 [&>button]:hover:bg-brand-600/90 [&>button]:rounded-full [&>button]:p-2">
					<DialogTitle className="sr-only">Image Preview</DialogTitle>
					{selectedImage && (
						<div className="relative flex items-center justify-center p-1">
							<Image
								src={selectedImage}
								alt={title}
								width={1200}
								height={1200}
								className="w-full h-full object-contain rounded-sm"
							/>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
}
