const fs = require("fs")
const path = require("path")
const crypto = require("crypto")

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const handlebars = require("handlebars")
const transporter = require("../mail/transporter")

const newsletterController = {
	registerSubscriber: async (req, res) => {
		try {
			const existingSubscriber = await prisma.subscriber.findUnique({
				where: {
					email: req.body.email
				}
			})

			if (existingSubscriber) {
				return res.status(409).send({ message: "email_already_subscribed" })
			}

			// Token generieren
			const token = crypto.randomBytes(32).toString("hex")

			// Neuen Abonnenten inkl. Token anlegen
			const newSubscriber = await prisma.subscriber.create({
				data: {
					subscribername: req.body.subscribername,
					email: req.body.email,
					agreedToSubscription: req.body.agreedToSubscription,
					confirmationToken: token,
					confirmed: true
				}
			})

			// Template laden
			const templatePath = path.join(__dirname, "../templates/confirmation-email.hbs")
			const source = fs.readFileSync(templatePath, "utf8")
			const template = handlebars.compile(source)

			// Bestätigungslink erzeugen
			const confirmationLink = `${process.env.BASE_URL}/confirm-subscription?token=${token}`

			// HTML erzeugen
			const html = template({
				subscribername: newSubscriber.subscribername,
				confirmationLink
			})

			// Mail senden
			try {
				const sendResult = await transporter.sendMail({
					sender: process.env.MAIL_SENDER,
					from: process.env.MAIL_FROM,
					to: newSubscriber.email,
					subject: "WebDev HQ Newsletter – Bitte bestätige deine Anmeldung",
					html
				})

				console.log("E-Mail erfolgreich gesendet:", sendResult)
			} catch (mailError) {
				console.error("Fehler beim Senden der E-Mail:", mailError)
				return res.status(500).send({ message: "email_sending_failed" })
			}

			res.status(201).send({ message: "user_successfully_subscribed" })
		} catch (error) {
			console.error("Fehler beim Speichern des Abonnenten:", error)
			res.status(500).send({ message: "internal_server_error" })
		}
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
