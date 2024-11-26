export function ChevronDownIcon({ width = 12, height = 6, stroke = "#98A2B3" }) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M13 7L7 1L1 7"
                stroke={stroke}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>

    );
}
