const express = require("express");
const cors = require("cors");
const userController = require("./controlllers/user.controller");

const app = express();
app.use(cors());
app.use(express.json());

// const brandController = require("./controllers/brand.controller");
// const productController = require("./controllers/product.controller");

;

app.use("/users", userController);
// app.use("/brands", brandController);
// app.use("/products", productController);

module.exports = app;
