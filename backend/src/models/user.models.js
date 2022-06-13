const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    addresses: [
      {
        line_1: { type: String, required: true },
        line_2: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        PIN: { type: Number, required: true },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true, // createdAt, updatedAt
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
