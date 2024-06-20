import React from "react";
import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";

const CreatePostButton = () => {
  return (
    <Link to="/add-post">
      <div className="lg:hidden fixed bottom-16 md:bottom-20 right-10 shadow-2xl border-2 bg-white dark:bg-neutral-900 dark:border-0 p-4 rounded-full active:scale-110 active:-translate-y-2 duration-300">
        <FaPen className="text-2xl" />
      </div>
    </Link>
  );
};

export default CreatePostButton;
