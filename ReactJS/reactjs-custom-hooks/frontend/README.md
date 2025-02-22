### **When to Use Lazy Loading?**
1. **Rarely Visited Pages**  
   - If a page is not frequently visited, such as an admin panel (`/admin/blogs`) or user profile (`/user/profile`), lazy loading can help reduce the initial bundle size.
  
2. **Heavy Components**  
   - Pages with a lot of content (e.g., dashboards with charts, reports, or blog details pages) should be lazy-loaded to prevent the main bundle from being too large.

3. **Authenticated or Role-Based Pages**  
   - Pages that require login (e.g., `/dashboard`, `/user/profile`, `/blog/add`) don’t need to be loaded initially. These can be lazy-loaded after the user logs in.

4. **Less Frequently Used Modals or Forms**  
   - Pages like `AddBlog` (if it's only accessible to certain users) can be lazy-loaded.

---

### **When Not to Use Lazy Loading?**
1. **Critical & Frequently Used Pages**  
   - Pages like `Login`, `Registration`, and `Blogs` should load immediately since they are often visited first.

2. **Pages on the Initial Load Path**  
   - The homepage (`/`), the blog listing (`/blogs`), and authentication pages should be eagerly loaded for a smooth user experience.

---

### **Optimized Code Using React Lazy & Suspense**
You can optimize your `App.js` by lazy-loading less frequently accessed components:  

```jsx
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { logout, setUserData } from "./features/auth/authSlice";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "./pages/layout/dashboard/MainLayout";
import Blogs from "./pages/blog/Blogs";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";

// Lazy-loaded components
const Dashboard = lazy(() => import("./pages/layout/dashboard/Dashboard"));
const BlogDetails = lazy(() => import("./pages/blog/BlogDetails"));
const CategoryWiseBlogList = lazy(() =>
  import("./pages/blog/CategoryWiseBlogList")
);
const AddBlog = lazy(() => import("./pages/blog/AddBlog"));
const UserProfile = lazy(() => import("./pages/auth/UserProfile"));
const AdminBlogList = lazy(() => import("./pages/blog/AdminBlogList"));
const Error = lazy(() => import("./pages/Error"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const token = Cookies.get("authToken");
    const tokenExpiry = localStorage.getItem("tokenExpiry");
    if (userData && token) {
      const parsedUserData = JSON.parse(userData);
      const currentTime = Date.now();
      if (tokenExpiry && currentTime < tokenExpiry) {
        dispatch(setUserData({ data: parsedUserData, token }));
      } else {
        dispatch(logout());
      }
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />
        <Route
          path="/register"
          element={
            <MainLayout>
              <Registration />
            </MainLayout>
          }
        />
        <Route
          path="/"
          element={
            <MainLayout>
              <Blogs />
            </MainLayout>
          }
        />
        <Route
          path="/blogs"
          element={
            <MainLayout>
              <Blogs />
            </MainLayout>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MainLayout>
                <BlogDetails />
              </MainLayout>
            </Suspense>
          }
        />
        <Route
          path="/blogs/category/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MainLayout>
                <CategoryWiseBlogList />
              </MainLayout>
            </Suspense>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <MainLayout>
                  <AdminBlogList />
                </MainLayout>
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <MainLayout>
                  <UserProfile />
                </MainLayout>
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog/add"
          element={
            <ProtectedRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <MainLayout>
                  <AddBlog />
                </MainLayout>
              </Suspense>
            </ProtectedRoute>
          }
        />

        {/* Error Route */}
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MainLayout>
                <Error />
              </MainLayout>
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

### **Key Optimizations**
✅ **Lazy Load Heavy & Rarely Used Pages:** `Dashboard`, `BlogDetails`, `CategoryWiseBlogList`, `AdminBlogList`, `UserProfile`, `AddBlog`, and `Error` pages.  
✅ **Eager Load Critical Pages:** `Login`, `Register`, `Blogs` (since they are accessed frequently).  
✅ **Use Suspense for Lazy Components:** To show a fallback UI while loading.  

---

### **Expected Benefits**
- 📉 **Reduced Initial Load Time**: Since the main bundle is smaller, users see the first page faster.  
- 🚀 **Better Performance**: Heavy pages only load when required, reducing the browser's workload.  
- 🎯 **Optimized User Experience**: Users don’t experience unnecessary delays on the most visited pages.  

Would you like further improvements, such as code splitting for routes? 😊



## 🚀 Advanced Performance Optimizations

1️⃣ Optimize Lazy Loading with Route-Based Code Splitting