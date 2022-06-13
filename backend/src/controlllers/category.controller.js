const express = require("express");

const Category = require("../models/Categories.models");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let categories = await Category.find().lean().exec();
    return res.status(200).send({ data: categories, message: "success" });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/create", async (req, res) => {
  try {
    let category = await Category.create(req.body);
    res.send(category);
  } catch (error) {
    res.send(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).lean().exec();

    if (!category) {
      return res.status(404).send({ category, message: "category Not found" });
    }
    return res.status(200).send({ category, message: "success" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


router.patch("/:id/edit", async (req, res) => {
  try {
    let brand = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec();
    return res.status(201).send({ brand, message: "success" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
