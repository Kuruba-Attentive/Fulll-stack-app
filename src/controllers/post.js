const express = require("express");

const router = express.Router();
const postModel = require("../models/post");
const checkValidId = require("../middlewares");
const authenticate = require("../middlewares/authenticate");

const { create, getList, deleteOne, updateOne, getOne } =
  require("./crud")(postModel);

router.get("/", getList);
router.post("/", authenticate, async (req, res) => {
  req.body.user = req.user._id;
  try {
    const newEntity = await postModel.create(req.body);
    res.send(newEntity);
  } catch (error) {
    sendErrorResponse(error, res);
  }
});
router.get("/:id", authenticate, checkValidId, getOne);
router.patch("/:id", authenticate, checkValidId, updateOne);
router.delete("/:id", authenticate, checkValidId, deleteOne);

module.exports = router;
