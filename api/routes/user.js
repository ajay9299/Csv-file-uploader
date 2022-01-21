const router = require("express").Router();
const { Users } = require("../controller/index");

// Middleware functions
const { userSignUpValidation, userLogInValidation } = require("../validation/index");

router.post("/signup",userSignUpValidation , Users.postUser);
router.post("/login", userLogInValidation ,Users.loginUser);


module.exports = router;
