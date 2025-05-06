const express = require("express")
const newsletterRouter = express.Router()
const newsletterController = require("../controllers/newsletter.controller")

newsletterRouter.post("/newsletter/subscribe", newsletterController.registerSubscriber)
newsletterRouter.post("/newsletter/confirm", newsletterController.confirmSubscription)
newsletterRouter.post("/newsletter/unsubscribe", newsletterController.unregisterSubscriber)

module.exports = newsletterRouter
