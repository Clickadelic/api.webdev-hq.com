const express = require("express")
const linkRouter = express.Router()
const linkController = require("../controllers/link.controller")
const middleware = require("../middleware")
linkRouter.get("/links",  linkController.getLinks)
linkRouter.get("/links/:id", linkController.getLinkById)
linkRouter.post("/links", linkController.createLink)
linkRouter.patch("/links/:id", linkController.patchLinkById)
linkRouter.delete("/links/:id", linkController.deleteLinkById)

module.exports = linkRouter
