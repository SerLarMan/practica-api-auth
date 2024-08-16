const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("../../api/models/Product");
const products = require("../../data/products");

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    let allProducts = await Product.find();

    if (allProducts.length) {
      await Product.collection.drop();
    }
  })
  .catch((error) => console.log(error))
  .then(async () => {
    await Product.insertMany(products);
    console.log("Products added");
  })
  .catch((error) => console.log(error))
  .finally(() => mongoose.disconnect());
