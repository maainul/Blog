import React from "react";

import BlogList from "./BlogList";
import SkeletonCard from "../../components/Skeleton/SkeletonCard";
import Error from "../../components/Error";
import useFetch from "../../hooks/useFetch";

const Blogs = () => {

    const { data, loading, error } = useFetch("http://localhost:8081/blogs")

    return (
        <>
            <div className="container mx-auto bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-4">
                    {error ? <Error error={error} /> : loading ? <SkeletonCard /> : <BlogList posts={data?.categoryPosts || []} />}
                </div>
            </div>
        </>
    );
};

export default Blogs;
