const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "post", required: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("comment", commentSchema);
