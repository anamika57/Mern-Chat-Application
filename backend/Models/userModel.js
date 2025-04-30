const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  
  fullname: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    // validate: {
    //   validator: function (value) {
    //     // Regex for password complexity validation
    //     const passwordRegex =
    //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    //     return passwordRegex.test(value);
    //   },
    //   message:
    //     "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.",
    // },
  },
  email: {
    type: String,

    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  profilepic: {
    type: String,

    default: "",
  },
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
