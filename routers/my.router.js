const express = require("express")
const myRouter = express.Router()
const myController = require("../controllers/my.controller")
const middleware = require("../middleware")
myRouter.get("/my/links", middleware.verifyTokenFromCookie, myController.getMyLinks)
myRouter.get("/my/links/:id", middleware.verifyTokenFromCookie,linkController.getLinkById)
myRouter.post("/my/links", middleware.verifyTokenFromCookie, linkController.createLink)
myRouter.patch("/my/links/:id", middleware.verifyTokenFromCookie, linkController.patchLinkById)
myRouter.delete("/my/links/:id", middleware.verifyTokenFromCookie, linkController.deleteLinkById)

module.exports = myRouter