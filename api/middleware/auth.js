const jwt = require("jsonwebtoken");
const User = require("../models/user");

const {statusCodes, Messages} = require('../constant/index');
require("dotenv").config();


// <-------------------------------------------------Token & RBAC------------------------------------------------->
const checkAuth = async (req, res, next) => {
  try {
    const token = req.header('authToken');
    
    if (!token) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message:Messages.INVALID_TOK,
      });
    }
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById({ _id: decoded.userId });

    if (!user) {  
      return res.status(statusCodes.BAD_REQUEST).json({
        message:Messages.USER_IN_VAL
      })
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};


const roleAuth = (roles)=>{
  return (req,res,next)=>{
    if(roles.includes(req.user.role)){
      next();
    }else{
      return res.status(statusCodes.BAD_REQUEST).json({
        message:Messages.USER_IN_VAL
      })
    }
  }
}


module.exports = {
  checkAuth,
  roleAuth
};
