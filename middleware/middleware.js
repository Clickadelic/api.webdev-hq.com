const jwt = require("jsonwebtoken")
const chalk = require("chalk")

const middleware = {
	logRequest: (req, res, next) => {
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
		// JWT aus Cookie lesen (z. B. via cookie-parser Middleware)
		const token = req.cookies?.token
		if (token) {
			try {
				const decoded = jwt.verify(token, process.env.JWT_SECRET)
				res.locals.user = decoded
				req.user = decoded // Optional für weitere Verarbeitung
			} catch (err) {
				res.locals.user = null
			}
		} else {
			res.locals.user = null
		}

		// Breadcrumbs vorbereiten
		const segments = req.path.split("/").filter(Boolean)
		res.locals.currentPath = req.path
		res.locals.pathSegments = segments

		next()
	},
	validateRegistration: (req, res, next) => {
		if (!req.body.username || req.body.username.length < 4) {
			return res.sendStatus(400).send({
				message: "min_3_characters"
			})
		}
		if (!req.body.password || req.body.password.length < 6) {
			return res.sendStatus(400).send({
				message: "min_6_characters"
			})
		}
		if (!req.body.passwordRepeat || req.body.password != req.body.passwordRepeat) {
			return res.sendStatus(400).send({
				message: "both_passwords_must_match"
			})
		}
		if (!req.body.agreedToTerms) {
			return res.sendStatus(400).send({
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
	verifyToken(req, res, next) {
		// Get auth header value
		const bearerHeader = req.headers["authorization"]
		// Check if bearer is undefined
		if (typeof bearerHeader !== "undefined") {
			// Split the bearer token from "Bearer <token>"
			const bearer = bearerHeader.split(" ")
			// Get token from array
			const token = bearer[1]
			// Verify token
			jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
				if (err) {
					// If token is invalid, return forbidden (403)
					res.sendStatus(403)
				} else {
					// If token is valid, attach the decoded user information to the request object
					req.authData = authData
					next()
				}
			})
		} else {
			// If no token, return forbidden (403)
			res.sendStatus(403)
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
	checkAuthStatus: (req, res, next) => {
		const token = req.cookies?.token
		if (token) {
			try {
				const decoded = jwt.verify(token, process.env.JWT_SECRET)
				res.locals.user = decoded
				req.user = decoded
			} catch (err) {
				res.locals.user = null
			}
		} else {
			res.locals.user = null
		}
		next()
	}
}

module.exports = middleware
