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
				res.status(200).json(user)
			}
		} catch (error) {
			res.status(400).json({ message: error })
		}
	}
}

module.exports = userController
