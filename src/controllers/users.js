const express = require("express");
const checkValidId = require("../middlewares");

const router = express.Router();

const userModel = require("../models/user");
const { register, login } = require("./auth");
const { getList, deleteOne, updateOne, getOne } = require("./crud")(userModel);

router.get("/", getList);
router.post("/register", register);
router.post("/login", login);
router.get("/:id", checkValidId, getOne);
router.patch("/:id", checkValidId, updateOne);
router.delete("/:id", checkValidId, deleteOne);

module.exports = router;
