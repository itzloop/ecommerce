const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const verfyRole = require("../middlewares/verifyRole");
const { validateMultiple } = require("../middlewares/validation");
const Category = require("../models/Category");
const Product = require("../models/Product");
// Base Url: /api/categories

router.get("/", async (req, res) => {
  categories = await Category.find();
  res.json(categories);
});

router.delete("/", verifyToken, verfyRole, async (req, res) => {
  try {
    await Category.deleteMany();
    res.json({ detail: "All Categories Has Been Deleted!" });
  } catch (e) {
    res.json({ detail: e.errmsg });
  }
});

router.get("/:category", async (req, res) => {
  try {
    const { _id } = await Category.findOne({ name: req.params.category });
    console.log(_id);
    const products = await Product.find({ categories: { $in: _id } });
    res.json(products);
  } catch (e) {
    res.status(400).json({
      detail: e,
    });
  }
});

router.post(
  "/",
  verifyToken,
  verfyRole,
  validateMultiple("category"),
  async (req, res) => {
    let body = req.body;
    if (!Array.isArray(body)) {
      body = [req.body];
    }
    const categories = [];
    req.body.forEach((val) => {
      categories.push(
        new Category({
          name: val.name,
          description: val.description,
        })
      );
    });
    try {
      const savedCategory = await Category.insertMany(categories);
      res.json(savedCategory);
    } catch (e) {
      if (e.code === 11000)
        return res.status(409).json({ detail: "Category exists!" });
      return res.status(400).json({ detail: e.errmsg });
    }
  }
);

module.exports = router;

//Beauty & Personal Care
//Clothing
//Digital
//Books
//Electronics
//Movies & TV
//Home & Kitchen
//Software
//Video Games

// [
//   {
//       "name": "personal-appliance",
//       "description": "Beauty & Personal Care"

//   },
//   {
//       "name": "clothing",
//       "description": "Clothing"

//   },
//   {
//       "name": "digital",
//       "description": "Digital"

//   },
//   {
//       "name": "books",
//       "description": "Books"

//   },
//   {
//       "name": "electronics",
//       "description": "Electronics"

//   },
//   {
//       "name": "movie-and-tv",
//       "description": "Movies & TV"

//   },
//   {
//       "name": "home-and-Kitchen",
//       "description": "Home & Kitchen"

//   },
//   {
//       "name": "software",
//       "description": "Software"
//   },
//   {
//       "name": "video-games",
//       "description": "Video Games"
//   },
// ]
