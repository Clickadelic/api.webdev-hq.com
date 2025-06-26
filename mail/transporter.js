const nodemailer = require("nodemailer")

// TODO: Increase transport security by using environment variables for sensitive data
const transporter = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	pool: true,
	secure: false,
	requireTLS: true,
	tls: {
		ciphers: "SSLv3",
		rejectUnauthorized: false
	},
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	}
})

module.exports = transporter
