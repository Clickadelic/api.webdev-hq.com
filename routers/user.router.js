const express = require("express")
const middleware = require("../middleware")
const userRouter = express.Router()
const userController = require("../controllers/user.controller")

/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: Endpoints for user management
 */

/**
 * @openapi
 * /common/v1/users:
 *   get:
 *     summary: returns all users
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Not authorized
 */
userRouter.get("/users", middleware.verifyTokenFromCookie, userController.getUsers)

/**
 * @openapi
 * /common/v1/users/{id}:
 *   get:
 *     summary: Returns a user by id
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The Id of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User successfully found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       401:
 *         description: Not authorized
 */
userRouter.get("/users/:id", middleware.verifyTokenFromCookie, userController.getUserById)

/**
 * @openapi
 * /common/v1/users/{id}:
 *   patch:
 *     summary: Partially updates a user
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The Id of the user
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: User successfully updated
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Not authorized
 */
userRouter.patch("/users/:id", middleware.verifyTokenFromCookie, userController.patchUserById)

/**
 * @openapi
 * /common/v1/users/{id}:
 *   delete:
 *     summary: Deletes a user
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The Id of the user
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted
 *       404:
 *         description: User not found
 *       401:
 *         description: Not authorized
 */
userRouter.delete("/users/:id", middleware.verifyTokenFromCookie, userController.deleteUserById)

module.exports = userRouter
