// Posts in form of card
import React, { useEffect, useState } from "react";
import { appWriteService } from "../appwrite/appwriteService";
import PostCard from "../components/PostCard";
import Container from "../components/container/Container";
import PostCardShimmer from "../components/shimmerUI/PostCardShimmer";
import { useSearchParams } from "react-router-dom";
import CreatePostButton from "../components/CreatePostButton";

function AllPosts({ searchTerm = "" }) {
  const [posts, setposts] = useState();
  const loading = [1, 2, 3, 4, 5];

  useEffect(() => {
    const fn = async () => {
      const documentList = await appWriteService.getPosts(searchTerm);
      documentList && setposts(documentList.documents);
    };
    fn();
  }, [searchTerm]);

  // loading posts
  if (!posts)
    return (
      <div className="w-full py-8 px-5 md:px-[13vw]">
        <div className="space-y-5">
          {loading.map((num) => (
            <div key={num} className="">
              <PostCardShimmer />
            </div>
          ))}
        </div>
      </div>
    );

  return posts.length ? (
    <div className="w-full py-8 px-4 md:px-[13vw]">
      {searchTerm && (
        <>
          <h1 className="text-4xl font-extrabold text-center mb-5 line-clamp-1">
            Results for "{searchTerm}"
          </h1>
          <p className="text-sm mb-3">Search Results: {posts.length}</p>
        </>
      )}
      <div className="space-y-5">
        {posts.toReversed().map((post, index) => (
          <div key={post.$id} className="">
            <PostCard {...post} lastIndex={index === posts.length - 1} />
          </div>
        ))}
      </div>
      <CreatePostButton />
    </div>
  ) : (
    <>
      <h1 className="text-4xl font-extrabold text-center my-7 line-clamp-1">
        {searchTerm
          ? `No Result Found for "${searchTerm}"`
          : `Welcome to the Website!`}
      </h1>
      {!searchTerm && (
        <h3 className="text-3xl font-semibold text-center my-7">
          Be the first one to register a blog on the site!
        </h3>
      )}
    </>
  );
}

export default React.memo(AllPosts);
