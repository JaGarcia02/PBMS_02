const jwt = require("jsonwebtoken");
const db = require("../config/connection");
const { admin_users } = require("../models");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get Token
      token = req.headers.authorization.split(" ")[1];

      //Verify
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      //Get user using Token
      req.user = await admin_users.findByPk(decoded.id);

      next();
    } catch (error) {
      console.log(error);
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not Authorized no TOKEN" });
  }
};

module.exports = {
  protect,
};
