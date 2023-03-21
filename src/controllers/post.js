const express = require("express");

const router = express.Router();
const postModel = require("../models/post");
const checkValidId = require("../middlewares");

const { create, getList, deleteOne, updateOne, getOne } = require("./crud")(postModel);

router.get("/", getList);
router.post("/", create);
router.get("/:id", checkValidId, getOne);
router.patch("/:id", checkValidId, updateOne);
router.delete("/:id", checkValidId, deleteOne);

module.exports = router;
