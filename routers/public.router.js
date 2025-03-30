const express = require("express")
const publicRouter = express.Router()
const publicController = require("../controllers/public.controller")

publicRouter.get("/", publicController.getIndexPage)
publicRouter.get("/login", publicController.getLoginPage)
publicRouter.get("/register", publicController.getRegisterPage)
publicRouter.get("/forgot-password", publicController.getForgotPasswordPage)
publicRouter.get("/disclaimer", publicController.getDisclaimerPage)
publicRouter.get("/cookie-information", publicController.getCookieInformationPage)
publicRouter.get("/terms-of-privacy", publicController.getTermsOfPrivacyPage)
publicRouter.get("/terms-of-use", publicController.getTermsOfUsePage)
publicRouter.get("/newsletter", publicController.getNewsletterPage)

module.exports = publicRouter
