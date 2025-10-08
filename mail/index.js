const nodemailer = require("nodemailer")

// TODO: Increase transport security by using environment variables for sensitive data
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false, // STARTTLS
  requireTLS: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});


module.exports = transporter
