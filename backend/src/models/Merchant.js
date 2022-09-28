const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
      min: 3,
    },
    brandName: {
        type: String,
        require: false,
      },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Merchant", merchantSchema);