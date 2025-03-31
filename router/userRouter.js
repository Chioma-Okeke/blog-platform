const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const get_user_comments = require("../controller/userController");

const userRouter = Router().get(
    "/user/comments",
    authMiddleware,
    get_user_comments
);

module.exports = userRouter;
