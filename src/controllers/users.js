const express = require("express");
const checkValidId = require("../middlewares");

const router = express.Router();

const userModel = require("../models/user");
const { register, login } = require("./auth");
const { getList, deleteOne, updateOne, getOne } = require("./crud")(userModel);
const jwt = require("jsonwebtoken");

router.get("/", getList);
router.get("/me", async (req, res) => {
  try {
    if (!req.headers.authorization)
      return res.status(401).send({ error: "Unauthorized user" });

    if (!req.headers.authorization.startsWith("Bearer "))
      return res.status(401).send({ error: "Unauthorized user" });

    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.Jwt_Secret_Key, (err, user) => {
      if (err) return res.status(500).send({ error: err.message });
      return res.status(200).send(user.user);
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
router.post("/register", register);
router.post("/login", login);
router.get("/:id", checkValidId, getOne);
router.patch("/:id", checkValidId, updateOne);
router.delete("/:id", checkValidId, deleteOne);

module.exports = router;
