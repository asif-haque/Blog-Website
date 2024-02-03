import React, { forwardRef, useId } from "react";

function Select({ options, label, className, ...props }, ref) {
  // options comes as a form of array
  const id = useId();
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        ref={ref}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
      >
        {/* '?' for we haven't set any default value for options, so app might crash if not passed in the props */}
        {options?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
