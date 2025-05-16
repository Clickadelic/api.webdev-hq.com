const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const transporter = require("../mail/transporter")

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const authController = {
	registerUser: async (req, res) => {
		try {
			const user = await prisma.user.findUnique({
				where: {
					username: req.body.username
				}
			})
			if (user) {
				res.status(409).send({ message: "username_already_taken" })
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
			res.status(201).send({ message: "user_created" })
		} catch (error) {
			res.status(504).send({ message: error })
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
								userId: user.id
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
						console.log(user)
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
