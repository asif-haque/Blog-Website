import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { authService } from "../../appwrite/authService";

export default function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout()); //setting status false through dispatch of an action
    });
  };
  return (
    <button
      onClick={handleLogout}
      className="py-2 px-4 opacity-70 hover:opacity-100 rounded-[100px] flex justify-center items-center border-zinc-500 bg-zinc-100 hover:shadow hover:scale-95 transition-all"
    >
      Log out
    </button>
  );
}
