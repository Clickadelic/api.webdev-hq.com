const express = require("express")
const extensionRouter = express.Router()
const extensionController = require("../controllers/extension.controller")

extensionRouter.get("/extension/daily-image", extensionController.getDailyImage)
extensionRouter.get("/extension/random-image", extensionController.getRandomImage)

module.exports = extensionRouter
