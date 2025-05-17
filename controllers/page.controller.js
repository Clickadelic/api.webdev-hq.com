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
		return res.render("./pages/register")
	},
	getLoginPage: (req, res) => {
		return res.render("./pages/login")
	},
	getForgotPasswordPage: (req, res) => {
		return res.render("./pages/forgot-password")
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
		return res.render("./pages/newsletter", { currentPath: res.locals.currentPath })
	},
	getNewsletterConfirmationPage: (req, res) => {
		return res.render("./pages/newsletter-confirm", { currentPath: res.locals.currentPath, confirmationLink: req.query.token })
	},
	getDashboardPage: (req, res) => {
		return res.render("./pages/dashboard", { currentPath: res.locals.currentPath, user: res.locals.user })
	},
	getAccountPage: (req, res) => {
		return res.render("./pages/account", { currentPath: res.locals.currentPath, user: res.locals.user })
	}
}

module.exports = pageController
