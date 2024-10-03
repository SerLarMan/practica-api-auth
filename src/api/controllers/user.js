const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../utils/token");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate({
      path: "orders",
      populate: {
        path: "products",
        model: "Product",
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const userExists = await User.findOne({ email: user.email });

    if (userExists) {
      return res.status(400).json("Ya existe un usuario con ese email");
    }

    user.role = "user";
    const userDB = await user.save();
    return res.status(201).json(userDB);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json("Contraseña o usuario incorrecto");
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user._id, user.email);
      return res.status(200).json(token);
    } else {
      return res.status(400).json("Contraseña o usuario incorrecto");
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.role == "user") {
      // Si el usuario no tiene permisos para modificar a otros saltará error
      if (req.user._id != id) {
        return res.status(401).json("Unauthorized");
        // Si el usuario no tiene permisos e intenta modificar su propio rol
      } else if (req.body.role) {
        return res
          .status(401)
          .json("Normal users cannot modify their role. Only an admin can.");
      }
    }

    const user = await User.findById(id).populate("orders");
    const newUser = new User(req.body);
    newUser._id = id;

    // Se comprueba que no se repitan las ordenes
    user.orders.forEach((order) => {
      if (!newUser.orders.includes(order._id)) {
        newUser.orders.push(order);
      }
    });

    // Se vuelve a encriptar la contraseña en caso que el usuario quiera modificarla
    if (newUser.password) {
      newUser.password = bcrypt.hashSync(newUser.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, newUser, {
      new: true,
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Si el usuario no tiene permisos e intenta borrar a otro usuario saltará error
    if (req.user.role == "user" && req.user._id != id) {
      return res.status(401).json("Unauthorized");
    }

    await User.findByIdAndDelete(id);
    return res.status(200).json("User deleted");
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
