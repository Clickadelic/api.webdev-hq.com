const express = require("express")
const authRouter = express.Router()
const middleware = require("../middleware")
const authController = require("../controllers/auth.controller")

authRouter.post("/auth/register", middleware.validateRegistration, authController.registerUser)
authRouter.post("/auth/confirm", middleware.validateConfirmationToken, authController.confirmRegistration)
authRouter.post("/auth/login", middleware.validateLogin, authController.login)
authRouter.post("/auth/logout", authController.logout)
authRouter.post("/auth/reset-password", authController.resetPassword)

module.exports = authRouter
