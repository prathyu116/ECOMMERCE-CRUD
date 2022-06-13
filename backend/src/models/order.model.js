const mongoose = require("mongoose");

const OrderShema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    prod_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "product", required: true }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Order = mongoose.model("order", OrderShema);
module.exports = Order;
