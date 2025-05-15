const express = require("express")
const extensionRouter = express.Router()
const extensionController = require("../controllers/extension.controller")

extensionRouter.get("/extension/daily-image", extensionController.getDailyImage)

module.exports = extensionRouter
