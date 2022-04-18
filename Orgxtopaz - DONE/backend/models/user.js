

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique:true
  },
  password: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  birthday: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model('User', UserSchema);








// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const Joi = require("joi");
// const passwordComplexity = require("joi-password-complexity");

// const userSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     require: true,
//   },
//   lastName: {
//     type: String,
//     require: true,
//   },
//   email: {
//     type: String,
//     require: true,
//   },
//   password: {
//     type: String,
//     require: true,
//   },
// });

// //method return JWT for the specify user
// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, process.env.PRIVATEKEY, {
//     expiresIn: "7d",
//   });
//   return token;
// };

// const User = mongoose.model("User", userSchema);

// const validate = (data) => {
//   const schema = Joi.object({
//     firstName: Joi.string().require().label("First Name"),
//     lastName: Joi.string().require().label("Last Name"),
//     email: Joi.string().email().require().label("Email"),
//     password: passwordComplexity().require().label("Password"),
//   });
//   return schema.validate(data);
// };

// module.exports = ( User, validate );
