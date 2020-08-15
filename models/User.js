const mongoose = require("mongoose");
const roles = {
  admin: "admin",
  user: "user",
};
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },

    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    role: {
      type: String,
      default: roles.user,
      validate: {
        validator: (val) => Object.keys(roles).includes(val),
        message: (props) => `${props.value} is not a valid role`,
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
