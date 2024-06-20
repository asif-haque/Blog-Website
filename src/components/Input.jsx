import React, { forwardRef, useId } from "react";

// forwardRef is used to handle the input data from any position of the component heirarchy
// to use forwardRef: forwardRef(functionName(props, ref))

const Input = ({ label, type = "text", className = "", ...props }, ref) => {
  const id = useId();
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        className={`px-3 py-2 mt-1 rounded-lg bg-white dark:bg-neutral-800 outline-none focus:bg-gray-100 focus:dark:bg-neutral-700 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </>
  );
};

export default forwardRef(Input);
