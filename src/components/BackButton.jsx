import React from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="rounded-full bg-neutral-200 p-2 mb-2 md:mb-5 dark:bg-neutral-500"
      onClick={() => navigate(-1)}
    >
      <FaAngleLeft className="text-2xl" />
    </button>
  );
};

export default BackButton;
