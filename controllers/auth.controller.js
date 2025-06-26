const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const transporter = require("../mail/transporter")

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const path = require("path")
const fs = require("fs")
const handlebars = require("handlebars")

const authController = {
	registerUser: async (req, res) => {
		try {
			const existingUser = await prisma.user.findUnique({
				where: {
					email: req.body.email
				}
			})

			if (existingUser) {
				return res.status(409).send({ message: "email_already_taken" })
			}

			const salt = await bcrypt.genSalt(10)
			const hashedPassword = await bcrypt.hash(req.body.password, salt)

			const newUser = {
				username: req.body.username,
				email: req.body.email,
				password: hashedPassword
			}

			const createdUser = await prisma.user.create({
				data: newUser
			})

			const verificationToken = String(Math.floor(100000 + Math.random() * 900000))

			const expires = new Date()
			expires.setHours(expires.getHours() + 24) // Token ist 24 Stunden gültig

			// Erstelle den Verifizierungs-Token und verknüpfe ihn mit dem neuen Benutzer
			await prisma.verificationToken.create({
				data: {
					email: createdUser.email,
					token: verificationToken,
					expires: expires
				}
			})

			return res.status(200).send({ message: "register_successful" })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ message: "something_went_wrong" })
		}
	},
	login: async (req, res) => {
		try {
			const user = await prisma.user.findUnique({
				where: {
					email: req.body.email
				}
			})
			if (user) {
				bcrypt.compare(req.body.password, user.password, (error, match) => {
					if (error) {
						throw error
					}
					if (match) {
						const token = jwt.sign(
							{
								email: user.email,
								userId: user.id,
								name: user.name,
								role: user.role
							},
							process.env.JWT_SECRET,
							{
								expiresIn: "7d"
							}
						)
						res.cookie("token", token, {
							httpOnly: true,
							secure: process.env.NODE_ENV === "production",
							sameSite: "lax",
							maxAge: 2 * 60 * 60 * 1000 // 2 Stunden
						})
						return res.status(200).json({
							message: "login_successful",
							token,
							user: user
						})
					} else {
						return res.status(401).json({
							message: "login_error_no_pw_match"
						})
					}
				})
			} else {
				return res.status(404).json({ message: "no_such_user_in_database" })
			}
		} catch (error) {
			res.status(400).json({ message: error })
		}
	},
	logout: async (req, res) => {
		try {
			res.clearCookie("token")
			res.status(200).json({ message: "logout_successful" })
		} catch (error) {
			res.status(400).json({ message: error })
		}
	},
	resetPassword: async (req, res) => {
		try {
			const user = await prisma.user.findUnique({
				where: {
					email: req.body.email
				}
			})

			if (!user) {
				return res.status(404).json({ message: "no_such_user_in_database" })
			}

			// Template lesen
			const templatePath = path.join(__dirname, "../mail/templates/reset-password.hbs")
			let source
			try {
				source = fs.readFileSync(templatePath, "utf8")
			} catch (readErr) {
				console.error("Fehler beim Lesen der Template-Datei:", readErr)
				return res.status(500).json({ message: "template_file_error" })
			}

			let html
			try {
				const template = handlebars.compile(source)
				html = template({ name: user.username })
			} catch (compileErr) {
				console.error("Fehler beim Kompilieren der Vorlage:", compileErr)
				return res.status(500).json({ message: "template_compile_error" })
			}

			const mailOptions = {
				from: process.env.MAIL_FROM,
				to: user.email,
				bcc: process.env.MAIL_ADMIN,
				subject: "Reset your password",
				html: html
			}

			try {
				const info = await transporter.sendMail(mailOptions)
				console.log("E-Mail erfolgreich gesendet:", info.response)
				return res.status(200).json({ message: "password_reset_token_sent" })
			} catch (sendErr) {
				console.error("Fehler beim Senden der E-Mail:", sendErr)
				return res.status(500).json({ message: "email_send_error", detail: sendErr.toString() })
			}
		} catch (error) {
			console.error("Allgemeiner Fehler im Controller:", error)
			return res.status(500).json({ message: "server_error", detail: error.toString() })
		}
	},
	getUsers: async (req, res) => {
		try {
			const users = await prisma.user.findMany()
			users.forEach(user => {
				user.password = undefined
			})
			res.status(200).json(users)
		} catch (error) {
			res.status(400).json({ message: error })
		}
	},
	getUser: async (req, res) => {
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: req.params.id
				}
			})
			if (user) {
				user.password = undefined
				res.status(200).json(user)
			}
		} catch (error) {
			res.status(400).json({ message: error })
		}
	}
}

module.exports = authController
