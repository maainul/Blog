import React from "react";
import RecentPostsSidebar from "./RecentPostsSidebar";
import Categories from "./Categories";
import SearchBar from "./SearchBar";
import Newsletter from "./Newsletter";

const Sidebar = ({ categories, recentPosts, loading }) => {
  console.log("Sidebar Components rendered")
  return (
    <>
      <div className="bg-gray-50 border-l">
        {/* Search Box */}
        <SearchBar loading={loading} />
        {/* Category Of Blogs */}
        <Categories categories={categories} loading={loading} />
        {/* 10 Recent Blogs */}
        <RecentPostsSidebar posts={recentPosts} loading={loading} />
        {/* Newsletter Subscription */}
        <Newsletter loading={loading} />
      </div>
    </>
  );
};

export default Sidebar;
