const {
  getOrder,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

const orderRouter = require("express").Router();

orderRouter.get("/", getOrder);
orderRouter.get("/:id", getOrderById);
orderRouter.post("/", addOrder);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);

module.exports = orderRouter;
