require("dotenv").config();
const jwt = require("jsonwebtoken");

const getUser = token => {
  return new Promise((resolve, reject) => {
    if (!token) reject({ message: "authorization token missing" });
    jwt.verify(token, process.env.Jwt_Secret_Key, (err, user) => {
      if (err) return reject(err);
      resolve(user);
    });
  });
};

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    const err = new Error("Not an authorized user");
    res.status(401);
    return next(err.message);
  }
  if (!req.headers.authorization.startsWith("Bearer "))
    return res
      .status(401)
      .send({ message: "authorization token should be bearer token" });

  const token = req.headers.authorization.split(" ")[1];

  let user = await getUser(token);
  if (user) {
    req.user = user.user;
    return next();
  } else return res.status(401).send({ message: error.message });
};
