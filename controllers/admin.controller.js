const prisma = require("../prisma")

const adminController = {
	getAdminPage: (req, res) => {
		return res.render("./pages/admin")
	},
	getAdminUsersPage: async (req, res) => {
		const users = await prisma.user.findMany()
		users.forEach(user => {
			user.password = undefined
		})
		return res.render("./pages/admin/users", { users })
	},
	getAdminSubscribersPage: async (req, res) => {
		const subscribers = await prisma.subscriber.findMany()
		return res.render("./pages/admin/subscribers", { subscribers })
	},
	getAdminPostsPage: async (req, res) => {
		const posts = await prisma.post.findMany()
		return res.render("./pages/admin/posts", { posts })
	},
	getAdminPostsCreatePage: async (req, res) => {
		return res.render("./pages/admin/posts/create")
	},
	getAdminLinksPage: async (req, res) => {
		const links = await prisma.link.findMany()
		return res.render("./pages/admin/links", { links })
	},
	getAdminLinkByIdPage: async (req, res) => {
		return res.render("./pages/admin/links")
	},
}

module.exports = adminController
