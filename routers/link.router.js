const express = require("express")
const middleware = require("../middleware")
const linkRouter = express.Router()
const linkController = require("../controllers/link.controller")

// Protected Routes
linkRouter.post("/links/new", linkController.addNewLink)

module.exports = linkRouter
