const app = require("./app")
const chalk = require("chalk")

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(chalk.greenBright("----------------------------------------"))
	console.log(chalk.blueBright("----- Welcome to WebDev HQ Web API -----"))
	console.log(chalk.greenBright("----------------------------------------"))
	console.log(chalk.blueBright(">>>>>>>> " + `${process.env.APP_URL}:${process.env.PORT}`, " <<<<<<<<"))
	console.log(chalk.greenBright("----------------------------------------"))
})