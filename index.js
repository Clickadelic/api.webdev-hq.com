require("dotenv").config()
// Imports
const express = require("express")
const app = express()
const cors = require("cors")
const chalk = require("chalk")
const path = require("path")
const twig = require("twig")
const port = process.env.PORT || 5000
const chokidar = require("chokidar")
const middleware = require("./middleware/middleware")
const publicRouter = require("./routers/public.router")
const infoRouter = require("./routers/info.router")
const userRouter = require("./routers/user.router")
const newsletterRouter = require("./routers/newsletter.router")

// Config and setup
const clearTwigCache = () => {
	twig.cache(false)
}
app.set("view engine", "twig")
app.set("view cache", false)
app.set("views", __dirname + "/views")

app.use(express.static(path.join(__dirname, "/public")))
app.use(cors({ credentials: true, origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.disable("x-powered-by")

chokidar.watch("./views").on("change", () => {
	clearTwigCache()
	console.log(chalk.bgGreenBright.white("Twig cache cleared"))
})

// Routes
app.use("/", middleware.logRequest, publicRouter)
app.use("/common/v1", middleware.logRequest, infoRouter)
app.use("/common/v1", middleware.verifyToken, middleware.logRequest, userRouter)
app.use("/common/v1", middleware.logRequest, newsletterRouter)

// 404 error Fallback
app.use("*", (req, res) => {
	res.status(200).send({ message: "Error 404, file or page not found" })
})

// Server console
app.listen(port, async () => {
	console.log(chalk.blueBright("----------------------------------------"))
	console.log(chalk.blue("----- Welcome to WebDev HQ Web API -----"))
	console.log(chalk.blueBright("----------------------------------------"))
	console.log(chalk.blue(">>>>>>>> http://localhost:5000 <<<<<<<<<"))
	console.log(chalk.blueBright("----------------------------------------"))
})

module.exports = app
