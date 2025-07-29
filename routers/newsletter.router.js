const express = require("express")
const newsletterRouter = express.Router()
const newsletterController = require("../controllers/newsletter.controller")
const middleware = require("../middleware")

newsletterRouter.post("/newsletter/subscribe", middleware.validateSubscribtion, newsletterController.registerSubscriber)
newsletterRouter.post("/newsletter/unsubscribe", middleware.validateSubscribtion, newsletterController.unregisterSubscriber)

module.exports = newsletterRouter
