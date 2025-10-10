const prisma = require("../prisma")
const paginate = require("../lib/utils")

const pageController = {
	/**
	 * Renders the index page
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getIndexPage: (req, res) => {
		return res.render("./pages/index")
	},
	
	/**
	 * Renders the documentation page
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getDocsPage: (req, res) => {
		return res.render("./pages/docs")
	},

	/**
	 * Renders the register page
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 * 
	 * The query parameter 'token' is used to pass the confirmation token to the Twig view.
	 * The query parameter 'query' is used to pass the complete query object to the Twig view.
	 */
	getRegisterPage: (req, res) => {
		return res.render("./pages/auth/register", {
			confirmationToken: req.query.token,
			query: req.query // wird gebraucht für `query.token is defined` in Twig
		})
	},

	/**
	 * Renders the registration confirmation page
	 * 
	 * The query parameter 'token' is used to pass the confirmation token to the Twig view.
	 * The query parameter 'query' is used to pass the complete query object to the Twig view.
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 * 
	 * The Twig view will use the query object to check if the query parameter 'token' is defined.
	 * This is used to conditionally render the link to resend the confirmation email.
	 */
	getRegisterConfirmationPage: (req, res) => {
		return res.render("./pages/auth/confirm", {
			token: req.query.token,
			query: req.query // wird gebraucht für `query.token is defined` in Twig
		})
	},

	/**
	 * Renders the login page
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getLoginPage: (req, res) => {
		return res.render("./pages/auth/login")
	},

	/**
	 * Renders the reset password page
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getResetPasswordPage: (req, res) => {
		return res.render("./pages/auth/reset-password")
	},
	
	/**
	 * Renders the disclaimer page
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getDisclaimerPage: (req, res) => {
		return res.render("./pages/disclaimer")
	},
	
	/**
	 * Renders the cookie information page
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getCookieInformationPage: (req, res) => {
		return res.render("./pages/cookie-information")
	},
	
	/**
	 * Renders the terms of privacy page
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getTermsOfPrivacyPage: (req, res) => {
		return res.render("./pages/terms-of-privacy")
	},
	
	/**
	 * Renders the terms of use page
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getTermsOfUsePage: (req, res) => {
		return res.render("./pages/terms-of-use")
	},
	
	/**
	 * Renders the newsletter page
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getNewsletterPage: (req, res) => {
		return res.render("./pages/newsletter")
	},
	
	/**
	 * Renders the newsletter confirmation page
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getNewsletterConfirmationPage: (req, res) => {
		return res.render("./pages/newsletter-confirm", { confirmationToken: req.query.token })
	},

	/**
	 * Renders the profile page
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getProfilePage: (req, res) => {
		return res.render("./pages/profile")
	},

	/**
	 * Renders the posts page
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getPostsPage: async (req, res) => {
		const posts = await prisma.post.findMany({
			orderBy: {
				createdAt: "desc"
			}
		})
		return res.render("./pages/posts", { posts })
	},

	/**
	 * Renders the post page
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getPostByIdPage: (req, res) => {
		return res.render("./pages/posts/post")
	},

	/**
	 * Renders the create post page
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getPostsCreatePage: (req, res) => {
		return res.render("./pages/posts/create")
	},

	/**
	 * Renders the links page
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getLinksPage: async (req, res) => {
		try {
			// 1️⃣ Page & Limit aus Query holen
			const page = parseInt(req.query.page) || 1;
			const limit = parseInt(req.query.limit) || 10;

			// 2️⃣ Pagination-Funktion aufrufen
			const { data, pagination } = await paginate(prisma.link, page, limit, {
				where: { isPublic: true },
				orderBy: { createdAt: "desc" },
			});

			// 3️⃣ Ergebnis senden
			return res.render("./pages/links", { pagination, data })
		} catch (error) {
			console.error("getLinks error:", error);
			res.status(500).json({
				message: error.message || "Internal server error.",
			});
		}
		
	},

	/**
	 * Renders the link by id page
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getLinkByIdPage: async (req, res) => {
		const links = await prisma.link.findMany({
			orderBy: {
				createdAt: "desc"
			}
		})
		return res.render("./pages/links", { links })
	},

	/**
	 * Renders the my page
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getMyPage: async (req, res) => {
		const userId = req.user.id
		const links = await prisma.link.findMany({
			where: {
				userId
			},
			orderBy: {
				createdAt: "desc"
			}
		})
		return res.render("./pages/my")
	},

	
	/**
	 * Renders the my links page
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<void>}
	 */
	getMyLinksPage: async (req, res) => {
		const userId = req.user.id
		const links = await prisma.link.findMany({
			where: {
				userId
			},
			orderBy: {
				createdAt: "desc"
			}
		})
		return res.render("./pages/my/links", { links })
	}
}

module.exports = pageController
