const express = require("express");
require("dotenv").config();

const connect = require("./config/db");
const port = process.env.PORT || 3000;

const usersRouter = require("./controllers/users");
const app = express();
app.use(express.json());
app.use("", usersRouter);

app.listen(port, async () => {
  try {
    await connect().then(() => console.log("Running on port " + port));
  } catch (error) {
    console.log("error:", error.message);
  }
});
