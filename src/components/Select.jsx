import React, { forwardRef } from "react";

function Select({ options, ...props }, ref) {
  // options comes as a form of array
  return (
    <div>
      <select ref={ref} {...props}>
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
