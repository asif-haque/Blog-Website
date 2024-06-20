import React, { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/features/themeSlice";

const MyDarkModeButton = () => {
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const toggleDarkMode = () => {
    dispatch(toggleTheme());
    console.log("tapped");
  };

  return (
    <div>
      <DarkModeSwitch
        style={{ height: "35px", width: "40px" }}
        className="ml-auto"
        checked={isDark}
        onChange={toggleDarkMode}
        size={120}
      />
    </div>
  );
};

export default MyDarkModeButton;
