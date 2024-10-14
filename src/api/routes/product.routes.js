const {
  getProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const { isAuth, isAdmin } = require("../../middlewares/auth.middleware");

const productRouter = require("express").Router();

productRouter.get("/", getProduct);
productRouter.get("/:id", getProductById);
productRouter.post("/", isAuth, isAdmin, addProduct);
productRouter.put("/:id", isAuth, isAdmin, updateProduct);
productRouter.delete("/:id", isAuth, isAdmin, deleteProduct);

module.exports = productRouter;
