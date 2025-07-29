const express = require("express")
const middleware = require("../middleware")
const pageRouter = express.Router()
const pageController = require("../controllers/page.controller")

// Public Routes
pageRouter.get("/", pageController.getIndexPage)
pageRouter.get("/docs", pageController.getDocsPage)
pageRouter.get("/disclaimer", pageController.getDisclaimerPage)
pageRouter.get("/cookie-information", pageController.getCookieInformationPage)
pageRouter.get("/terms-of-privacy", pageController.getTermsOfPrivacyPage)
pageRouter.get("/terms-of-use", pageController.getTermsOfUsePage)
pageRouter.get("/newsletter", pageController.getNewsletterPage)
pageRouter.get("/newsletter-confirm", pageController.getNewsletterConfirmationPage)

// Auth Routes
pageRouter.get("/auth/login", pageController.getLoginPage)
pageRouter.get("/auth/register", pageController.getRegisterPage)
pageRouter.get("/auth/confirm", pageController.getRegisterConfirmationPage)
pageRouter.get("/auth/reset-password", pageController.getResetPasswordPage)

// Protected Routes
pageRouter.get("/account", middleware.verifyTokenFromCookie, pageController.getAccountPage)

// Posts
pageRouter.get("/posts", middleware.verifyTokenFromCookie, pageController.getPostsPage)
pageRouter.get("/posts/create", middleware.verifyTokenFromCookie, pageController.getPostsCreatePage)
pageRouter.get("/posts/:id", middleware.verifyTokenFromCookie, pageController.getPostByIdPage)

// Links
pageRouter.get("/links", middleware.verifyTokenFromCookie, pageController.getLinksPage)
pageRouter.get("/links/:id", middleware.verifyTokenFromCookie, pageController.getLinkByIdPage)

// Admin Routes
pageRouter.get("/admin", pageController.getAdminPage)
pageRouter.get("/admin/users", pageController.getAdminUsersPage)
pageRouter.get("/admin/subscribers", pageController.getAdminSubscribersPage)

module.exports = pageRouter
