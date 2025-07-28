const express = require("express")

const linkRouter = express.Router()
const linkController = require("../controllers/link.controller")

// Protected Routes
linkRouter.get("/links", linkController.getLinks)
linkRouter.get("/links/:id", linkController.getLinkById)
linkRouter.post("/links", linkController.createLink)
linkRouter.patch("/links/:id", linkController.patchLink)
linkRouter.delete("/links/:id", linkController.deleteLink)

module.exports = linkRouter
