# Axios Interceptor :

1. Add Select option for category . after selection user can see based on the category.for that upate the useFetch to receive pamas.

```js
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

```

2. Update Sevice to receive params :
```js
import { API_URL } from "../api/apiUrls";
import axiosInstance from "../utils/axiosInstance";

// Fetch home page data
const getBlogList = async (categoryId) => {
    const params = categoryId ? { categoryId } : {}
    const response = await axiosInstance.get(API_URL.BLOG_LIST, { params });
    return response.data.data;

};

// Fetch category list
const getCategoryList = async () => {
    const response = await axiosInstance.get(API_URL.CATEGORY_LIST);
    // console.log(response.data.data.categories)
    return response.data.data.categories;

};

// Add a new blog
const addBlog = async (formData, token) => {
    const response = await axiosInstance.post(API_URL.ADD_BLOG, formData, { headers: { "Content-Type": "multipart/form-data" } });
    return response.data;
}

export default { getBlogList, addBlog, getCategoryList }
```

3. useFetch () hooks update that receive parmas
```js
import { useEffect, useState } from "react";


const useFetch = (apiFunction, params = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  console.log("🚀 Initial loading state:", loading);

  useEffect(() => {
    console.log("⚡ Setting loading to true...");
    setLoading(true);
    setError(null)
    const fetchData = async () => {
      try {
        console.log("⏳ Fetching data...");
        const result = await apiFunction(...params)
        setData(result);
        console.log("✅ Data fetched successfully!");
      } catch (error) {
        setError(error.message);
        console.error("❌ Error fetching data:", error);
      } finally {
        setLoading(false);
        console.log("🔄 Loading set to false");
      }
    };
    fetchData();

  }, [apiFunction, ...params]);

  return { data, loading, error };
};

export default useFetch;
```

4. crate erroMessage.js for centralize error code and custom message
```js
const ERROR_MESSAGE = {
    400: "Bad Request.Please try again",
    401: "You are not authorized to view this resource.Please log in.",
    403: "You are not have permission to perform this section.",
    404: "Resource not found",
    408: "Request timeout.Pleas try agin",
    500: "An unpexted server error occurred. Please try again later.",
    502: "Bad Gateway. The server is down or being upgraded",
    503: "Service unavailable.Please try again later",
    504: "Gateway timeout.Please try again later",
    GENERIC_ERROR: "Something went wrong.Please try agin.",
    NETWORK_ERROR: "Network error, unable to reach the server.Please check your connection.",
    REQUEST_ERROR: "Network error, unable to reach the server.Please check your connection."
}

export default ERROR_MESSAGE;

```

5. AxiosInstnance File for axios
```js

import axios from 'axios';
import { toast } from "react-toastify"

import ERROR_MESSAGE from './../config/errorMessages';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:8081/"
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        let message = ERROR_MESSAGE.GENERIC_ERROR
        if (error.response) {
            const { status } = error.response
            message = ERROR_MESSAGE[status] || ERROR_MESSAGE.GENERIC_ERROR;
        } else if (error.request) {
            message = ERROR_MESSAGE.REQUEST_ERROR
        }
        else {
            message = ERROR_MESSAGE.NETWORK_ERROR;
        }
        toast.error(message)
        return Promise.reject(new Error(message));
    }
)

export default axiosInstance
```