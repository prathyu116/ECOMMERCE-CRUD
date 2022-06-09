const express = require("express");
const Brand = require("../models/brand.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let brands = await Brand.find().lean().exec();
    res.status(200).send({ brands, message: success });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    let brand = await Brand.create(req.body).lean().exec();
    res.status(201).send({ brand, message: "success" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id).lean().exec();

    if (!brand) {
      return res.status(404).send({ brand, message: "Brand Not found" });
    }
    return res.status(200).send({ brand, message: "success" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.patch("/:id/edit", async (req, res) => {
  try {
    let brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec();
    return res.status(201).send({ brand, message: "success" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
