import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    password: { type: String },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
    role: { type: String, default: "user" },
    last_connection: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
