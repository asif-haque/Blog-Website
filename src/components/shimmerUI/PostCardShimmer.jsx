import React from "react";
import { shimmerBgColor } from "../../utils/colors";

const PostCardShimmer = () => {
  return (
    <div>
      <div className="animate-pulse flex gap-3 border-b dark:border-neutral-500 pb-5">
        <div className="flex-1 space-y-2">
          <div className={`w-[30%] h-[1.25rem] ${shimmerBgColor} rounded`} />
          <div className={`w-[80%] h-[1rem] ${shimmerBgColor} rounded`} />
          <div className={`w-[80%] h-[1rem] ${shimmerBgColor} rounded`} />

          <div className={`flex items-center gap-3`}>
            <div
              className={`w-[2rem] h-[2rem] ${shimmerBgColor} rounded-full overflow-hidden`}
            />
            <div
              className={`w-[5rem] h-[0.75rem] ${shimmerBgColor} rounded`}
            />
          </div>
        </div>
        <div
          className={`flex-[0.75] sm:flex-[0.15] h-[7rem] ${shimmerBgColor} rounded-lg mt-2`}
        />
      </div>
    </div>
  );
};

export default PostCardShimmer;
