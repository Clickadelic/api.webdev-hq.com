const publicController = {
	getIndex: async (req, res) => {
		return res.render("./pages/index")
	},
	getAbout: async (req, res) => {
		return res.render("./pages/about")
	},
	getRegister: async (req, res) => {
		return res.render("./pages/register")
	},
	getLogin: async (req, res) => {
		return res.render("./pages/login")
	},
	getForgotPassword: async (req, res) => {
		return res.render("./pages/forgot-password")
	},
	getDisclaimer: async (req, res) => {
		return res.render("./pages/disclaimer")
	},
	getCookieInformation: async (req, res) => {
		return res.render("./pages/cookie-information")
	},
	getTermsOfPrivacy: async (req, res) => {
		return res.render("./pages/terms-of-privacy")
	}
}

module.exports = publicController
