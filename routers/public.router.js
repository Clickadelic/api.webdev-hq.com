const express = require("express")
const publicRouter = express.Router()
const middleware = require("../middleware/middleware")
const publicController = require("../controllers/public.controller")

publicRouter.get("/", publicController.getIndex)
publicRouter.get("/about", publicController.getAbout)
publicRouter.get("/login", publicController.getLogin)
publicRouter.get("/register", publicController.getRegister)
publicRouter.get("/forgot-password", publicController.getForgotPassword)
publicRouter.get("/disclaimer", publicController.getDisclaimer)
publicRouter.get("/cookie-information", publicController.getCookieInformation)
publicRouter.get("/terms-of-privacy", publicController.getTermsOfPrivacy)

module.exports = publicRouter
