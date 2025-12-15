const express = require("express")
const authRouter = express.Router()
const middleware = require("../middleware")
const authController = require("../controllers/auth.controller")

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registriers a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: JohnDev
 *               email:
 *                 type: string
 *                 example: john@dev.com
 *               password:
 *                 type: string
 *                 example: "superSecure123!"
 *     responses:
 *       201:
 *         description: Registration successful - confirmation e-mail send.
 *       400:
 *         description: Invalid inputs
 */
authRouter.post("/auth/register", middleware.validateRegistration, authController.registerUser)

/**
 * @swagger
 * /auth/confirm:
 *   post:
 *     summary: Confirms the registration with a token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: "4f1e3c9c-57d3-44ae-a611-2bcd533f1f52"
 *     responses:
 *       200:
 *         description: Regsitration successfully confirmed
 *       400:
 *         description: Token invalid of expired
 */
authRouter.post("/auth/confirm", middleware.validateConfirmationToken, authController.confirmRegistration)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@dev.com
 *               password:
 *                 type: string
 *                 example: "superSecure123!"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid data
 */
authRouter.post("/auth/login", middleware.validateLogin, authController.login)

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logs out a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
authRouter.post("/auth/logout", authController.logout)

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Resets the password of a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@dev.com
 *     responses:
 *       200:
 *         description: Password e-mail send
 *       404:
 *         description: user not found
 */
authRouter.post("/auth/reset-password", authController.resetPassword)

module.exports = authRouter
