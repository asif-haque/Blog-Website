import React from "react";
import ProfileStats from "./ProfileStats";

const ProfileInfo = ({ userInfo }) => {
  return (
    <div>
      <div className="flex gap-5 md:gap-10">
        <div className="flex-[0.40] max-w-[130px]">
          <div className="rounded-full overflow-hidden size-[100px] md:size-[130px]">
            <img src="/images/userWithoutDp.png" alt="" className="object-cover size-full" />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between py-2">
          <h3 className="font-bold text-2xl">{userInfo.name}</h3>
          <div className="flex gap-3">
            <button className="px-3 py-1 border border-green-600 rounded-lg">
              Follow
            </button>
            <button className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
              Message
            </button>
          </div>
          <div className="md:block hidden">
            <ProfileStats className="gap-5" userInfo={userInfo} />
          </div>
        </div>
      </div>
      <div className="md:hidden mt-10 px-1 py-2 border-b border-t">
        <ProfileStats className="justify-between" userInfo={userInfo} />
      </div>
    </div>
  );
};

export default ProfileInfo;
