import React from "react";

const PostCardShimmer = () => {
  return (
    <div>
      <div className="animate-pulse flex gap-3 border-b pb-5">
        <div className="flex-[1.75] space-y-2">
          <div className="w-[30%] h-[1.25rem] bg-gray-300 rounded-xl" />
          <div className="w-[80%] h-[1rem] bg-gray-300 rounded-xl" />
          <div className="w-[80%] h-[1rem] bg-gray-300 rounded-xl" />
          <div className="w-[80%] h-[1rem] bg-gray-300 rounded-xl" />

          <div className="flex items-center gap-3">
            <div className="w-[2rem] h-[2rem] bg-gray-300 rounded-full overflow-hidden" />
            <div className="w-[7rem] h-[0.75rem] bg-gray-300 rounded-xl" />
          </div>
        </div>
        <div className="flex-1 h-[7rem] bg-gray-300 rounded-xl mt-2" />
      </div>
    </div>
  );
};

export default PostCardShimmer;
