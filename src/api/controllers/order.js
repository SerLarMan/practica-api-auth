const Order = require("../models/Order");

const getOrder = async (req, res, next) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("products");
    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

const addOrder = async (req, res, next) => {
  try {
    const order = new Order(req.body);

    const orderBD = await order.save();
    return res.status(201).json(orderBD);
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newOrder = new Order(req.body);
    newOrder._id = id;

    const updatedOrder = await Order.findByIdAndUpdate(id, newOrder, {
      new: true,
    });
    return res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    return res.status(200).json("Order deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = { getOrder, getOrderById, addOrder, updateOrder, deleteOrder };
