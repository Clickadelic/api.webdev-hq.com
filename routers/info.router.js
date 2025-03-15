const express = require("express");
const infoRouter = express.Router();
const middleware = require("../middleware/middleware");
const infoController = require("../controllers/info.controller");

infoRouter.get("/info", infoController.getInfo);

module.exports = infoRouter;
