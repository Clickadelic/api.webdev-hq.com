const app = require("./app")
const prisma = require("./lib/prisma") // ← Singleton Prisma-Client
const chalk = require("chalk")

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
	console.log(chalk.greenBright("----------------------------------------"))
	console.log(chalk.blueBright("----- Welcome to WebDev HQ Web API -----"))
	console.log(chalk.greenBright("----------------------------------------"))
	console.log(chalk.blueBright(">>>>>>>> " + `${process.env.APP_URL}:${PORT}`, " <<<<<<<<"))
	console.log(chalk.greenBright("----------------------------------------"))
})

const shutdown = async (signal) => {
	console.log(chalk.yellowBright(`\n${signal} received. Prisma-Client disconnecting...`))
	await prisma.$disconnect()
	server.close(() => {
		console.log(chalk.redBright("Server was shut down."))
		process.exit(0)
	})
}

process.on("SIGINT", () => shutdown("SIGINT"))
process.on("SIGTERM", () => shutdown("SIGTERM"))