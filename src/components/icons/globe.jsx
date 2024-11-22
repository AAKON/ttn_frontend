
export const GlobeIcon = ({
                              width = 20,
                              height = 20,
                              fill = "none",
                              stroke = "#98A2B3",
                              ...props
                          }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g clipPath="url(#clip0_2263_3907)">
                <path
                    d="M1.66675 9.99984H18.3334M1.66675 9.99984C1.66675 14.6022 5.39771 18.3332 10.0001 18.3332M1.66675 9.99984C1.66675 5.39746 5.39771 1.6665 10.0001 1.6665M18.3334 9.99984C18.3334 14.6022 14.6025 18.3332 10.0001 18.3332M18.3334 9.99984C18.3334 5.39746 14.6025 1.6665 10.0001 1.6665M10.0001 1.6665C12.0845 3.94846 13.269 6.90987 13.3334 9.99984C13.269 13.0898 12.0845 16.0512 10.0001 18.3332M10.0001 1.6665C7.91568 3.94846 6.73112 6.90987 6.66675 9.99984C6.73112 13.0898 7.91568 16.0512 10.0001 18.3332"
                    stroke={stroke}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_2263_3907">
                    <rect width={width} height={height} fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};
