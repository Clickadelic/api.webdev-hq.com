const express = require("express")
const authRouter = express.Router()
const middleware = require("../middleware")
const authController = require("../controllers/auth.controller")

authRouter.post("/auth/register", middleware.validateRegistration, authController.registerUser)
authRouter.post("/auth/login", authController.login)
authRouter.post("/auth/logout", authController.logout)
authRouter.get("/users", middleware.isLoggedIn, authController.getUsers)
authRouter.get("/users/:id", middleware.isLoggedIn, authController.getUser)

module.exports = authRouter
