import Category from "../models/Category.js";
import sendResponse from "../utils/sendResponse.js";

export const createCategoryCtrl = async (req, res, next) => {

  const { name } = req.body;

  // Validate required fields
  if (!name) {
    return sendResponse(res, 400, "Name is required")
  }

  // Check if category already exists
  const exists = await Category.findOne({ name });
  console.log("exists", exists)
  if (exists) {
    return sendResponse(res, 400, "Category already exists!")
  }
  // save the category
  const newCat = new Category({
    name,
  });

  await newCat.save();
  return sendResponse(res, 201, "Category created successfully!", { newCat })
};

export const listCategoryCtrl = async (req, res, next) => {
  const categories = await Category.find(); // Fetch all categories
  return sendResponse(res, 201, "Category retrieve successfully!", { categories })
};

export default { createCategoryCtrl, listCategoryCtrl }
