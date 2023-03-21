const express = require("express");
require("dotenv").config();
const cors = require("cors");

const connect = require("./config/db");
const port = process.env.PORT || 3000;
const usersRouter = require("./controllers/users");
const postsRouter = require("./controllers/post");
const commentsRouter = require("./controllers/comment");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*"
  })
);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

app.listen(port, async () => {
  try {
    await connect().then(() => console.log("Connected to DB, running on port " + port));
  } catch (error) {
    console.log("error:", error.message);
  }
});
