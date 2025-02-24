import React from "react";
import SkeletonCard from "./Skeleton/SkeletonCard";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const Card = ({ blogs = [] }) => {

  if (!Array.isArray(blogs) || blogs.length === 0) {
    return <p className="text-center text-gray-500">No blogs available.</p>;
  }

  return (
    <>
      {blogs.map((blog) => (
        <div
          className="bg-white flex flex-col rounded-lg hover:bg-blue-100 hover:cursor-pointer border border-violet-200"
          key={blog?._id || Math.random()}
        >
          <img
            src={
              blog?.image?.trim()
                ? `${API_BASE_URL}${blog.image}`
                : "https://images.unsplash.com/photo-1739546103938-b30b9b1c828d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="Blog Image"
            className="h-48 object-cover"
          />
          <div className="pt-2 pl-4 pb-4">
            <h1 className="font-bold mt-1 lg:text-2xl md:text-lg sm:text-base">
              {blog?.title || "Untitled Blog"}
            </h1>
            <p className="mb-4 mt-2">
              {blog?.description || "No description available."}
            </p>
            <a
              className="bg-blue-600 hover:bg-blue-800 hover:cursor-pointer rounded-xl px-4 py-2 text-white"
              href={`/blogs/${blog?._id || "#"}`}
            >
              Read More
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
