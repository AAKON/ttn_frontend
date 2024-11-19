
export function Location({stroke="#FEF4E9", ...props}) {
    return (
        <svg
            width={56}
            height={56}
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x={4} y={4} width={48} height={48} rx={24} fill="#FDE9D2"/>
            <rect
                x={4}
                y={4}
                width={48}
                height={48}
                rx={24}
                stroke={stroke}
                strokeWidth={8}
            />
            <path
                d="M28 28.5C29.6569 28.5 31 27.1569 31 25.5C31 23.8431 29.6569 22.5 28 22.5C26.3431 22.5 25 23.8431 25 25.5C25 27.1569 26.3431 28.5 28 28.5Z"
                stroke="#F7931E"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M28 38C30 34 36 31.4183 36 26C36 21.5817 32.4183 18 28 18C23.5817 18 20 21.5817 20 26C20 31.4183 26 34 28 38Z"
                stroke="#F7931E"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>

    );
}