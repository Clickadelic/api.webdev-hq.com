const express = require("express")
const middleware = require("../middleware")
const userRouter = express.Router()
const userController = require("../controllers/user.controller")

// Protected Routes
userRouter.get("/users", middleware.isLoggedIn, userController.getUsers)
userRouter.get("/users/:id", middleware.isLoggedIn, userController.getUser)

module.exports = userRouter
