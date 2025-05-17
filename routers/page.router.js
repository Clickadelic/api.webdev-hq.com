const express = require("express")
const middleware = require("../middleware")
const pageRouter = express.Router()
const pageController = require("../controllers/page.controller")

// Public Routes
pageRouter.get("/", pageController.getIndexPage)
pageRouter.get("/docs", pageController.getDocsPage)
pageRouter.get("/about", pageController.getAboutPage)
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
pageRouter.get("/dashboard", middleware.verifyTokenFromCookie, pageController.getDashboardPage)
pageRouter.get("/account", middleware.verifyTokenFromCookie, pageController.getAccountPage)

module.exports = pageRouter
