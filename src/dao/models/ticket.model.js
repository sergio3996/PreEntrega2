import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    code: { type: String, unique: true },
    amount: { type: Number },
    purchaser: { type: String },
  },
  {
    timestamps: {
      createdAt: "purchase_datetime",
      updatedAt: "purchase_update_datetime",
    },
  }
);

export default mongoose.model("Ticket", ticketSchema);
