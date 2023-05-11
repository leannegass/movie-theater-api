// imports
const express = require("express");
const app = express();

const userRouter = require("../routes/usersRouter.js");

app.use("/users", userRouter);

// app.use("/users", userRouter);


module.exports = app;