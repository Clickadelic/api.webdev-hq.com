const pageController = {
	getIndexPage: (req, res) => {
		return res.render("./pages/index", { content_position: "center" })
	},
	getDocsPage: (req, res) => {
		return res.render("./pages/docs")
	},
	getAboutPage: (req, res) => {
		return res.render("./pages/about")
	},
	getRegisterPage: (req, res) => {
		return res.render("./pages/register", { content_position: "center" })
	},
	getLoginPage: (req, res) => {
		return res.render("./pages/login", { content_position: "center" })
	},
	getForgotPasswordPage: (req, res) => {
		return res.render("./pages/forgot-password", { content_position: "center" })
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
		return res.render("./pages/newsletter", { currentPath: res.locals.currentPath, content_position: "center" })
	},
	getNewsletterConfirmationPage: (req, res) => {
		return res.render("./pages/newsletter-confirm", { currentPath: res.locals.currentPath, confirmationLink: req.query.token, content_position: "center" })
	},
	getDashboardPage: (req, res) => {
		return res.render("./pages/dashboard", { currentPath: res.locals.currentPath, user: res.locals.user })
	},
	getAccountPage: (req, res) => {
		return res.render("./pages/account", { currentPath: res.locals.currentPath, user: res.locals.user })
	},
	getPostsPage: (req, res) => {
		return res.render("./pages/posts", { currentPath: res.locals.currentPath, user: res.locals.user })
	},
	getLinksPage: (req, res) => {
		return res.render("./pages/links", { currentPath: res.locals.currentPath, user: res.locals.user })
	}
}

module.exports = pageController
