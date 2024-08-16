const {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const { isAuth } = require("../../middlewares/auth.middleware");

const userRouter = require("express").Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/:id", isAuth, updateUser);
userRouter.delete("/:id", isAuth, deleteUser);

module.exports = userRouter;
