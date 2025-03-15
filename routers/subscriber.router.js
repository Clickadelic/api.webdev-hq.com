const express = require("express");
const subscriberRouter = express.Router();
const subscriberController = require("../controllers/subscriber.controller");

subscriberRouter.post("/subscribers/subscribe", subscriberController.registerSubscriber);
subscriberRouter.post("/subscribers/unsubscribe", subscriberController.unregisterSubscriber);

module.exports = subscriberRouter;
