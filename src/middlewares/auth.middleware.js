const User = require("../api/models/User");
const { verifyToken } = require("../utils/token");

const isAuth = async (req, res, next) => {};

module.exports = { isAuth };
