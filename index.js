const app = require("./app")
// const prisma = require("./lib/prisma") // ← Singleton Prisma-Client
const chalk = require("chalk")

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
	console.log(chalk.whiteBright("----------------------------------------"))
	console.log(chalk.greenBright(">> WebDev HQ Web API - up and running <<"))
	console.log(chalk.whiteBright("----------------------------------------"))
	console.log(chalk.whiteBright(">>>>>>> @" + `${process.env.APP_URL}:${PORT}`, " <<<<<<<<"))
	console.log(chalk.whiteBright("----------------------------------------"))
})