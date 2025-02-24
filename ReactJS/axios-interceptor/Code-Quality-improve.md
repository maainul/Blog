### **Option 1: Using a Higher-Order Function**

You can create a utility function that wraps your controller functions and automatically handles errors.

#### Step 1: Create a `catchAsync` Utility

```javascript
// utils/catchAsync.js
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
```

#### Step 2: Wrap Your Controllers with `catchAsync`

```javascript
import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import Category from "../models/Category.js";
import sendResponse from './../utils/sendResponse.js';
import catchAsync from './../utils/catchAsync.js';

const createBlogCtrl = catchAsync(async (req, res, next) => {
  const { title, category, content } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  // Validate required fields
  if (!title || !category || !content) {
    return sendResponse(res, 400, "Title, category, and content are required!");
  }

  // Create and save the blog in MongoDB
  const newBlog = new Blog({
    title,
    category,
    content,
    image: imageUrl,
  });

  await newBlog.save();
  sendResponse(res, 201, "Blog created successfully!", newBlog);
});

// List of blogs
const listBlogCtrl = catchAsync(async (req, res, next) => {
  const { categoryId } = req.query;

  let categoryFilter = {};
  if (categoryId) {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return sendResponse(res, 400, 'Invalid category ID format.');
    }

    const categoryExists = await Category.exists({ _id: categoryId });
    if (!categoryExists) {
      return sendResponse(res, 404, "Category not found");
    }
    categoryFilter = { _id: categoryId };
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

  sendResponse(res, 200, "Blog retrieve successfully.", { categoryPosts });
});

export default { createBlogCtrl, listBlogCtrl };
```

---

### **How It Works**

1. **`catchAsync` Function**:
   - It takes a controller function (`fn`) as input.
   - It returns a new function that automatically calls `.catch(next)` on the promise returned by `fn`.
   - If an error occurs, it passes the error to the `next` function (which will be handled by your error-handling middleware).

2. **Wrapping Controllers**:
   - You wrap your controller functions with `catchAsync` to automatically handle errors.

---

### **Option 2: Using Express Middleware**

If you prefer not to wrap every controller manually, you can use **Express middleware** to handle errors globally.

#### Step 1: Define Your Controllers Without `try-catch`

```javascript
import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import Category from "../models/Category.js";
import sendResponse from './../utils/sendResponse.js';

const createBlogCtrl = async (req, res, next) => {
  const { title, category, content } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  // Validate required fields
  if (!title || !category || !content) {
    return sendResponse(res, 400, "Title, category, and content are required!");
  }

  // Create and save the blog in MongoDB
  const newBlog = new Blog({
    title,
    category,
    content,
    image: imageUrl,
  });

  await newBlog.save();
  sendResponse(res, 201, "Blog created successfully!", newBlog);
};

// List of blogs
const listBlogCtrl = async (req, res, next) => {
  const { categoryId } = req.query;

  let categoryFilter = {};
  if (categoryId) {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return sendResponse(res, 400, 'Invalid category ID format.');
    }

    const categoryExists = await Category.exists({ _id: categoryId });
    if (!categoryExists) {
      return sendResponse(res, 404, "Category not found");
    }
    categoryFilter = { _id: categoryId };
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

  sendResponse(res, 200, "Blog retrieve successfully.", { categoryPosts });
};

export default { createBlogCtrl, listBlogCtrl };
```

#### Step 2: Add Error-Handling Middleware

In your main app file (e.g., `app.js` or `server.js`), add the error-handling middleware:

```javascript
import express from "express";
import blogController from "./controllers/blogController.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.post("/blogs", blogController.createBlogCtrl);
app.get("/blogs", blogController.listBlogCtrl);

// Error-handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

#### Step 3: Error-Handling Middleware

Create an error-handling middleware (e.g., `middlewares/errorHandler.js`):

```javascript
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error.";

  sendResponse(res, statusCode, message);
};

export default errorHandler;
```

---

### **Key Differences Between the Two Approaches**

| **Approach**              | **Pros**                                                                 | **Cons**                                                                  |
| ------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| **Higher-Order Function** | - Explicitly wraps controllers. <br> - Easy to understand and implement. | - Requires wrapping each controller manually.                             |
| **Express Middleware**    | - Global error handling. <br> - No need to modify controllers.           | - Less explicit (errors are handled globally, which might be less clear). |

---

### **Which One Should You Use?**

- If you want **explicit error handling** and don’t mind wrapping your controllers, use the **higher-order function** approach.
- If you prefer **global error handling** and want to avoid modifying your controllers, use the **Express middleware** approach.

---

### **Final Thoughts**

Both approaches are valid and widely used in production. The **higher-order function** approach is more explicit and easier to debug, while the **Express middleware** approach is more concise and scalable for larger applications.

Let me know if you need further clarification or help implementing either approach! 😊


## Can Use Winston 

```js
import winston from "winston";

const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

const errorHandler = (err, req, res, next) => {
  logger.error("Error:", {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    body: req.body,
  });

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error.";

  sendResponse(res, statusCode, message);
};

export default errorHandler;
```