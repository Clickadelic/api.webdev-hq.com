const express = require("express")

const postRouter = express.Router()
const postController = require("../controllers/post.controller")

// Protected Routes
postRouter.get("/posts", postController.getPosts)
postRouter.get("/posts/:id", postController.getPostById)
postRouter.post("/posts", postController.createPost)
postRouter.patch("/posts/:id", postController.patchPost)
postRouter.delete("/posts/:id", postController.deletePost)

module.exports = linkRouter
