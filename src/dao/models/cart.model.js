import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    products: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: { type: Number, default: 1 },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

cartSchema.pre("find", function () {
  this.populate("products.product");
});

export default mongoose.model("Cart", cartSchema);
