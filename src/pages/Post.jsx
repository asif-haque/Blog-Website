// To read individual post
// Lets the user edit or delete them if it is their post
import React, { useEffect, useState } from "react";
import { appWriteService } from "../appwrite/appwriteService";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../components/container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Button from "../components/Button";

export default function Post() {
  const [post, setPost] = useState(null); // to make it accessable throughout the function
  const [open, setOpen] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

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
    const deleted = await appWriteService.deletePost(post.$id);
    if (deleted) {
      // delete image (file) if it exists, in the storage
      if (post.featuredImg) await deleteTheFile(post.featuredImg);
      navigate("/");
    }
  };

  return post ? (
    <div className="px-48">
      <Container>
        <h1 className="text-5xl font-bold mb-5">{post.title} </h1>
        <h3 className="text-lg mb-3">{post.userName}</h3>
        <div className="border-t border-b flex items-center p-2 mb-5 relative">
          {isAuthor && (
            <span
              className="material-symbols-outlined text-zinc-700 ml-auto cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              more_horiz
            </span>
          )}
          {open && (
            <div className="w-52 bg-slate-200 absolute right-0 top-10">a</div>
          )}
        </div>
        <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
          {/* Image */}
          {post.featuredImg && (
            <img
              src={appWriteService.getTheFilePreview(post.featuredImg)}
              alt="Featured Image"
              className="rounded-xl"
            />
          )}
          {/* Edit, Delete */}
          {isAuthor && (
            <div className="absolute-right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
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
