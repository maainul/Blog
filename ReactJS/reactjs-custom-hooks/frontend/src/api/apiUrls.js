const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const API_URL = {
    ADD_BLOG: `${API_BASE_URL}/blog/create`,
    BLOG_LIST: `${API_BASE_URL}/blogs`,
    CATEGORY_LIST: `${API_BASE_URL}/category/list`


}