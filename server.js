const express = require("express");
const connectDb = require("./db/dbController");
const cookieParser = require("cookie-parser");
const authRouter = require("./router/authRouter");
const postRouter = require("./router/postRouter");
const err = require("./middleware/errorHandler");
const userRouter = require("./router/userRouter");
const setupSwagger = require("./swaggerConfig");

const app = express();
require("dotenv").config();

const port = process.env.PORT;

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api", postRouter);
app.use("/api", userRouter);

app.use(err);
setupSwagger(app);

app.listen(port, console.log("Server running..."));
