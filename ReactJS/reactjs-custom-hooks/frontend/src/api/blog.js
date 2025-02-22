import axios from "axios";
import { handleApiError } from "./errorHandler";
import { API_URL } from './apiUrls';

// Fetch home page data
const getBlogList = async () => {
  try {
    const response = await axios.get(API_URL.BLOG_LIST);
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch category list
const getCategoryList = async () => {
  try {
    const response = await axios.get(API_URL.CATEGORY_LIST);
    return response.data.data.categories;
  } catch (error) {
    return handleApiError(error);
  }
};

// Add a new blog
const addBlog = async (formData, token) => {
  try {
    const response = await axios.post(API_URL.ADD_BLOG, formData, { headers: { "Content-Type": "multipart/form-data" } });
    return response.data;
  } catch (error) {
    const { message } = handleApiError(error);
    console.error("Error while adding blog:", error);
    throw new Error(message);
  }
};


export default { getBlogList, addBlog, getCategoryList }