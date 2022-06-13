const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user"},
    rating: { type: Number, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
