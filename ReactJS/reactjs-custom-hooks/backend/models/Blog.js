import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, // Reference to Category
  },
  { timestamps: true }
);

export default mongoose.model("Blog", BlogSchema);
