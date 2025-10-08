const prisma = require("../prisma")

const adminController = {
	/**
	 * Renders the admin page
	 * @param {Request} req
	 * @param {Response} res
	 */
	getAdminPage: (req, res) => {
		return res.render("./pages/admin")
	},

	/**
	 * Renders the admin users page
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getAdminUsersPage: async (req, res) => {
		const users = await prisma.user.findMany()
		users.forEach(user => {
			user.password = undefined
		})
		return res.render("./pages/admin/users", { users })
	},

	/**
	 * Renders the admin subscribers page
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getAdminSubscribersPage: async (req, res) => {
		const subscribers = await prisma.subscriber.findMany()
		return res.render("./pages/admin/subscribers", { subscribers })
	},

	/**
	 * Renders the admin posts page
	 * 
	 * Retrieves all posts from the database and passes them to the admin/posts view
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getAdminPostsPage: async (req, res) => {
		const posts = await prisma.post.findMany()
		return res.render("./pages/admin/posts", { posts })
	},

	/**
	 * Renders the admin posts create page
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getAdminPostsCreatePage: async (req, res) => {
		return res.render("./pages/admin/posts/create")
	},
	
	/**
	 * Renders the admin links page
	 * 
	 * Retrieves all links from the database and passes them to the admin/links view
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getAdminLinksPage: async (req, res) => {
		const links = await prisma.link.findMany()
		return res.render("./pages/admin/links", { links })
	},

	/**
	 * Renders the admin links by ID page
	 * 
	 * Retrieves a specific link by ID from the database and passes it to the admin/links/:id view
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getAdminLinkByIdPage: async (req, res) => {
		return res.render("./pages/admin/links")
	},
}

module.exports = adminController
