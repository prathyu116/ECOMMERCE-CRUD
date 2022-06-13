const express = require("express");
const cors = require("cors");
const userController = require("./controlllers/user.controller");
const productController = require("./controlllers/Products.controllers");
const brandController = require("./controlllers/Brand.controller");
const categoryController = require("./controlllers/category.controller");
const reviewController = require("./controlllers/ReviewController");
const { login } = require("./controlllers/AuthController");

const app = express();
app.use(cors());
app.use(express.json());


;

app.use("/users", userController);
app.use("/products", productController);
app.use("/category", categoryController);
app.use("/brands", brandController);
app.use("/review", reviewController);
app.post("/login", login);

module.exports = app;
