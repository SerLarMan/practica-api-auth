const Order = require("../models/Order");
const User = require("../models/User");

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

    const user = await User.findById(req.user._id);
    user.orders.push(orderBD._id);
    await User.findByIdAndUpdate(user._id, user);

    return res.status(201).json(orderBD);
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("products");
    const newOrder = new Order(req.body);
    newOrder._id = id;

    // Se comprueba que no se repitan los productos
    order.products.forEach((prod) => {
      if (!newOrder.products.includes(prod._id)) {
        newOrder.products.push(prod);
      }
    });

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

    if (req.user.role == "user") {
      return res.status(401).json("Only admins can delete orders");
    }

    await Order.findByIdAndDelete(id);
    return res.status(200).json("Order deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = { getOrder, getOrderById, addOrder, updateOrder, deleteOrder };
