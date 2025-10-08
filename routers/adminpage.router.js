const express = require("express")
const middleware = require("../middleware")
const adminRouter = express.Router()
const adminController = require("../controllers/admin.controller")

adminRouter.get("/admin", middleware.verifyTokenFromCookie, adminController.getAdminPage)
adminRouter.get("/admin/users", middleware.verifyTokenFromCookie, adminController.getAdminUsersPage)
adminRouter.get("/admin/subscribers", middleware.verifyTokenFromCookie, adminController.getAdminSubscribersPage)
adminRouter.get("/admin/posts", middleware.verifyTokenFromCookie, adminController.getAdminPostsPage)
adminRouter.get("/admin/posts/create", middleware.verifyTokenFromCookie, adminController.getAdminPostsCreatePage)
adminRouter.get("/admin/links", middleware.verifyTokenFromCookie, adminController.getAdminLinksPage)
adminRouter.get("/admin/links/:id", middleware.verifyTokenFromCookie, adminController.getAdminLinkByIdPage)

module.exports = adminRouter
