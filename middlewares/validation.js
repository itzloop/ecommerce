const Joi = require("@hapi/joi");

const registerSchema = {
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
};

const loginSchema = {
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
};

const categorySchema = {
  name: Joi.string().required(),
  description: Joi.string().required(),
};
const productSchema = {
  name: Joi.string().required(),
  price: Joi.number().required(),
  discount: Joi.number(),
  in_stock: Joi.number().required(),
  description: Joi.string().required(),
  categories: Joi.array().required(),
};

const cartSchema = {
  product: Joi.string().required(),
};

const cartQuantitySchema = {
  quantity: Joi.number().integer().min(0).max(10).required(),
};

function validateHelper(key, obj) {
  switch (key) {
    case "register":
      return Joi.validate(obj, registerSchema);
    case "login":
      return Joi.validate(obj, loginSchema);
    case "category":
      return Joi.validate(obj, categorySchema);
    case "product":
      return Joi.validate(obj, productSchema);
    case "cart":
      return Joi.validate(obj, cartSchema);
    case "cartQuantity":
      return Joi.validate(obj, cartQuantitySchema);
    default:
      break;
  }
}

exports.validate = (key) => (req, res, next) => {
  const validation = validateHelper(key, req.body);
  if (validation.error)
    return res.status(400).json({
      detail: validation.error.details[0].message,
    });
  req.body = validation.value;
  next();
};

exports.validateMultiple = (key) => (req, res, next) => {
  if (!Array.isArray(req.body)) {
    req.body = [req.body];
  }

  req.body.forEach((element, i) => {
    const validation = validateHelper(key, element);
    if (validation.error)
      return res.status(400).json({
        detail: validation.error.details[0].message,
      });
    req.body[i] = validation.value;
  });

  next();
};
