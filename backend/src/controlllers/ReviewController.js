const express = require("express");
const Product = require("../models/product.model");
const Review = require("../models/review.model");
const router = express.Router();


router.post("/create", async (req, res) => {
  try {
    let review = await Review.create(req.body);
    res.status(201).send({ review, message: "success" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
router.get("/:idpdt/reviews", async (req, res) => {
  try {
    const product = await Product.findById(req.params.idpdt);
    const avgreview = await Product.aggregate([
      {
        $unwind: "$reviews",
      },
      {
        $group: {
          _id: null,
          ratingAvg: {
            $avg: "$reviews.rating",
          },
        },
      },
    ]);

    const reviews = product.reviews;

    return res.status(200).send({ data: reviews, rating: avgreview.ratingAvg });
  } catch (error) {
    console.log("error:", error);
    res.status(500).send({ error: error.message });
  }
});
router.post("/:idpdt/review/create", async (req, res) => {
  try {
    let review = await Review.create(req.body);
    // res.status(201).send({ brand, message: "success" });
    const product = await Product.updateOne({ _id: req.params.idpdt }, { $push: { reviews: review._id } });
    console.log(product);

    if (product.acknowledged === true) {
      const pdt = await Product.findById(req.params.idpdt).lean().exec();
      return res.status(201).send({ data: pdt.reviews, message: "success" });
    }
    return res.status(404).send({ message: "error", error: "something went wrong" });
  } catch (error) {
    console.log("error:", error);
    res.status(500).send({ error: error.message });
  }
});
router.patch("/:idpdt/review/:idrev/edit", async (req, res) => {
  //www.mongodb.com/docs/manual/reference/operator/update/positional/
  try {
    const adress = await Product.updateOne(
      { _id: req.params.idpdt, "reviews._id": req.params.idrev },
      { $set: { "reviews.$": req.body } },
      { new: true }
    );

    if (adress.acknowledged === true) {
      const product = await Product.findById(req.params.idpdt).lean().exec();

      return res.status(201).send({ data: product.reviews, message: "success" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
