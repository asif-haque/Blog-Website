import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { appWriteService } from "../appwrite/appwriteService";
import PostCard from "../components/PostCard";
import Container from "../components/container/Container";
import AllPosts from "./AllPosts";
import { motion, AnimatePresence } from "framer-motion";
import "./Home.css";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer";

export default function Home() {
  const authStatus = useSelector((state) => state.auth.status);
  const [index, setIndex] = useState(0);

  const images = [
    {
      url: "/images/bg1.jpg",
    },
    {
      url: "/images/bg2.jpg",
    },
    {
      url: "/images/bg3.jpg",
    },
  ];

  const headings = ["Write Blogs.", "Make a diary.", "Learn. Educate."];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((index + 1) % images.length);
    }, 7 * 1000);
    return () => clearTimeout(timer);
  }, [index]);

  if (!authStatus) {
    return (
      <>
        {/*  we are adding the show animation whenever index changes for new image and we need .map() for that */}
        <div className="overflow-hidden relative">
          {images.map((image, i) => (
            <div key={image.url}>
              <h1
                className={`${
                  index !== i && `hidden`
                } absolute top-[50%] -translate-y-1/2 text-9xl z-40 text-center w-full font-bold text-outline`}
              >
                {headings[i]}
              </h1>
              <div
                className={`${
                  index === i ? `show` : `hidden`
                } h-[90vh] overflow-hidden`}
              >
                <img
                  src={image.url}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="py-20">
          <h1 className="text-4xl font-extrabold text-center my-7">
            <Link to="/login">Login</Link> to read posts.
          </h1>
        </div>
        <footer>
          <Footer />
        </footer>
      </>
    );
  }
  return <AllPosts />;
}
