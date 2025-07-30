const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const transporter = require("../mail")
const path = require("path")
const fs = require("fs")

const handlebars = require("handlebars")

const userController = {
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
	getUserById: async (req, res) => {
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
	},
	updateUserById: async (req, res) => {
		// const { username, email, bio, image, password } = req.body
		try {
			const { error } = UserSchema.validate(req.body)
			if (error) {
				return res.status(400).send({ message: error.details[0].message })
			}
			const existingUser = await prisma.user.findUnique({
				where: {
					id: req.params.id
				}
			})
			if(!existingUser) {
				return res.status(404).json({ message: "no_such_user_in_database" })
			}
			// if (req.body.password) {
			// 	const salt = await bcrypt.genSalt(10)
			// 	const hashedPassword = await bcrypt.hash(req.body.password, salt)
			// 	req.body.password = hashedPassword
			// }
			const user = await prisma.user.update({
				where: {
					id: req.params.id
				},
				data: req.body
			})
			if (user) {
				user.password = undefined
				return res.status(200).json(user)
			}
		} catch (error) {
			return res.status(400).json({ message: error })
		}
	},
	deleteUserById: async (req, res) => {
		try {
			const user = await prisma.user.delete({
				where: {
					id: req.params.id
				}
			})
			if (user) {
				user.password = undefined
				return res.status(200).json({ message: "user_deleted" })
			}
		} catch (error) {
			return res.status(400).json({ message: error })
		}
	}
}

module.exports = userController
