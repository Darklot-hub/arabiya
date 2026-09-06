import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    level: { type: String, required: true },
    goal: { type: String, required: true },
    description: String,
    content: String,
    module: String,
  },
  { timestamps: true },
);
export default mongoose.model("Lesson", schema);
