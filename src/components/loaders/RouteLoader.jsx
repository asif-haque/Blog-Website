import React from "react";

const Loading = ({ loading }) => {
  if (loading) return;
  return (
    <div className="fixed w-full h-[80vh] z-[100] pt-10 dark:text-white flex justify-center">
      Loading...
    </div>
  );
};

export default Loading;
