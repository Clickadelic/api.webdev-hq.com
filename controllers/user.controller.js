const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const transporter = require("../mail/transporter")

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const userController = {
	registerUser: async (req, res) => {
		const mailOptions = {
			from: process.env.MAIL_EMAIL,
			to: req.body.email,
			cc: "toby.hopp@gmail.com",
			subject: "Your API-Registration",
			text: "Hi, Thank you for your API-Registration. Please activate your account."
		}
		try {
			const user = await prisma.user.findUnique({
				where: {
					username: req.body.username
				}
			})
			if (user) {
				return res.status(409).send({ message: "username_already_taken" })
			}
			const salt = await bcrypt.genSalt(10)
			const hashedPassword = await bcrypt.hash(req.body.password, salt)
			const newUser = {
				username: req.body.username,
				email: req.body.email,
				password: hashedPassword,
				agreedToTerms: req.body.agreedToTerms
			}
			await prisma.user.create({
				data: newUser
			})
			// TODO bessere Prüfung z.b: E-mail succes && Register success
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					return res.status(500).send({ message: "error_sending_email", error })
				}
				// TODO Kombinieren der beiden Fälle
				// res.status(200).send({ message: "Email sent", info });
				console.log(email)
			})
			res.status(201).send({ message: "user_successfully_registered" })
		} catch (error) {
			res.status(504).send({ message: error })
		}
	},
	login: async (req, res) => {
		try {
			const user = await prisma.user.findUnique({
				where: {
					username: req.body.username
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
								username: user.username,
								userId: user.id
							},
							process.env.JWT_SECRET,
							{
								expiresIn: "7d"
							}
						)
						user.password = undefined
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
	getUsers: async (req, res) => {
		try {
			const users = await prisma.user.findAll()
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
			const user = await prisma.user.findOne({
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

module.exports = userController
