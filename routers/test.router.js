const express = require("express")
const middleware = require("../middleware")
const testRouter = express.Router()
const testController = require("../controllers/test.controller")

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
testRouter.get("/uptime", testController.getUptime)

module.exports = testRouter
