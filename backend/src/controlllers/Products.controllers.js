const express = require("express");
const Product = require("../models/product.model");
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    return res.status(201).send({ product, message: "success" });
  } catch (error) {
    console.log("error:", error);
    res.status(500).send({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("brand").populate("category").lean().exec();

    res.status(200).send({ products, message: "success" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id).lean().exec();

//     if (!product) {
//       return res.status(404).send({ data: product, message: "error", error: "User Not found.." });
//     }
//     return res.status(200).send({ data: product, message: "success" });
//   } catch (error) {
//     console.log("error:", error);
//     res.status(500).send({ error: error.message });
//   }
// });
router.get("/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category }).populate("brand").lean().exec();
    return res.status(201).send({ products, message: "success" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.patch("/:id/edit", async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send({ product, message: "success" });
  } catch (error) {
    console.log("error:", error);
    res.status(500).send({ error: error.message });
  }
});

router.delete("/:id/delete", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send({ product, message: "success" });
  } catch (error) {
    console.log("error:", error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
