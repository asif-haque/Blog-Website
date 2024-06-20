import React from "react";
import { Link } from "react-router-dom";
import { appWriteService } from "../appwrite/appwriteService";
import { convert } from "html-to-text";
import { readCount } from "../utils/readCount";
import { LuDot } from "react-icons/lu";

// the card, which displays our blogs as a preview and takes us to the longer/actual post
// featuredImg is an ID, which we will use to get a preview of the uploaded image through the appwrite method

export default function PostCard({
  $id,
  title,
  featuredImg,
  content,
  userName,
}) {
  return (
    // $id is a variable - dynamic routing
    <Link to={`/post/${$id}`}>
      <div className="flex gap-3 border-b pb-7 md:pb-10">
        <div className="flex-[1.75]">
          <h2 className="text-2xl font-extrabold mb-2">{title}</h2>
          <div className="line-clamp-2 md:line-clamp-3 mb-5 text-neutral-600 dark:text-neutral-400 text-sm">
            {convert(content)}
          </div>
          <div className="flex items-center gap-1">
            <div className="w-[1.5rem]">
              <img
                src="/images/userWithoutDp.png"
                className="size-full object-contain"
                alt=""
              />
            </div>
            <h3 className="text-md ml-2">{userName}</h3>
            <LuDot className="opacity-70" />
            <div className="text-sm opacity-70">
              {readCount(content)} min read
            </div>
          </div>
        </div>
        {featuredImg && (
          <div className="flex-[0.8] md:flex-[0.25] h-[6rem] md:h-[7rem] rounded-xl justify-center mt-2 overflow-hidden ">
            <img
              src={appWriteService.getTheFilePreview(featuredImg)}
              alt="preview image"
              className="size-full object-cover"
            />
          </div>
        )}
      </div>
    </Link>
  );
}
