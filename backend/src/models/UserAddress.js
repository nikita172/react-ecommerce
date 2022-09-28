const mongoose = require("mongoose");

const userAddress = new mongoose.Schema(
  {
    email: {
      type: String,
      max: 50,
    },
    location: {
      type: String,
      required: true,
      max: 50,
    },
    city: {
      type: String,
      required: true,
      max: 50,
    },
    mobile: {
      type: Number,
      required:true,
      
    },
    name: {
      type: String,
      required: true,
      max: 50,
    },
    pincode: {
      type: String,
      required: true,
      max: 50,
    },
    saveAddress: {
      type: String,
      max: 50,
    },
    state: {
      type: String,
      required: true,
      max: 50,
    },
    town: {
      type: String,
      required: true,
      max: 50,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserAddress", userAddress);