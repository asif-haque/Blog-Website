import React from "react";
import { CiGrid2H } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa";

const ProfileNav = () => {
  return (
    <div className="flex *:flex-1 py-4 border-t border-b md:mt-16">
      <button className="">
        <CiGrid2H className="mx-auto text-2xl" />
      </button>
      <button>
        <FaRegBookmark className="mx-auto text-xl" />
      </button>
    </div>
  );
};

export default ProfileNav;
