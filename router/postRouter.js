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

const postRouter = Router();

/**
 * @swagger
 * /post:
 *   get:
 *     summary: Get all blog posts
 *     description: Retrieve a list of all blog posts.
 *     responses:
 *       200:
 *         description: A list of blog posts.
 */
postRouter.get("/post", get_all_posts);

/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Get a single blog post by ID
 *     description: Retrieve a specific blog post by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog post.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A specific blog post.
 *       404:
 *         description: Blog post not found.
 */
postRouter.get("/post/:id", get_a_post);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get all comments for a blog post
 *     description: Retrieve all comments for a specific blog post by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog post.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of comments for the blog post.
 *       404:
 *         description: No comments found for this post.
 */
postRouter.get("/comments/:id", get_post_comments);

/**
 * @swagger
 * /post:
 *   post:
 *     summary: Create a new blog post
 *     description: Create a new blog post (requires authentication).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog post created successfully.
 *       400:
 *         description: Invalid input.
 */
postRouter.post("/post", authMiddleware, create_a_post);

/**
 * @swagger
 * /post/{id}:
 *   put:
 *     summary: Update an existing blog post
 *     description: Update a blog post by its ID (requires authentication).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog post.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog post updated successfully.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Blog post not found.
 */
postRouter.put("/post/:id", authMiddleware, update_a_post);

/**
 * @swagger
 * /comment/{postId}:
 *   post:
 *     summary: Add a comment to a blog post
 *     description: Add a comment to a blog post (requires authentication).
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the blog post.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added successfully.
 *       400:
 *         description: Invalid input.
 */
postRouter.post("/comment/:postId", authMiddleware, add_comment);

/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: Delete a blog post by ID
 *     description: Delete a specific blog post by its ID (requires authentication).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog post.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post deleted successfully.
 *       404:
 *         description: Blog post not found.
 */
postRouter.delete("/post/:id", authMiddleware, delete_a_post);

/**
 * @swagger
 * /admin/posts/{id}:
 *   delete:
 *     summary: Admin delete a blog post by ID
 *     description: Admin can delete a blog post by its ID (requires admin authentication).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog post.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post deleted successfully.
 *       403:
 *         description: Unauthorized access.
 *       404:
 *         description: Blog post not found.
 */
postRouter.delete("/admin/posts/:id", authMiddleware, adminAuth, delete_a_post);

/**
 * @swagger
 * /admin/comments/{id}:
 *   delete:
 *     summary: Admin delete a comment by ID
 *     description: Admin can delete a comment by its ID (requires admin authentication).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the comment.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully.
 *       403:
 *         description: Unauthorized access.
 *       404:
 *         description: Comment not found.
 */
postRouter.delete("/admin/comments/:id", authMiddleware, adminAuth, delete_a_comment);

module.exports = postRouter;
