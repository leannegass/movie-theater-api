// imports
const express = require("express");
const app = express();

const userRouter = require("../routes/users.js");

app.use("/users", userRouter);


module.exports = app;