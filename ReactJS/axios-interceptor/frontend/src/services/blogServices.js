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