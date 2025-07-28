const jwt = require("jsonwebtoken")
const chalk = require("chalk")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const fs = require("fs")
const path = require("path")

const { registrationSchema, confirmationTokenSchema, loginSchema, resetPasswordSchema } = require("../schemas")

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
	setAssetPath: (req, res, next) => {
		res.locals.asset = path => `/${path}`
		next()
	},
	setLanguageSegments: (req, res, next) => {
		const segments = req.path.split("/").filter(Boolean)

		// Sprache ist das erste Segment (z. B. 'de' oder 'en')
		const supportedLanguages = ["de", "en"]
		const lang = supportedLanguages.includes(segments[0]) ? segments[0] : "en"

		res.locals.lang = lang // z. B. 'de'
		res.locals.pathWithoutLang = "/" + segments.slice(1).join("/") // z. B. '/about'

		next()
	},
	validateRegistration: (req, res, next) => {
		const { error } = registrationSchema.validate(req.body)
		if (error) {
			return res.status(400).send({ message: error.details[0].message })
		}
		next()
	},
	validateConfirmationToken: async (req, res, next) => {
		const { error } = confirmationTokenSchema.validate(req.body)
		if (error) {
			return res.status(400).send({ message: error.details[0].message })
		}
		next()
	},
	validateLogin: (req, res, next) => {
		const { error } = loginSchema.validate(req.body)
		if (error) {
			return res.status(400).send({ message: error.details[0].message })
		}
		next()
	},
	validateResetPassword: (req, res, next) => {
		const { error } = resetPasswordSchema.validate(req.body)
		if (error) {
			return res.status(400).send({ message: error.details[0].message })
		}
		next()
	},
	validateLink: (req, res, next) => {
		const { error } = res.locals.linkSchema.validate(req.body)
		if (error) {
			return res.status(400).send({ message: error.details[0].message })
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
		if (!token) return res.redirect("/auth/login")

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			req.user = decoded
			res.locals.user = decoded // <--- WICHTIG: Für Twig verfügbar machen
			next()
		} catch (err) {
			return res.redirect("/auth/login")
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
