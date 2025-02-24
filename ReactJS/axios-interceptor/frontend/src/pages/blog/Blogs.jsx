import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";

import BlogList from "./BlogList";
import Error from "../../components/Error";
import blogServices from './../../services/blogServices';
import SkeletonCard from "../../components/Skeleton/SkeletonCard";

const Blogs = () => {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const { data: categoryData, loading: categoryLoading, error: categoryError } = useFetch(blogServices.getCategoryList)
    const { data, loading, error } = useFetch(blogServices.getBlogList, [selectedCategory])

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId)
    }

    return (
        <>
            <div className="container mx-auto bg-gray-50">
                <div className="bg-gray-100 w-full border px-1 py-2">
                    <select
                        className="bg-gray-100 rounded-md ring-red-300 w-full"
                        onChange={handleCategoryChange}
                        value={selectedCategory || ""}
                    >
                        <option value={""}>--All--</option>
                        {categoryData?.map((cat) => (
                            <option value={cat._id} key={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">

                    {error ? <Error error={error} /> : loading ? <SkeletonCard /> :
                        <>

                            <BlogList posts={data?.categoryPosts || []} />
                        </>
                    }
                </div>
            </div>
        </>
    );
};

export default Blogs;
