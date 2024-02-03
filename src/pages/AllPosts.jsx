// Posts in form of card
import React, { useEffect, useState } from "react";
import { appWriteService } from "../appwrite/appwriteService";
import PostCard from "../components/PostCard";
import Container from "../components/container/Container";

export default function AllPosts() {
  const [posts, setposts] = useState();
  useEffect(() => {
    const fn = async () => {
      const documentList = await appWriteService.getPosts(); // has two keys - total and documents
      documentList && setposts(documentList.documents);
    };
    fn();
  }, []);

  return posts ? (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  ) : (
    <>
      <h1>Welcome to the Website!</h1>
      <h3>Be the first one to register a blog on the site!</h3>
    </>
  );
}
