const Product = require("../models/Product");

const getProduct = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);

    if (req.user.role == "user") {
      return res.status(401).json("Only admins can add products");
    }

    const productDB = await product.save();
    return res.status(201).json(productDB);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.role == "user") {
      return res.status(401).json("Only admins can update products");
    }

    const newProduct = new Product(req.body);
    newProduct._id = id;
    const updatedProduct = await Product.findByIdAndUpdate(id, newProduct, {
      new: true,
    });
    return res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.role == "user") {
      return res.status(401).json("Only admins can delete products");
    }

    await Product.findByIdAndDelete(id);
    return res.status(200).json("Product deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
