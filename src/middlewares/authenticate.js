require("dotenv").config();
const jwt = require("jsonwebtoken");

const getUser = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.Jwt_Secret_Key, (err, user) => {
      if (err) return reject(err);
      resolve(user);
    });
  });
};

module.exports = async (req, res, next) => {
  if (!req.headers.authorization)
    res.status(403).send({ message: "authorization token not provided" });

  if (!req.headers.authorization.startsWith("Bearer "))
    res
      .status(403)
      .send({ message: "authorization token should be bearer token" });

  const token = req.headers.authorization.split(" ")[1];

  let user = await getUser(token);
  if (user) {
    res.user = user.user;
    return next();
  } else return res.status(500).send({ message: error.message });
};
