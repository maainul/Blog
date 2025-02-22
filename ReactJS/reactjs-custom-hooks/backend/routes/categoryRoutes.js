import express from "express";
import category from './../controllers/categoryCtrl.js';

const router = express.Router();

router.post("/category/create", category.createCategoryCtrl);
router.get("/category/list", category.listCategoryCtrl);

export default router;
