const express = require("express")

const linkRouter = express.Router()
const linkController = require("../controllers/link.controller")

// Protected Routes
linkRouter.get("/links", linkController.getLinks)
linkRouter.post("/links", linkController.addNewLink)
linkRouter.patch("/links/:id", linkController.patchLink)
linkRouter.delete("/links/:id", linkController.deleteLink)

module.exports = linkRouter
