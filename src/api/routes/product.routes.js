const {
  getProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const { isAuth } = require("../../middlewares/auth.middleware");

const productRouter = require("express").Router();

productRouter.get("/", getProduct);
productRouter.get("/:id", getProductById);
productRouter.post("/", isAuth, addProduct);
productRouter.put("/:id", isAuth, updateProduct);
productRouter.delete("/:id", isAuth, deleteProduct);

module.exports = productRouter;
