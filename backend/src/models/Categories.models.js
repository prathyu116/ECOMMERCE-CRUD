const mongoose = require("mongoose");

const CategoryShema = new mongoose.Schema(
  {
    category_name: { type: String, required: true },
    category_img: { type: String, required: true },
    sub_category: [{ type: String }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Category = mongoose.model("category", CategoryShema);
module.exports = Category;
