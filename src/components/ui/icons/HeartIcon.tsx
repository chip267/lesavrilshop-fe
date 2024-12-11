import React from "react";
interface Props {
  height: string;
  width: string;
}
const HeartIcon = ({ height = "20", width = "20" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300 transform"
    >
      <path
        d="M7 3C4.239 3 2 5.216 2 7.95C2 10.157 2.875 15.395 11.488 20.69C11.6425 20.7833 11.8195 20.8327 12 20.8327C12.1805 20.8327 12.3575 20.7833 12.512 20.69C21.126 15.395 22 10.157 22 7.95C22 5.216 19.761 3 17 3C14.239 3 12 6 12 6C12 6 9.761 3 7 3Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HeartIcon;
