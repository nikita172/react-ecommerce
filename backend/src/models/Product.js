const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      require: true,
    },
    merchantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Merchant"
    },
    companyName: {
      type: String,
      require: true,
    },
    mrp: {
      type: Number,
      require: true,
    },
    sellingPrice: {
      type: Number,
      require: true,
    },
    discount: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: false,
    },
    sells: {
      type: Number,
      required: true,
    },
    remaining: {
      type: Number,
      required: false,
    },
    aboutProductShort: {
      type: String,
      required: true,
    },
    aboutProductLong: {
      type: String,
      required: true,
    },
    style: {
      type: String,
      required: true,
    },
    sleeve: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    print: {
      type: String,
      required: true,
    },
    fit: {
      type: String,
      required: true,
    },
    sizeAndFit: {
      type: String,
      required: true,
    },
    materialAndCare: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      required: true,
    },
    img: {
      type: Array,
      required: true,
    },
    sizesQuan: {
      type: Array,
      required: false,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);