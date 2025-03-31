const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const get_user_comments = require("../controller/userController");

const userRouter = Router();

/**
 * @swagger
 * /user/comments:
 *   get:
 *     summary: Get all comments made by the user
 *     description: Retrieve all comments made by the authenticated user.
 *     responses:
 *       200:
 *         description: A list of comments made by the user.
 *       401:
 *         description: Unauthorized.
 */
userRouter.get(
    "/user/comments",
    authMiddleware,
    get_user_comments
);

module.exports = userRouter;
