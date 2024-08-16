const {
  getProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const productRouter = require("express").Router();

productRouter.get("/", getProduct);
productRouter.get("/:id", getProductById);
productRouter.post("/", addProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
