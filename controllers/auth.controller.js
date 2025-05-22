const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const transporter = require("../mail/transporter")

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const authController = {
	registerUser: async (req, res) => {
		const { name, email, password, passwordRepeat } = req.body

		const existingEmail = await prisma.user.findUnique({
			where: {
				email: email
			}
		})
		if (existingEmail) {
			return res.status(409).json({ message: "email_already_exists" })
		}

		if (password !== passwordRepeat) {
			return res.status(400).json({ message: "passwords_do_not_match" })
		}

		try {
			const hashedPassword = await bcrypt.hash(password, 10)
			await prisma.user.create({
				data: {
					name: name,
					email: email,
					password: hashedPassword
				}
			})
			return res.status(200).send({ message: "register_successful" })
		} catch (error) {
			console.error(error)
		}

		res.status(500).send({ message: "something_went_wrong" })
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

module.exports = authController
