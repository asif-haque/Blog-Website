import React from "react";
import { Link } from "react-router-dom";
import { appWriteService } from "../appwrite/appwriteService";

// the card, which displays our blogs as a preview and takes us to the longer/actual post
// featuredImg is an ID, which we will use to get a preview of the uploaded image through the appwrite method

export default function PostCard({ $id, title, featuredImg }) {
  return (
    // $id is a variable - dynamic routing
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appWriteService.getTheFilePreview(featuredImg)}
            alt="preview image"
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}
