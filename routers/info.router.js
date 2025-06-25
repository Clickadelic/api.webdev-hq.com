const express = require("express")
const infoRouter = express.Router()
const infoController = require("../controllers/info.controller")

infoRouter.get("/", infoController.getInfo)
infoRouter.get("/healthcheck", infoController.getHealthCheck)

module.exports = infoRouter
