const mongoose = require("mongoose");

const checkValidId = (req, res, next) => {
  const id = req.params.id;
  const isValidId = mongoose.Types.ObjectId.isValid(id);
  if (isValidId) next();
  else res.status(404).send({ message: "Invalid id provided" });
};

module.exports = checkValidId;
