const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
    name: { type: "string", required: true}
  },
  {
    versionKey: false,
    timestamps: true
  }
);

userSchema.pre("save", function (next) {
  var hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

userSchema.methods.matchPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
