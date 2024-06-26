import React from "react";
import { shimmerBgColor } from "../../utils/colors";

const PostShimmer = () => {
  return (
    <div className="animate-pulse px-5 md:px-10 py-10 lg:px-[20vw]">
      <div
        className={`h-[3rem] ${shimmerBgColor} mt-[3.5rem] mb-10 rounded-lg`}
      />
      <div className="flex gap-2 w-[200px] md:w-[300px]">
        <div className={`size-[3rem] ${shimmerBgColor} rounded-full`} />
        <div className="flex-1 flex flex-col justify-between p-1">
          <div className={`h-[1rem] ${shimmerBgColor} rounded`} />
          <div className={`h-[1rem] w-1/2 ${shimmerBgColor} rounded`} />
        </div>
      </div>
    </div>
  );
};

export default PostShimmer;
