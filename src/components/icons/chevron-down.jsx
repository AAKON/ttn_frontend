export function ChevronDownIcon({ width = 20, height = 14, stroke = "#98A2B3" }) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_d_9040_9918)">
                <path
                    d="M5 1.5L10 6.5L15 1.5"
                    stroke={stroke}
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    shapeRendering="crispEdges"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_9040_9918"
                    x="0.166748"
                    y="0.666626"
                    width="19.6665"
                    height="14.6667"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix"/>
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy={4}/>
                    <feGaussianBlur stdDeviation={2}/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_9040_9918"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_9040_9918"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
}
