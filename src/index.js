const express = require("express");
const cors = require("cors");
const userController = require("./controlllers/user.controller");
const productController = require("./controlllers/Products.controllers");
const brandController = require("./controlllers/Brand.controller");

const app = express();
app.use(cors());
app.use(express.json());


;

app.use("/users", userController);
app.use("/products", productController);

app.use("/brands", brandController);

module.exports = app;
