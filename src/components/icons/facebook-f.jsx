export const FacebookFIcon = ({
  stroke = "#98A2B3",
  width = 16,
  height = 28,
  ...props
}) => {
  return (
      <svg {...props} width={width} height={height} viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5152 15.7536L15.3087 10.7119H10.4206V7.43473C10.4206 6.05612 11.103 4.70903 13.2852 4.70903H15.5388V0.415648C14.2264 0.206368 12.9003 0.0931488 11.5712 0.0769043C7.54807 0.0769043 4.92151 2.49538 4.92151 6.86753V10.7119H0.461914V15.7536H4.92151V27.9484H10.4206V15.7536H14.5152Z" fill={stroke}/>
      </svg>
  );
};
