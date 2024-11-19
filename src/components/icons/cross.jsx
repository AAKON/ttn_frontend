export function Cross({
                          strokeColor = "#667508",
                          width = 12,
                          height = 12,
                          strokeWidth = 2,
                          ...props
                      }) {
    return (
        <svg
            {...props}
            width={width}
            height={height}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11 1L1 11M1 1L11 11"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
