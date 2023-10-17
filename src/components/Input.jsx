import React, { forwardRef, useId } from "react";

export default forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
      <>
        {label && <label htmlFor={id}>{label}</label>}
        <input
          type={type}
          className={`w-full ${className}`}
          ref={ref}
          {...props}
          id={id}
        />
      </>
    );
  }
);
