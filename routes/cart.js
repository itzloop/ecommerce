const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const createUpdateQuery = require("../scripts/updateQuery");
const { validate } = require("../middlewares/validation");
// Base Url: /api/cart
router.get("/", verifyToken, async (req, res) => {
  try {
    let cart = await Cart.findOne({ _id: req.user.id });
    if (!cart) {
      cart = await new Cart({
        _id: req.user.id,
        products: [],
      }).save();
    }
    res.json(cart);
  } catch (e) {
    res.status(400).json({ detail: e.errmsg || e });
  }
});

router.get("/items", verifyToken, async (req, res) => {
  try {
    let cart = await Cart.findOne({ _id: req.user.id }).populate({
      path: "products.product",
      populate: {
        path: "categories",
        model: "Category",
        select: ["name", "description"],
      },
    });

    if (!cart) {
      cart = await new Cart({
        _id: req.user.id,
        products: [],
      }).save();
    }
    res.json(cart);
  } catch (e) {
    res.status(400).json({ detail: e.errmsg || e });
  }
});

router.delete("/items", verifyToken, async (req, res) => {
  try {
    await Cart.updateOne(
      { _id: req.user.id },
      { $set: { products: [], total: 0, totalQuantity: 0 } }
    );
    res.json({ detail: "cart cleared!" });
  } catch (e) {
    res.status(400).json({ detail: e.errmsg || e });
  }
});

router.post("/items", verifyToken, validate("cart"), async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.body.product });

    if (!product)
      return res.status(404).json({
        detail: `Product doesn't exists!`,
      });

    let cart = await Cart.findOne({ _id: req.user.id });
    if (!cart) {
      cart = await new Cart({
        _id: req.user.id,
        total: product.price,
        totalQuantity: 1,
        products: [
          {
            product: product._id,
            quantity: 1,
          },
        ],
      }).save();
    } else {
      if (
        cart.products.filter((val) => val.product.equals(product._id))
          .length !== 0
      )
        return res.status(409).json({
          detail: `${product.name} is already in your cart`,
        });
      cart.products.push({
        product: product._id,
        quantity: 1,
      });
      cart.totalQuantity++;
      cart.total += product.price;
      const updateQuery = createUpdateQuery("_id", cart._id, cart._doc);
      await Cart.updateOne(
        { ...updateQuery.condition },
        { ...updateQuery.update }
      );
    }

    return res.json({
      detail: `${product.name} added!`,
    });
  } catch (e) {
    res.status(400).json({ detail: e.errmsg || e });
  }
});

router.delete("/items/:itemId", verifyToken, async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.itemId });

    if (!product)
      return res.status(404).json({
        detail: `Product doesn't exists!`,
      });

    let cart = await Cart.findOne({ _id: req.user.id });
    if (!cart) {
      return res.status(404).json({
        detail: "No cart found!",
      });
    }
    if (cart.products.length === 0)
      return res.json({
        detail: "Cart is empty!",
      });
    if (
      cart.products.filter((val) => val.product.equals(product._id)).length ===
      0
    )
      return res.status(409).json({
        detail: `${product.name} is not in your cart`,
      });
    const index = cart.products.findIndex((val) =>
      val.product.equals(product._id)
    );

    cart.total -= product.price;
    cart.totalQuantity -= cart.products[index].quantity;
    cart.products = cart.products.filter((val, i) => index !== i);
    const updateQuery = createUpdateQuery("_id", cart._id, cart._doc);
    await Cart.updateOne(
      { ...updateQuery.condition },
      { ...updateQuery.update }
    );

    return res.json({
      detail: `${product.name} removed!`,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ detail: e.errmsg || e });
  }
});

router.put(
  "/items/:itemId",
  verifyToken,
  validate("cartQuantity"),
  async (req, res) => {
    const cart = await Cart.findOne({ _id: req.user.id });
    if (!cart)
      return res
        .status(404)
        .json({ detail: `no cart found for user ${req.user.id}` });
    const itemId = req.params.itemId;
    const products = cart.products.filter((val) => val.product.equals(itemId));
    if (products.length === 0)
      return res
        .status(404)
        .json({ detail: `product ${itemId} is not in the cart` });
    const product = await Product.findOne({ _id: itemId });
    const newPrice =
      cart.total -
      product.price * products[0].quantity +
      product.price * req.body.quantity;
    cart.totalQuantity += req.body.quantity - products[0].quantity;
    cart.total = newPrice;
    products[0].quantity = req.body.quantity;

    const updateQuery = createUpdateQuery("_id", cart._id, cart._doc);
    await Cart.updateOne(
      { ...updateQuery.condition },
      { ...updateQuery.update }
    );

    return res.json(cart);
  }
);

module.exports = router;
