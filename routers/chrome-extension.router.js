const express = require("express")
const chromeExtensionRouter = express.Router()
const chromeExtensionController = require("../controllers/chrome-extension.controller")

chromeExtensionRouter.get("/chrome-extension/random-image", chromeExtensionController.getRandomImage)

module.exports = chromeExtensionRouter
