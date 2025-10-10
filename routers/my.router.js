const express = require("express")
const myRouter = express.Router()
const myController = require("../controllers/my.controller")
const middleware = require("../middleware")
myRouter.get("/my/links", middleware.verifyTokenFromCookie, myController.getMyLinks)
myRouter.get("/my/links/:id", middleware.verifyTokenFromCookie,myController.getLinkById)
myRouter.post("/my/links", middleware.verifyTokenFromCookie, myController.createLink)
myRouter.patch("/my/links/:id", middleware.verifyTokenFromCookie, myController.patchLinkById)
myRouter.delete("/my/links/:id", middleware.verifyTokenFromCookie, myController.deleteLinkById)

module.exports = myRouter