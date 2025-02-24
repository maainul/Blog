import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import Category from "../models/Category.js";
import sendResponse from './../utils/sendResponse.js';

const createBlogCtrl = async (req, res, next) => {

  const { title, category, content } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  // Validate required fields
  if (!title || !category || !content) {
    return sendResponse(res, 400, "Title, category, and content are required!")
  }

  // Create and save the blog in MongoDB
  const newBlog = new Blog({
    title,
    category,
    content,
    image: imageUrl,
  });

  await newBlog.save();
  return sendResponse(res, 201, "Blog created successfully!", newBlog)
};

// list of blog
const listBlogCtrl = async (req, res, next) => {

  const { categoryId } = req.query;

  let categoryFilter = {};
  if (categoryId) {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return sendResponse(res, 400, 'Invalid category ID format.')
    }

    const categoryExists = await Category.exists({ _id: categoryId })
    if (!categoryExists) {
      return sendResponse(res, 404, "Category not found")
    }
    categoryFilter = { _id: categoryId }
  }

  const categories = await Category.find(categoryFilter).select("name");
  const categoryPosts = await Promise.all(
    categories.map(async (category) => {
      const recentPosts = await Blog.find({ category: category._id }) // Query using category ID
        .sort({ createdAt: -1 })
        .select("title image content");
      return {
        category: category.name,
        posts: recentPosts,
      };
    })
  );

  return sendResponse(res, 200, "Blog retrieve successfully.", { categoryPosts })

};

export default { createBlogCtrl, listBlogCtrl }
