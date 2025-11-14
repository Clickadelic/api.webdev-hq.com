const express = require("express");
const middleware = require("../middleware");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");

/**
 * @openapi
 * tags:
 *   - name: Posts
 *     description: Endpoints for post management
 */

/**
 * @openapi
 * /common/v1/posts:
 *   get:
 *     summary: Returns all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: success - returns all posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
postRouter.get("/posts", postController.getPosts);

/**
 * @openapi
 * /common/v1/posts:
 *   post:
 *     summary: Creates a new post
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostCreate'
 *     responses:
 *       201:
 *         description: Post successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Not authorized
 */
postRouter.post("/posts", postController.createPost);

/**
 * @openapi
 * /common/v1/posts/{id}:
 *   get:
 *     summary: Returns a certain post by it's id
 *     tags: [Posts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: success - post found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 */
postRouter.get("/posts/:id", postController.getPostById);

/**
 * @openapi
 * /common/v1/posts/{id}:
 *   patch:
 *     summary: Partially updates a post
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: the id of the post
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostUpdate'
 *     responses:
 *       200:
 *         description: Post successfully updated
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Post not found
 */
postRouter.patch("/posts/:id", postController.patchPost);

/**
 * @openapi
 * /common/v1/posts/{id}:
 *   delete:
 *     summary: Deletes a post by it's id
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the post
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Post successfully deleted
 *       404:
 *         description: Post not found
 *       401:
 *         description: Not authorized
 */
postRouter.delete("/posts/:id", postController.deletePost);

module.exports = postRouter