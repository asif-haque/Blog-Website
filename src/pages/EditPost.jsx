// A pre-filled form for editing a blog
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/post form/PostForm";
import { appWriteService } from "../appwrite/appwriteService";
import Container from "../components/container/Container";

export default function EditPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  // working with API => useEffect
  useEffect(() => {
    const fn = async () => {
      if (slug) {
        const postData = await appWriteService.getPost(slug);
        postData ? setPost(postData) : navigate("/");
      }
    };
    fn();
  }, [slug, navigate]);

  return (
    <div className="py-6">
      <Container>
        {post ? (
          <PostForm post={post} />
        ) : (
          <h1 className="text-center text-5xl font-bold">...Loading</h1>
        )}
      </Container>
    </div>
  );
}
