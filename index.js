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

// 🔌 Prisma-Verbindung sauber trennen beim Beenden
const shutdown = async (signal) => {
	console.log(chalk.yellowBright(`\n${signal} receive. Disconnecting Prisma, shutting down connection`))
	await prisma.$disconnect()
	server.close(() => {
		console.log(chalk.redBright("Server wurde beendet."))
		process.exit(0)
	})
}

// process.on("SIGINT", () => shutdown("SIGINT"))
// process.on("SIGTERM", () => shutdown("SIGTERM"))

// Verbindungen ordentlich schließen bei Prozessende
process.on("SIGINT", async () => {
	console.log("\nSIGINT received. Disconnecting Prisma, shutting down connection")
	await prisma.$disconnect()
	server.close(() => {
		console.log("Server beendet.")
		process.exit(0)
	})
})

process.on("SIGTERM", async () => {
	console.log("\nSIGTERM received. Disconnecting Prisma, shutting down connection")
	await prisma.$disconnect()
	server.close(() => {
		console.log("Server beendet.")
		process.exit(0)
	})
})