const { Router } = require("express");
const {
    get_all_posts,
    get_a_post,
    create_a_post,
    update_a_post,
    delete_a_post,
    add_comment,
    get_post_comments,
    delete_a_comment,
} = require("../controller/blogController");
const authMiddleware = require("../middleware/authMiddleware");
const adminAuth = require("../middleware/adminAuth");

const postRouter = Router()
    .get("/post", get_all_posts)
    .get("/post/:id", get_a_post)
    .get("/comments/:id", get_post_comments)

    .post("/post", authMiddleware, create_a_post)
    .put("/post/:id", authMiddleware, update_a_post)
    .post("/comment/:postId", authMiddleware, add_comment)

    .delete("/post/:id", authMiddleware, delete_a_post)
    .delete("/admin/posts/:id", authMiddleware, adminAuth, delete_a_post)
    .delete("/admin/comments/:id", authMiddleware, adminAuth, delete_a_comment);

module.exports = postRouter;
