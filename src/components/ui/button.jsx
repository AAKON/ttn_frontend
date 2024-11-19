
const Button = ({
  TagName = "button",
  secondary,
  icon = false,
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`transition-all ${className} ${
        secondary ? "bg-white text-gray-700 hover:bg-gradient-to-r from-gray-50 to-gray-200" : "bg-brand-600 hover:bg-gradient-to-r from-brand-600 to-brand-700"
      }`}
      {...props}
    >
      {icon && (
        <svg
          width={14}
          height={14}
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.99999 1.16666V12.8333M1.16666 6.99999H12.8333"
            stroke="white"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {children}
    </button>
  );
};

export default Button;
