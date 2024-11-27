import React, { useEffect, useState } from "react";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileNav from "../components/profile/ProfileNav";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { appWriteService } from "../appwrite/appwriteService";
import toast from "react-hot-toast";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});

  const { id } = useParams();
  const { userData } = useSelector((state) => state.auth);
  const isSelf = id === userData?.$id ? true : false;

  useEffect(() => {
    (async () => {
      try {
        const res = await appWriteService.getUserInfo(id);
        setUserInfo(res);
      } catch (err) {
        toast.error("User doesn't exists");
        console.log("Error in profile", err);
      }
    })();
  }, []);

  return (
    <div className="p-3 md:px-[17vw] md:pt-7">
      <ProfileInfo userInfo={userInfo} />
      <ProfileNav />
    </div>
  );
};

export default Profile;
