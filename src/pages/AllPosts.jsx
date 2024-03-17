// Posts in form of card
import React, { useEffect, useState } from "react";
import { appWriteService } from "../appwrite/appwriteService";
import PostCard from "../components/PostCard";
import Container from "../components/container/Container";
import PostCardShimmer from "../components/PostCardShimmer";

export default function AllPosts() {
  const [posts, setposts] = useState();
  const loading = [1, 2, 3, 4];
  useEffect(() => {
    const fn = async () => {
      const documentList = await appWriteService.getPosts(); // has two keys - total and documents
      documentList && setposts(documentList.documents);
    };
    fn();
  }, []);

  return posts ? (
    posts.length ? (
      <div className="w-full py-8">
        <Container>
          <div className="md:flex md:flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 md:w-1/4">
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
    )
  ) : (
    // Loading to fetch posts
    <div className="w-full py-8">
      <Container>
        <div className="md:flex md:flex-wrap">
          {loading.map((num) => (
            <div key={num} className="p-2 md:w-1/4">
              <PostCardShimmer />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
