const express = require("express")
const newsletterRouter = express.Router()
const newsletterController = require("../controllers/newsletter.controller")

newsletterRouter.post("/subscribers/subscribe", newsletterController.registerSubscriber)
newsletterRouter.post("/subscribers/unsubscribe", newsletterController.unregisterSubscriber)

module.exports = newsletterRouter
