import { API_URL } from "../api/apiUrls";
import handleApiError from "../api/errorHandler";
import axiosInstance from "../utils/axiosInstance";

// Fetch home page data
const getBlogList = async () => {
    // try {
    console.log("######################## 111")
    const response = await axiosInstance.get(API_URL.BLOG_LIST);
    console.log("######################## 2222")
    return response.data.data;
    // } catch (error) {
    //     return handleApiError(error);
    // }
};

// Fetch category list
const getCategoryList = async () => {
    try {
        const response = await axiosInstance.get(API_URL.CATEGORY_LIST);
        return response.data.data.categories;
    } catch (error) {
        return handleApiError(error);
    }
};

// Add a new blog
const addBlog = async (formData, token) => {
    try {
        const response = await axiosInstance.post(API_URL.ADD_BLOG, formData, { headers: { "Content-Type": "multipart/form-data" } });
        return response.data;
    } catch (error) {
        const { message } = handleApiError(error);
        console.error("Error while adding blog:", error);
        throw new Error(message);
    }
};


export default { getBlogList, addBlog, getCategoryList }