const express = require("express");
const User = require("../models/user.models");
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).send({ succus: user });
  } catch (error) {
    console.log("error:", error);
    res.status(500).send({ message: "error", error: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    res.status(200).send({ succus: users });
  } catch (error) {
    console.log("error:", error);
    res.status(500).send({ message: "error", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean().exec();

    return res.status(200).send({ succus: user });
  } catch (error) {
    console.log("error:", error);
    res.status(500).send({ error: error.message });
  }
});

router.patch("/:id/edit", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send({ succus: user });
  } catch (error) {
    console.log("error:", error);
    res.status(500).send({ error: error.message });
  }
});

router.get("/:id/addresses", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const addresses = user.addresses;

    return res.status(201).send({ succus: addresses });
  } catch (error) {
    console.log("error:", error);
    res.status(500).send({ error: error.message });
  }
});

router.patch("/:id/addresses/create", async (req, res) => {
  try {
    const user = await User.updateOne({ _id: req.params.id }, { $push: { addresses: req.body } });

    return res.status(200).send({ succus: user });
  } catch (error) {
    console.log("error:", error);
    res.status(500).send({ error: error.message });
  }
});

router.patch("/:id/addresses/:idx/edit", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).send({ succus: user });
  } catch (error) {
    console.log("error:", error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
