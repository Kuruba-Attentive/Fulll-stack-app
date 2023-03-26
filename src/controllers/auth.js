const userModel = require("../models/user");
require("dotenv").config();

const jwt = require("jsonwebtoken");

const generateToken = user => {
  return jwt.sign({ user }, process.env.Jwt_Secret_Key);
};

const register = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (user) return res.status(400).send({ message: "user already exist" });
    user = await userModel.create(req.body);
    const token = generateToken(user);
    return res.send({ user, token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(404)
        .json({ message: "Please check entered email or password" });

    const match = user.matchPassword(req.body.password);

    if (!match)
      return res
        .status(404)
        .json({ message: "Please check entered email or password" });

    const token = generateToken(user);
    return res.send({ user, token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { register, login };

// find the user with provided email if user found then send error
