require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/utils/database");
const userRoutes = require("./src/api/routes/user.routes");
const orderRoutes = require("./src/api/routes/order.routes");
const productRouter = require("./src/api/routes/product.routes");

// Database connection
connectDB();

// Server configuration
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/products", productRouter);

app.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.messaje || "Unexpected error");
});

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
