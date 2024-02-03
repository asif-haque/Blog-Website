import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { appWriteService } from "../appwrite/appwriteService";
import PostCard from "../components/PostCard";
import Container from "../components/container/Container";
import AllPosts from "./AllPosts";

export default function Home() {
  const authStatus = useSelector((state) => state.auth.status);

  // const [posts, setposts] = useState();
  // useEffect(() => {
  //   const fn = async () => {
  //     const documentList = await appWriteService.getPosts(); // has two keys - total and documents
  //     setposts(documentList.documents);
  //   };
  //   fn();
  // }, []);

  if (!authStatus) {
    return (
      <h1 className="text-4xl font-extrabold text-center my-7">
        Login to read posts.
      </h1>
    );
  }

  return <AllPosts />;
  // return posts.length === 0 ? (
  //   <div className="w-full py-8">
  //     <Container>
  //       <div className="flex flex-wrap">
  //         {posts.map((post) => (
  //           <div key={post.$id} className="p-2 w-1/4">
  //             <PostCard {...post} />
  //           </div>
  //         ))}
  //       </div>
  //     </Container>
  //   </div>
  // ) : (
  //   <>
  //     <h1>Welcome to the Website!</h1>
  //     <h3>Be the first one to register a blog on the site!</h3>
  //   </>
  // );
}
