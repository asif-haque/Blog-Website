import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-gray-700",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`${bgColor} ${textColor} ${className} px-4 py-2 rounded-lg hover:bg-transparent hover:text-black hover:dark:text-white border border-gray-800 hover:dark:border-gray-200 hover:shadow-xl duration-300`}
      {...props}
    >
      {children}
    </button>
  );
}
