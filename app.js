const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const cartRouter = require("./routes/cart");
const categoriesRouter = require("./routes/category");
const productRouter = require("./routes/product");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(compression());

// Routes
app.use("/api/users", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/products", productRouter);

mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.error("Failed to Connect To Database!");
      return;
    }
    return console.log("Connected to Database!");
  }
);

module.exports = app;
