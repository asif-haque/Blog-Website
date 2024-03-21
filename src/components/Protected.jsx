// This will help redirecting users on the basis of their authentication
// status, on accessing a protected page. Related to routing
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  // getting status (authentication status) state var from redux store
  const status = useSelector((state) => state.auth.status);

  const navigator = useNavigate();

  // Redirection part
  useEffect(() => {
    // case 1: authentication is required, but user is not authenticated -
    // send the user to get logged in. Ex: all posts page
    if (authentication && !status) {
      navigator("/login");
    }
    // case 2: authentication is not required, but user is authenticated -
    // send the user to home page. Ex.: login page
    else if (!authentication && status) {
      navigator("/");
    }
  }, [status, navigator, authentication]);

  return <div>{children}</div>;
}
