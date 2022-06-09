const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    pdt_name: { type: String, required: true },
    pdt_img: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "brand", required: true },

    description: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
