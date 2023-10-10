import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { authService } from "../../appwrite/authService";

export default function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
