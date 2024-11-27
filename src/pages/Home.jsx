import React from "react";
import { useSelector } from "react-redux";
import AllPosts from "./AllPosts";
import { lazy } from "react";
const Hero = lazy(() => import("../components/home/Hero"));

export default function Home() {
  const { loginStatus } = useSelector((state) => state.auth);

  if (!loginStatus) {
    return <Hero />;
  }
  return <AllPosts />;
}
