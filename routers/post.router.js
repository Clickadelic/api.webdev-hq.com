const express = require("express")
const middleware = require("../middleware")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")

// Protected Routes
postRouter.get("/posts", postController.getPosts)
postRouter.post("/posts", postController.createPost)
postRouter.get("/posts/:id", postController.getPostById)
postRouter.patch("/posts/:id", postController.patchPostById)
postRouter.delete("/posts/:id", postController.deletePostById)

module.exports = postRouter
