const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "student",
      enum: ["teacher", "student", "admin"],
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
