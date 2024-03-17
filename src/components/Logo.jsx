import React from "react";

export default function Logo({ width = "100px" }) {
  return (
    <img
      src="/images/logo.jpg"
      alt="Logo"
      className="w-full h-full object-cover"
      style={{ width, borderRadius: "30px" }}
    />
  );
}
