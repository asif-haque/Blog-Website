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
      className="h-full w-full flex justify-center items-center px-3 hover:shadow"
    >
      Logout
    </button>
  );
}
