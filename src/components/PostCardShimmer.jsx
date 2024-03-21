import React from "react";

const PostCardShimmer = () => {
  return (
    <div>
      <div className="animate-pulse w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full h-[25vh] justify-center mb-4 bg-gray-300 rounded-xl"></div>
        <div className="w-full h-[1rem] bg-gray-300 mb-2 rounded-xl"></div>
        <div className="w-[80%] h-[1rem] bg-gray-300 rounded-xl"></div>
      </div>
    </div>
  );
};

export default PostCardShimmer;
