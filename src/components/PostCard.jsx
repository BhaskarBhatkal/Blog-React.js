import React from "react";
import appwriteService from "../appwrite/config.appwrite";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-[#103f57] rounded-xl text-[#e4f0fa] p-4">
        <div className="w-full justify-center mb-4 ">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl max-h-60 w-full h-60"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
