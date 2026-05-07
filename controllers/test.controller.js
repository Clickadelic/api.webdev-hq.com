const prisma = require("../prisma")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const transporter = require("../mail")
const path = require("path")
const fs = require("fs")

const handlebars = require("handlebars")

const testController = {
	/**
	 * Registers a new user.
	 * If the email is already taken, it returns a 409 status code.
	 * It generates a verification token and sends an email with the link to confirm the registration.
	 * @param {Object} req - The HTTP request object.
	 * @param {Object} res - The HTTP response object.
	 * @returns {Promise<void>}
	 */
	getUptime: async (req, res) => {
		return res.status(200).send({ uptime: process.uptime() })
	}
}

module.exports = testController
