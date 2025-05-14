const fs = require("fs")
const path = require("path")
const crypto = require("crypto")

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const handlebars = require("handlebars")
const transporter = require("../mail/transporter")

const newsletterController = {
	registerSubscriber: async (req, res) => {
		const name = req.body.name
		const email = req.body.email
		const agreedToSubscription = req.body.agreedToSubscription

		if (!name || !email || !agreedToSubscription) {
			return res.status(400).send({ message: "missing_fields" })
		}
		try {
			const subscriber = await prisma.subscriber.findUnique({
				where: {
					email
				}
			})
			if (subscriber) {
				return res.status(409).send({ message: "email_already_subscribed" })
			}
			const token = crypto.randomBytes(32).toString("hex")
			const newSubscriber = await prisma.subscriber.create({
				data: {
					name,
					email,
					agreedToSubscription
					// confirmationToken: token, // Spalte muss in der DB existieren
					// confirmed: false
				}
			})
			const templatePath = path.join(__dirname, "../mail/templates/confirm-subscribtion.hbs")
			const source = fs.readFileSync(templatePath, "utf8")
			const template = handlebars.compile(source)
			const confirmationLink = `https://webdev-hq.com/confirm-subscription?token=${token}`

			const html = template({
				name: newSubscriber.name,
				confirmationLink
			})
			const mailOptions = {
				from: process.env.MAIL_FROM,
				to: email,
				// cc: process.env.MAIL_ADMIN,
				bcc: process.env.MAIL_ADMIN,
				subject: "Confirm your subscribtion",
				html
			}
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					return res.status(504).send({ message: error })
				}
				console.log("Success sending mail.", info)
			})
		} catch (error) {
			return res.status(504).send({ message: error })
		}
		res.status(201).send({ message: "subscribtion_success" })
	},
	confirmSubscription: async (req, res) => {
		try {
			const token = req.query.token

			if (!token) {
				return res.status(400).send({ message: "confirmation_token_missing" })
			}

			// Abonnenten anhand des Tokens finden
			const subscriber = await prisma.subscriber.findFirst({
				where: {
					confirmationToken: token
				}
			})

			if (!subscriber) {
				return res.status(404).send({ message: "invalid_or_expired_token" })
			}

			if (subscriber.confirmed) {
				return res.status(200).send({ message: "email_already_confirmed" })
			}

			// Bestätigen und optional Token entfernen
			await prisma.subscriber.update({
				where: {
					id: subscriber.id
				},
				data: {
					confirmed: true,
					confirmationToken: null
				}
			})

			res.status(200).send({ message: "email_successfully_confirmed" })
		} catch (error) {
			console.error("Fehler bei der E-Mail-Bestätigung:", error)
			res.status(500).send({ message: "internal_server_error" })
		}
	},
	unregisterSubscriber: async (req, res) => {
		try {
			const subscriber = await prisma.subscriber.findUnique({
				where: {
					email: req.body.email
				}
			})
			if (subscriber) {
				return res.status(200).send({ message: "email_unsubscribed" })
			}
			res.status(200).send({ message: "email_not_subscribed" })
		} catch (error) {
			res.status(504).send({ message: error })
		}
	}
}

module.exports = newsletterController
