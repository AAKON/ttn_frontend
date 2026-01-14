"use client";
import React from "react";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function ImageSlider({ images, title }) {
	const options = {
		type: "loop",
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

	return (
		<div className="mb-8">
			<div className="relative">
				<Splide options={options}>
					{images?.map((image, index) => (
						<SplideSlide key={index}>
							<div>
								<Image
									src={image}
									alt={title}
									width={240}
									height={180}
									className="w-full min-h-[100px] h-auto object-cover rounded-lg"
								/>
							</div>
						</SplideSlide>
					))}
				</Splide>
				{/* Gradient Overlay */}
				<div className="absolute top-0 right-0 h-full w-[80px] bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
			</div>
		</div>
	);
}
