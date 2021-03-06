const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    pdt_name: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "brand", required: true },
    description: { type: String, required: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category", required: true },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Product = mongoose.model("product", productSchema);

module.exports = Product;
