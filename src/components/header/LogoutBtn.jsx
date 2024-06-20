import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import { authService } from "../../appwrite/authService";
import toast from "react-hot-toast";
import { CiLogout } from "react-icons/ci";

export default function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout()); //setting status false through dispatch of an action
      toast("Logged out.");
    });
  };
  return (
    <button
      onClick={handleLogout}
      className="md:py-2 md:px-4 opacity-70 hover:opacity-100 rounded-[100px] flex justify-center items-center md:border-zinc-500 lg:bg-zinc-100 lg:dark:text-neutral-900 lg:hover:shadow-lg lg:hover:scale-95 transition-all"
    >
      <CiLogout className="text-lg mr-2" />
      Log out
    </button>
  );
}
