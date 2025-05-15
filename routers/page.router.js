const express = require("express")
const middleware = require("../middleware/middleware")
const pageRouter = express.Router()
const pageController = require("../controllers/page.controller")

// Public Routes
pageRouter.get("/", pageController.getIndexPage)
pageRouter.get("/docs", pageController.getDocsPage)
pageRouter.get("/login", pageController.getLoginPage)
pageRouter.get("/register", pageController.getRegisterPage)
pageRouter.get("/forgot-password", pageController.getForgotPasswordPage)
pageRouter.get("/disclaimer", pageController.getDisclaimerPage)
pageRouter.get("/cookie-information", pageController.getCookieInformationPage)
pageRouter.get("/terms-of-privacy", pageController.getTermsOfPrivacyPage)
pageRouter.get("/terms-of-use", pageController.getTermsOfUsePage)
pageRouter.get("/newsletter", pageController.getNewsletterPage)
pageRouter.get("/newsletter-confirm", pageController.getNewsletterConfirmationPage)

// Protected Routes
pageRouter.get("/dashboard", middleware.verifyToken, pageController.getDashboardPage)

module.exports = pageRouter
