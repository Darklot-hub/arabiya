import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title: String,
  type: { type: String, enum: ["speaking", "reading"] },
  description: String,
  schedule: String,
});
export default mongoose.model("Club", schema);
