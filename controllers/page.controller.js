const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const pageController = {
	getIndexPage: (req, res) => {
		return res.render("./pages/index")
	},
	getDocsPage: (req, res) => {
		return res.render("./pages/docs")
	},
	getAboutPage: (req, res) => {
		return res.render("./pages/about")
	},
	getRegisterPage: (req, res) => {
		return res.render("./pages/auth/register", {
			confirmationToken: req.query.token,
			query: req.query // wird gebraucht für `query.token is defined` in Twig
		})
	},
	getRegisterConfirmationPage: (req, res) => {
		return res.render("./pages/auth/confirm", {
			token: req.query.token,
			query: req.query // wird gebraucht für `query.token is defined` in Twig
		})
	},
	getLoginPage: (req, res) => {
		return res.render("./pages/auth/login")
	},
	getResetPasswordPage: (req, res) => {
		return res.render("./pages/auth/reset-password")
	},
	getDisclaimerPage: (req, res) => {
		return res.render("./pages/disclaimer")
	},
	getCookieInformationPage: (req, res) => {
		return res.render("./pages/cookie-information")
	},
	getTermsOfPrivacyPage: (req, res) => {
		return res.render("./pages/terms-of-privacy")
	},
	getTermsOfUsePage: (req, res) => {
		return res.render("./pages/terms-of-use")
	},
	getNewsletterPage: (req, res) => {
		return res.render("./pages/newsletter")
	},
	getNewsletterConfirmationPage: (req, res) => {
		return res.render("./pages/newsletter-confirm", { confirmationToken: req.query.token })
	},
	getDashboardPage: (req, res) => {
		return res.render("./pages/dashboard")
	},
	getAccountPage: (req, res) => {
		return res.render("./pages/account")
	},
	getPostsPage: (req, res) => {
		return res.render("./pages/posts")
	},
	getLinksPage: async (req, res) => {
		const links = await prisma.link.findMany({
			where: {
				userId: req.user.id
			},
			orderBy: {
				createdAt: "desc"
			}
		})
		return res.render("./pages/links", { links })
	},
	getLinkByIdPage: async (req, res) => {
		const links = await prisma.link.findMany({
			where: {
				userId: req.user.id
			},
			orderBy: {
				createdAt: "desc"
			}
		})
		return res.render("./pages/links", { links })
	},
	getAdminPage: (req, res) => {
		return res.render("./pages/admin")
	},
	getAdminUsersPage: async (req, res) => {
		const users = await prisma.user.findMany()
		users.forEach(user => {
			user.password = undefined
		})
		return res.render("./pages/admin/users", { users })
	}
}

module.exports = pageController
