import Category from "../models/Category.js";

export const createCategoryCtrl = async (req, res) => {
  try {
    const { name } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required!",
      });
    }

    // Check if category already exists
    const exists = await Category.findOne({ name });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Category already exists!",
      });
    }
    // save the category
    const newCat = new Category({
      name,
    });

    await newCat.save();

    return res.status(201).json({
      success: true,
      message: "Category created successfully!",
      data: newCat,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({ success: false, message: "Server error!" });
  }
};

export const listCategoryCtrl = async (req, res) => {
  try {
    const categories = await Category.find(); // Fetch all categories
    return res.status(201).json({
      success: true,
      message: "category list successfully",
      data: {
        categories,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "server error",
      data: error,
    });
  }
};

export default { createCategoryCtrl, listCategoryCtrl }