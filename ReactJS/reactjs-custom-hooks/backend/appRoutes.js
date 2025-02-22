
import blogRoutes from "./routes/blogRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js"

const setupRoutes = (app) => {
  app.use("/", blogRoutes);
  app.use("/", categoryRoutes);
};

export default setupRoutes;
