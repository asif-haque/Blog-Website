// To read individual post
// Lets the user edit or delete them if it is their post
import React, { useEffect, useState } from "react";
import { appWriteService } from "../appwrite/appwriteService";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../components/container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { convert } from "html-to-text";
import { PiHandsClapping } from "react-icons/pi";
import { readCount } from "../utils/readCount";

export default function Post() {
  const [post, setPost] = useState(null); // to make it accessable throughout the function
  const [open, setOpen] = useState(false);
  const [readTime, setReadTime] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();

  const handleModalClose = () => {
    setOpen(false);
  };
  window.addEventListener("click", handleModalClose);

  // asking for the post details
  useEffect(() => {
    appWriteService
      .getPost(slug) // instead of using async-await as an alt
      .then((post) => (post ? setPost(post) : navigate("/")));
  }, [slug, navigate]);

  // checking if the post is of user themselves
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  // delete button
  const deletePost = async () => {
    try {
      const deleted = await appWriteService.deletePost(post.$id);
      if (deleted) {
        // delete image (file) if it exists, in the storage
        if (post.featuredImg)
          await appWriteService.deleteTheFile(post.featuredImg);
        navigate("/all-posts");
      }
    } catch (err) {
      console.log("Error deleting file :: ", err);
    }
  };

  useEffect(() => {
    if (post && post.content) {
      const t = readCount(post.content);
      setReadTime(t);
    }
  }, [post]);

  return post ? (
    <div className="px-[20vw]">
      <Container>
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
          {/* add the filled clap button */}
          <PiHandsClapping className="text-lg" />
          <div onClick={(e) => e.stopPropagation()} className="ml-auto flex">
            {isAuthor && (
              <span
                className="material-symbols-outlined text-zinc-700 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                more_horiz
              </span>
            )}
            {open && (
              <div className="w-52 bg-zinc-50 rounded-lg absolute z-50 right-0 top-10 overflow-hidden cursor-pointer shadow-lg">
                <Link to={`/edit-post/${post.$id}`}>
                  <div className="px-5 py-3 hover:bg-neutral-100 hover:font-medium">
                    Edit
                  </div>
                </Link>
                <hr />
                <div
                  className="px-5 py-3 block text-red-500 hover:bg-neutral-100 hover:font-medium"
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
      </Container>
    </div>
  ) : null;
}
