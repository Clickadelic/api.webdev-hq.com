const prisma = require("../prisma")
const { paginate } = require("../lib/utils")

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
