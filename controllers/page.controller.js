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
		return res.render("./pages/auth/register", { confirmationToken: req.query.token })
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
	getLinksPage: (req, res) => {
		return res.render("./pages/links")
	},
	getAdminPage: (req, res) => {
		return res.render("./pages/admin")
	},
	getAdminUsersPage: (req, res) => {
		return res.render("./pages/admin/users")
	}
}

module.exports = pageController
