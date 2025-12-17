import React from "react";

export function UploadCloudIcon({
	stroke = "#FDE9D2",
	width = 56,
	height = 56,
	strokeWidth = 1.66667,
}) {
	return (
		<svg
			width={width}
			height={height}
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
				stroke={stroke}
				strokeWidth={strokeWidth}
			/>
			<path
				d="M24 32L28 28M28 28L32 32M28 28V37M36 32.7428C37.2215 31.734 38 30.2079 38 28.5C38 25.4624 35.5376 23 32.5 23C32.2815 23 32.0771 22.886 31.9661 22.6977C30.6621 20.4848 28.2544 19 25.5 19C21.3579 19 18 22.3579 18 26.5C18 28.5661 18.8354 30.4371 20.1869 31.7935"
				stroke="white"
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
