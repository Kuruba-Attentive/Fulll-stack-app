const express = require("express");

const commentModel = require("../models/comment");
const { create, deleteOne, updateOne, getOne } =
  require("./crud")(commentModel);
const checkValidId = require("../middlewares/index");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const commentsList = await commentModel
      .find({ ...req.query })
      .sort({ updatedAt: -1 })
      .populate({
        path: "user",
        select: ["name"]
      })
      .populate({
        path: "post",
        select: ["_id"],
        populate: {
          path: "user",
          select: ["_id"]
        }
      })
      .lean()
      .exec();
    res.json(commentsList);
  } catch (error) {
    res.send({ error });
  }
});
router.post("/", create);
router.get("/id", checkValidId, getOne);
router.patch("/:id", checkValidId, updateOne);
router.delete("/:id", checkValidId, deleteOne);

module.exports = router;
