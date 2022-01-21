const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const User = require("../models/user");
const { statusCodes, Messages } = require("../constant/index");

exports.postUser = async (req, res, next) => {
  try {
    const data = await User.find({ username:req.body.username });

    if (data.length >= 1) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message: Messages.USER_EXS,
      });
    }

    const hashPass = await bcrypt.hash(req.body.password, 10);
    const userObj = {
      _id: mongoose.Types.ObjectId(),
      username:req.body.username,
      role: req.body.role,
      phone: req.body.phone,
      password: hashPass,
    };

    await User.create(userObj);
    res.status(statusCodes.OK).json({
      message: Messages.SUCC_SIGN_UP,
    });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    
    const user = await User.find({ username: req.body.username});

    if (user.length === 0) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message: Messages.USER_IN_VAL,
      });
    }

    const check = await bcrypt.compare(req.body.password, user[0].password);

    if (!check) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message: Messages.USER_IN_VAL,
      });
    }

    const token = jwt.sign(
      {
        username: user[0].username,
        userId: user[0]._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.status(statusCodes.OK).json({
      message: Messages.LOGIN_SUCC,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
