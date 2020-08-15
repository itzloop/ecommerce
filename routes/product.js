const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const verfyRole = require("../middlewares/verifyRole");
const { validateMultiple } = require("../middlewares/validation");
const Product = require("../models/Product");
const Category = require("../models/Category");

router.get("/", async (req, res) => {
  const products = await Product.find().populate("categories", [
    "name",
    "description",
  ]);
  res.json(products);
});

router.post(
  "/",
  verifyToken,
  verfyRole,
  validateMultiple("product"),
  async (req, res) => {
    const categories = await Category.find();
    const products = [];
    req.body.forEach(async (val) => {
      const categoryStr = val.categories;
      const actualCategories = [];
      if (categoryStr.length === 0)
        return res.status(400).json({ detail: `no category!` });
      categoryStr.forEach((cat) => {
        let index = categories.findIndex((val) => val.name === cat);
        if (index === -1)
          return res
            .status(404)
            .json({ detail: `${cat} is an invalid category!` });
        actualCategories.push(categories[index]._id);
      });
      val.categories = actualCategories;
      products.push(new Product(val));
    });

    try {
      const savedProduct = await Product.insertMany(products);
      res.json(savedProduct);
    } catch (e) {
      if (e.code === 11000)
        return res.status(409).json({ detail: "Product exists!" });
      return res.status(400).json({ detail: e.errmsg || e.message });
    }
  }
);

module.exports = router;
