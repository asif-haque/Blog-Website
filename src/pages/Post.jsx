// An option to lazy load

import React, { useEffect, useState } from "react";
import { appWriteService } from "../appwrite/appwriteService";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../components/container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { PiHandsClapping } from "react-icons/pi";
import { readCount } from "../utils/readCount";
import { FaHandsClapping } from "react-icons/fa6";
import BackButton from "../components/BackButton";
import toast from "react-hot-toast";
import PostShimmer from "../components/shimmerUI/PostShimmer";

export default function Post() {
  const [post, setPost] = useState(null); // to make it accessable throughout the function
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [open, setOpen] = useState(false);
  const [readTime, setReadTime] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();

  // closing the modal
  const handleModalClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    window.addEventListener("click", handleModalClose);
    return () => window.removeEventListener("click", handleModalClose);
  }, []);

  // asking for the post details
  useEffect(() => {
    appWriteService.getPost(slug).then((post) => {
      post ? setPost(post) : navigate("/");
      // checking (on mounting) if post is already liked by the current user
      if (post?.likes.includes(userData?.$id)) {
        setIsPostLiked(true);
      }
    });
  }, [slug, navigate]);

  // read time calculation on mount
  useEffect(() => {
    if (post && post.content) {
      const t = readCount(post.content);
      setReadTime(t);
    }
  }, [post]);

  // checking if the post is of user themselves
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const deletePost = async () => {
    try {
      const deleted = await appWriteService.deletePost(post.$id);
      if (deleted) {
        // delete image (file) if it exists, in the storage
        if (post.featuredImg)
          await appWriteService.deleteTheFile(post.featuredImg);
        navigate("/all-posts");
        toast("Post deleted.");
      }
    } catch (err) {
      console.log("Error deleting file :: ", err);
    }
  };

  const handleLike = async () => {
    try {
      // if the likes doesn't contain current user yet, then add a like
      if (!post.likes.includes(userData.$id)) {
        setIsPostLiked(true);
        const updatedPost = await appWriteService.updatePost(post.$id, {
          likes: [...post.likes, userData.$id],
        });
        setPost(updatedPost);
      } else {
        // we'll need to unlike
        setIsPostLiked(false);
        const newLikes = post.likes.filter((id) => id !== userData.$id);
        const updatedPost = await appWriteService.updatePost(post.$id, {
          likes: newLikes,
        });
        setPost(updatedPost);
      }
    } catch (err) {
      console.log("Error liking: ", err);
    }
  };

  if (!post) return <PostShimmer />;

  return (
    <div className="px-5 md:px-10 py-10 lg:px-[20vw]">
      <BackButton />
      <h1 className="text-5xl font-bold mb-10">{post.title} </h1>
      <div className="post-info mb-5 flex gap-2">
        <div className="w-[3rem]">
          <img
            src="/images/userWithoutDp.png"
            className="size-full object-contain"
            alt=""
          />
        </div>
        <div className="">
          <h3 className="text-lg font-semibold">{post.userName}</h3>
          <p className="text-sm">{readTime} min read</p>
        </div>
      </div>
      <div className="border-t border-b flex items-center h-12 mb-5 relative">
        {/* Like section */}
        <button
          className="text-lg flex gap-2 items-center"
          onClick={handleLike}
        >
          {isPostLiked ? <FaHandsClapping /> : <PiHandsClapping />}
          {post.likes?.length > 0 && post.likes?.length}
        </button>
        <div onClick={(e) => e.stopPropagation()} className="ml-auto flex">
          {isAuthor && (
            <span
              className="material-symbols-outlined  cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              more_horiz
            </span>
          )}
          {open && (
            <div className="w-52 bg-zinc-50 dark:bg-zinc-900 rounded-lg absolute z-50 right-0 top-10 overflow-hidden cursor-pointer shadow-lg">
              <Link to={`/edit-post/${post.$id}`}>
                <div className="px-5 py-3 hover:bg-neutral-100 hover:dark:bg-neutral-700 hover:font-medium">
                  Edit
                </div>
              </Link>
              <hr />
              <div
                className="px-5 py-3 block text-red-500 hover:bg-neutral-100 hover:dark:bg-neutral-700 hover:font-medium"
                onClick={deletePost}
              >
                Delete
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
        {/* Image */}
        {post.featuredImg && (
          <div className="rounded-xl overflow-hidden w-[80%] max-h-[100vh]">
            <img
              src={appWriteService.getTheFilePreview(post.featuredImg)}
              alt="Featured Image"
              className="size-full object-contain"
            />
          </div>
        )}
      </div>
      <div>
        {/* Post */}
        <div className="w-full mb-6">
          <div className="browser-css">
            {parse(post.content)}
            {/* content is stored in html format => "<p>para</p>" */}
          </div>
        </div>
      </div>
    </div>
  );
}
