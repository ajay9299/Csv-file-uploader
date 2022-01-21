const Joi = require("joi");


// <-------------------------------------------------------Joi Validation------------------------------------------------------->
exports.userSignUpValidation = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string()
      .regex(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/)
      .required(),
    role: Joi.string(),
    password: Joi.string()
      .length(8)
      .regex(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}/)
      .required(),
    repeat_password: Joi.string().length(8)
      .regex(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}/)
      .required(),
  });
  try {
    const value = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

exports.userLogInValidation = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string()
      .regex(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/)
      .required(),
    password: Joi.string()
      .length(8)
      .regex(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}/)
      .required(),
  });

  try {
    const value = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

exports.insertDataValidation = async (req, res, next) => {
  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    rollnumber:Joi.string().length(4).regex(/^[3-9]+$/).required(),
    phonenumber: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
  });
  try {
    const value = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};


exports.updateValidation = async (req,res,next)=>{
  const schema = Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    rollnumber: Joi.string()
      .length(4)
      .regex(/^[3-9]+$/),
    phonenumber: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
  });
  try {
    const value = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
}
