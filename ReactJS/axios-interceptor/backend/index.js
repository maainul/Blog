import express from "express";
import setupRoutes from "./appRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "./connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import errorHandler from "./utils/errorHandler.js";

const app = express();

dotenv.config();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // Serve uploaded images
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
  })
);
const PORT = 8081;

setupRoutes(app);
app.use(errorHandler)

// Monitor memory usage
setInterval(() => {
  const memoryUsage = process.memoryUsage();
  console.log(`Memory usage: ${memoryUsage.rss / 1024 / 1024} MB`);
}, 10000);

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});

export default app;
