// imports
const express = require("express");
const app = express();
const userRouter = require("../Routes/usersRouter.js");
const showRouter = require("../Routes/showsRouter.js");
app.use("/users", userRouter);
app.use("/shows", showRouter);
// app.use("/users", userRouter);
module.exports = app;