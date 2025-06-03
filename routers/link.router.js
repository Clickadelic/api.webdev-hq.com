const express = require("express")
const middleware = require("../middleware")
const linkRouter = express.Router()
const linkController = require("../controllers/link.controller")

// Protected Routes
linkRouter.get("/links", linkController.getLinks)
linkRouter.post("/links/new", linkController.addNewLink)
linkRouter.post("/links/edit/:id", linkController.editLink)

module.exports = linkRouter
