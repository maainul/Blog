import express from "express";
import upload from "../middlewares/upload.js";
import blog from "../controllers/blogCtrl.js";

const router = express.Router();
// get all blogs for admin
router.get("/blogs", blog.listBlogCtrl);
router.post("/blogs/create", upload.single("image"), blog.createBlogCtrl);

export default router;
