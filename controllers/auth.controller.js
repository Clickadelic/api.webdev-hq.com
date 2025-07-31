const prisma = require("../lib/prisma")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const transporter = require("../mail")
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
			// E-Mail Template
			const templatePath = path.join(__dirname, "../mail/templates/confirm-registration.hbs")
			const source = fs.readFileSync(templatePath, "utf8")
			const template = handlebars.compile(source)
			const confirmationLink = `${process.env.APP_URL}/auth/confirm?token=${verificationToken}`
			const html = template({
				name: newUser.username,
				confirmationLink
			})
			const mailOptions = {
				from: process.env.MAIL_FROM,
				sender: process.env.MAIL_SENDER,
				to: newUser.email,
				// cc: process.env.MAIL_ADMIN,
				bcc: process.env.MAIL_ADMIN,
				subject: "Confirm your registration",
				html
			}
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					return res.status(504).send({ message: error })
				}
				console.log("Success sending mail.")
			})

			return res.status(200).send({ message: "register_successful" })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ message: "something_went_wrong" })
		}
	},
	confirmRegistration: async (req, res) => {
		try {
			const { token } = req.query
			if (!token) {
				return res.status(400).json({ error: "Token missing." })
			}

			const verificationToken = await prisma.verificationToken.findUnique({
				where: { token }
			})

			if (!verificationToken) {
				return res.status(400).send({ message: "Token is invalid." })
			}

			if (verificationToken.expires < new Date()) {
				return res.status(400).send({ message: "Token has expired." })
			}

			const user = await prisma.user.findUnique({
				where: { email: verificationToken.email }
			})

			if (!user) {
				return res.status(404).send({ message: "User not found." })
			}

			await prisma.user.update({
				where: { email: user.email },
				data: { emailVerified: new Date() }
			})

			await prisma.verificationToken.delete({
				where: { token }
			})

			return res.status(200).send({ message: "Email verified. Forwarding in 3 seconds." })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ message: "Internal server error" })
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
								id: user.id,
								username: user.username,
								image: user.image,
								role: user.role,
								createdAt: user.createdAt,
								updatedAt: user.updatedAt
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
		const { error } = resetPasswordSchema.validate(req.body)
		if (error) {
			return res.status(400).send({ message: error.details[0].message })
		}
		try {
			const user = await prisma.user.findUnique({
				where: {
					email: req.body.email
				}
			})
			if (!user) {
				return res.status(404).json({ message: "no_such_user_in_database" })
			}

			// Compile E-Mail Template
			const templatePath = path.join(__dirname, "../mail/templates/reset-password.hbs")
			const source = fs.readFileSync(templatePath, "utf8")
			const template = handlebars.compile(source)

			// Add variables to the template
			const html = template({
				username: user.username
			})

			const mailOptions = {
				from: process.env.MAIL_FROM,
				to: user.email,
				// cc: process.env.MAIL_ADMIN,
				bcc: process.env.MAIL_ADMIN,
				subject: "Reset your password",
				html: html
			}

			transporter.sendMail(mailOptions, (error) => {
				if (error) {
					return res.status(504).send({ message: error })
				}
				console.log("Success sending mail.")
			})

			return res.status(200).json({ message: "password_reset_token_sent" })
		} catch (error) {
			res.status(400).json({ message: error })
		}
	}
}

module.exports = authController
