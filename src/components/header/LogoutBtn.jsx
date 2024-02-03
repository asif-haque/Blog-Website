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
    <div>
      <button
        onClick={handleLogout}
        className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      >
        Logout
      </button>
    </div>
  );
}
