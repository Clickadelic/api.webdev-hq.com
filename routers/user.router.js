const express = require("express");
const userRouter = express.Router();
const middleware = require("../middleware/middleware");
const userController = require("../controllers/user.controller");

userRouter.post("/auth/register", middleware.validateRegistration, userController.registerUser);

userRouter.post("/auth/test", userController.testUser);

userRouter.post("/auth/login", userController.login);

userRouter.get("/users", middleware.isLoggedIn, userController.getUsers);

userRouter.get("/users/:id", middleware.isLoggedIn, userController.getUser);

module.exports = userRouter;
