import React from "react";

const ProfileStats = ({ className, userInfo }) => {
  return (
    <div className={`flex ${className}`}>
      <div className="">{userInfo?.posts?.length || 0} Posts</div>
      <div className="">{userInfo?.followers?.length} Followers</div>
      <div className="">{userInfo?.following?.length} Following</div>
    </div>
  );
};

export default ProfileStats;
