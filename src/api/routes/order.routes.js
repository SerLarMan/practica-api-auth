const {
  getOrder,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

const { isAuth } = require("../../middlewares/auth.middleware");

const orderRouter = require("express").Router();

orderRouter.get("/", getOrder);
orderRouter.get("/:id", getOrderById);
orderRouter.post("/", isAuth, addOrder);
orderRouter.put("/:id", isAuth, updateOrder);
orderRouter.delete("/:id", isAuth, deleteOrder);

module.exports = orderRouter;
