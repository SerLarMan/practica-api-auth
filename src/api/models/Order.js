const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    order_date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
