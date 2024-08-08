const {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
} = require("../controllers/user");

const {isAuth} = require("../../middlewares/auth.middleware")

const userRouter = require("express").Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/register", registerUser);
userRouter.post("/login", isAuth, loginUser);

module.exports = userRouter;
