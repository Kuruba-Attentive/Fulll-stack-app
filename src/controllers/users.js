const express = require("express");

const router = express.Router();

const userModel=require("../models/user")

router.get("/", (req, res) => {
  res.send("Hello user, learning backend");
});

router.get("/users", async (req, res) => {
  try {
    const usersList = await userModel.find().lean().exec();
    res.send(usersList);
  } catch (error) {
    sendErrorResponse(error, res);
  }
});

router.post("/users", async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    res.send(user);
  } catch (error) {
    sendErrorResponse(error, res);
  }
});

router.get("/users/:userId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId).lean().exec();
    res.send(user);
  } catch (e) {
    sendErrorResponse(e, res);
  }
});

router.patch("/users/:userId", async (req, res) => {
  try {
    const user = await userModel
      .findByIdAndUpdate(req.params.userId, req.body, { new: true })
      .lean()
      .exec();
    res.send(user);
  } catch (e) {
    sendErrorResponse(e, res);
  }
});

router.delete("/users/:userId", async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.userId);
    res.send(user);
  } catch (e) {
    sendErrorResponse(e, res);
  }
});

module.exports = router;

const sendErrorResponse = (error, res) => {
  res.send(error);
};
