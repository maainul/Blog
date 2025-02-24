import Blog from "../models/Blog.js";
import Category from "../models/Category.js";

const createBlogCtrl = async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Validate required fields
    if (!title || !category || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, category, and content are required!",
      });
    }

    // Create and save the blog in MongoDB
    const newBlog = new Blog({
      title,
      category,
      content,
      image: imageUrl,
    });

    await newBlog.save();

    return res.status(201).json({
      success: true,
      message: "Blog created successfully!",
      data: newBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({ success: false, message: "Server error!" });
  }
};

// list of blog only for admin
const listBlogCtrl = async (req, res) => {
  try {
    const categories = await Category.find().select("name");

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

    return res.status(401).json({
      success: true,
      message: "blog list successfully",
      data: {
        categoryPosts,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "error in blog list",
      data: error,
    });
  }
};

export default { createBlogCtrl, listBlogCtrl }