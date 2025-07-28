const express = require("express")
const middleware = require("../middleware")
const pageRouter = express.Router()
const pageController = require("../controllers/page.controller")

// Public Routes
pageRouter.get("/", pageController.getIndexPage)
pageRouter.get("/docs", pageController.getDocsPage)
pageRouter.get("/about", pageController.getAboutPage)
pageRouter.get("/disclaimer", pageController.getDisclaimerPage)
pageRouter.get("/cookie-information", pageController.getCookieInformationPage)
pageRouter.get("/terms-of-privacy", pageController.getTermsOfPrivacyPage)
pageRouter.get("/terms-of-use", pageController.getTermsOfUsePage)
pageRouter.get("/newsletter", pageController.getNewsletterPage)
pageRouter.get("/newsletter-confirm", pageController.getNewsletterConfirmationPage)

// Auth Routes
pageRouter.get("/auth/login", pageController.getLoginPage)
pageRouter.get("/auth/register", pageController.getRegisterPage)
pageRouter.get("/auth/reset-password", pageController.getResetPasswordPage)

pageRouter.get("/auth/confirm", pageController.getRegisterConfirmationPage)

// Protected Routes
pageRouter.get("/dashboard", middleware.verifyTokenFromCookie, pageController.getDashboardPage)
pageRouter.get("/account", middleware.verifyTokenFromCookie, pageController.getAccountPage)
pageRouter.get("/posts", middleware.verifyTokenFromCookie, pageController.getPostsPage)

// Links
pageRouter.get("/links", middleware.verifyTokenFromCookie, pageController.getLinksPage)
pageRouter.get("/links/:id", middleware.verifyTokenFromCookie, pageController.getLinkByIdPage)

// pageRouter.delete("/links/:id", middleware.verifyTokenFromCookie, pageController.deleteLink)



// Admin Routes
pageRouter.get("/admin", pageController.getAdminPage)
pageRouter.get("/admin/users", pageController.getAdminUsersPage)

module.exports = pageRouter
