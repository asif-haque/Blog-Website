import React from "react";

export default function Logo({ width = "100px" }) {
  return (
    <img
      src="/pexels-dids-1276553.jpg"
      alt="Logo"
      style={{ width, borderRadius: "30px" }}
    />
  );
}
