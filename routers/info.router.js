const express = require("express")
const infoRouter = express.Router()
const middleware = require("../middleware")
const infoController = require("../controllers/info.controller")

infoRouter.get("/", infoController.getInfo)
infoRouter.get("/health", infoController.getHealthCheck)

module.exports = infoRouter
