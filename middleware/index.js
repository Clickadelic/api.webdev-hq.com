const jwt = require("jsonwebtoken")
const chalk = require("chalk")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const middleware = {
	logRequests: (req, res, next) => {
		res.locals.currentPath = req.url
		console.log(
			chalk.yellowBright("Method:"),
			chalk.yellowBright(req.method),
			chalk.cyanBright("URL:", req.url),
			chalk.green("Timestamp:"),
			chalk.green(new Intl.DateTimeFormat("de-DE", { dateStyle: "short", timeStyle: "medium" }).format(new Date()))
		)
		next()
	},
	setBreadcrumbs: (req, res, next) => {
		const segments = req.path.split("/").filter(Boolean)
		res.locals.currentPath = req.path
		res.locals.pathSegments = segments
		next()
	},
	validateRegistration: (req, res, next) => {
		if (!req.body.username || req.body.username.length < 4) {
			return res.status(400).send({
				message: "min_3_characters"
			})
		}
		if (!req.body.email || req.body.email.length < 5) {
			return res.status(400).send({
				message: "min_3_characters"
			})
		}
		if (!req.body.password || req.body.password.length < 6) {
			return res.status(400).send({
				message: "min_6_characters"
			})
		}
		if (!req.body.passwordRepeat || req.body.password !== req.body.passwordRepeat) {
			return res.status(400).send({
				message: "both_passwords_must_match"
			})
		}
		if (!req.body.agreedToTerms) {
			return res.status(400).send({
				message: "terms_not_accepted"
			})
		}
		next()
	},
	isLoggedIn: (req, res, next) => {
		try {
			const authHeader = req.headers.authorization || localStorage.getItem("token")
			const token = authHeader.split(" ")[1]
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			req.userData = decoded
			next()
		} catch (err) {
			return res.sendStatus(401).send({
				message: "restricted_content_login_first"
			})
		}
	},
	verifyTokenFromCookie: (req, res, next) => {
		const token = req.cookies.token
		if (!token) return res.redirect("/login")

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			req.user = decoded
			res.locals.user = decoded // <--- WICHTIG: Für Twig verfügbar machen
			next()
		} catch (err) {
			return res.redirect("/login")
		}
	},
	checkAuthStatus: async (req, res, next) => {
		const token = req.cookies.token

		if (!token) {
			res.locals.user = null
			return next()
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			// optional: vollständigen User aus DB laden
			const user = await prisma.user.findUnique({
				where: { id: decoded.id }
			})
			user.password = undefined // Passwort nicht zurückgeben
			res.locals.user = user
			next()
		} catch (error) {
			console.error("JWT verification failed:", error)
			res.locals.user = null
			next()
		}
	}
}

module.exports = middleware
