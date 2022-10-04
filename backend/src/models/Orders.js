const mongoose = require("mongoose");

const orders = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        productsId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product"
        },
        address: {
            type: Object,
            required: true,
            max: 50,
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Orders", orders);