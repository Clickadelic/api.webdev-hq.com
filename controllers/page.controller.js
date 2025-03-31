const pageController = {
	getIndexPage: async (req, res) => {
		return res.render("./pages/index")
	},
	getDocsPage: async (req, res) => {
		return res.render("./pages/docs")
	},
	getRegisterPage: async (req, res) => {
		return res.render("./pages/register")
	},
	getLoginPage: async (req, res) => {
		return res.render("./pages/login")
	},
	getForgotPasswordPage: async (req, res) => {
		return res.render("./pages/forgot-password")
	},
	getDisclaimerPage: async (req, res) => {
		return res.render("./pages/disclaimer")
	},
	getCookieInformationPage: async (req, res) => {
		return res.render("./pages/cookie-information")
	},
	getTermsOfPrivacyPage: async (req, res) => {
		return res.render("./pages/terms-of-privacy")
	},
	getTermsOfUsePage: async (req, res) => {
		return res.render("./pages/terms-of-use")
	},
	getNewsletterPage: async (req, res) => {
		return res.render("./pages/newsletter", { currentPath: res.locals.currentPath })
	},
	getDashboardPage: async (req, res) => {
		return res.render("./pages/dashboard", { currentPath: res.locals.currentPath, user: req.authData })
	}
}

module.exports = pageController
