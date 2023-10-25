const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema(
  {
    fullname: {
      type: String, 
      required: false
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    }
  },
  {  
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
