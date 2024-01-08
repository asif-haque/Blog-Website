import React, { forwardRef, useId } from "react";

// forwardRef is used to handle the input data from any position of the component heirarchy

const Button = ({ label, type = "text", className = "", ...props }, ref) => {
  const id = useId();
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </>
  );
};

export default forwardRef(Button);
