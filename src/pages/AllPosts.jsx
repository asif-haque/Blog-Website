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
      <div className="w-full py-8 px-[13vw]">
        <Container>
          <div className="space-y-5">
            {posts.toReversed().map((post) => (
              <div key={post.$id} className="">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    ) : (
      <>
        <h1 className="text-4xl font-extrabold text-center my-7">
          Welcome to the Website!
        </h1>
        <h3 className="text-3xl font-semibold text-center my-7">
          Be the first one to register a blog on the site!
        </h3>
      </>
    )
  ) : (
    // Loading to fetch posts
    <div className="w-full py-8 px-[13vw]">
      <Container>
        <div className="space-y-5">
          {loading.map((num) => (
            <div key={num} className="">
              <PostCardShimmer />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
