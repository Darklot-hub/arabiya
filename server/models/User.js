import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    level: String,
    goal: String,
    progress: { type: Number, default: 0 },
    lastDiagnostic: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: true },
);
export default mongoose.model("User", userSchema);
