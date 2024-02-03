// A form to create a new blog
import React from "react";
import PostForm from "../components/post form/PostForm";
import Container from "../components/container/Container";

export default function AddPost() {
  return (
    <div className="py-6">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}
