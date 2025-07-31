const prisma = require("../prisma")

const pageController = {
	getIndexPage: (req, res) => {
		return res.render("./pages/index")
	},
	getDocsPage: (req, res) => {
		return res.render("./pages/docs")
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
	getProfilePage: (req, res) => {
		return res.render("./pages/profile")
	},
	getPostsPage: async (req, res) => {
		const posts = await prisma.post.findMany({
			orderBy: {
				createdAt: "desc"
			}
		})
		return res.render("./pages/posts", { posts })
	},
	getPostByIdPage: (req, res) => {
		return res.render("./pages/posts/post")
	},
	getPostsCreatePage: (req, res) => {
		return res.render("./pages/posts/create")
	},
	getLinksPage: async (req, res) => {
		const links = await prisma.link.findMany({
			orderBy: {
				createdAt: "desc"
			}
		})
		return res.render("./pages/links", { links })
	},
	getLinkByIdPage: async (req, res) => {
		const links = await prisma.link.findMany({
			orderBy: {
				createdAt: "desc"
			}
		})
		return res.render("./pages/links", { links })
	}
}

module.exports = pageController
