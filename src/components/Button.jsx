import React from "react";

export default function Button({
  children,
  type = "button",
  bgColour = "bg-gray-300",
  txtColour = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`${bgColour} ${txtColour} ${className} px-4 py-2 rounded-lg`}
      {...props}
    >
      {children}
    </button>
  );
}
