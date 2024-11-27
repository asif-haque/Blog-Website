import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, redirect, useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  // getting status (authentication status) state var from redux store
  const { loginStatus } = useSelector((state) => state.auth);

  if (authentication && !loginStatus) {
    return <Navigate to="/login" />;
  } else if (!authentication && loginStatus) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

// case 1: authentication is required, but user is not authenticated -
// send the user to get logged in. Ex: all posts page

// case 2: authentication is not required, but user is authenticated -
// send the user to home page. Ex.: login page
