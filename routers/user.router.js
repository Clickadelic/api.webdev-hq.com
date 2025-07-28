const express = require("express")
const middleware = require("../middleware")
const userRouter = express.Router()
const userController = require("../controllers/user.controller")

// Protected Routes
userRouter.get("/users", middleware.verifyTokenFromCookie, userController.getUsers)
userRouter.get("/users/:id", middleware.verifyTokenFromCookie, userController.getUser)

module.exports = userRouter
