require("dotenv").config()

const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()
const chalk = require("chalk")
const path = require("path")
const twig = require("twig")
const port = process.env.PORT || 5000
const chokidar = require("chokidar")
const middleware = require("./middleware")
const pageRouter = require("./routers/page.router")
const infoRouter = require("./routers/info.router")
const authRouter = require("./routers/auth.router")
const newsletterRouter = require("./routers/newsletter.router")
const chromeExtensionRouter = require("./routers/chrome-extension.router")

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
app.use(cookieParser())
app.disable("x-powered-by")

chokidar.watch("./views").on("change", () => {
	clearTwigCache()
	console.log(chalk.bgGreenBright.white("Twig cache cleared"))
})

app.use(middleware.logRequests)
app.use(middleware.setBreadcrumbs)

app.use("/", pageRouter)
app.use("/common/v1", infoRouter)
app.use("/common/v1", authRouter)
app.use("/common/v1", newsletterRouter)
app.use("/common/v1", chromeExtensionRouter)

app.use("/{*splat}", (req, res) => {
	res.status(404).send({ message: "Frontend-route or endpoint not found. Error 404." })
})

app.listen(port, async () => {
	console.log(chalk.blueBright("----------------------------------------"))
	console.log(chalk.blue("----- Welcome to WebDev HQ Web API -----"))
	console.log(chalk.blueBright("----------------------------------------"))
	console.log(chalk.blue(">>>>>>>> " + `${process.env.APP_URL}:${process.env.PORT}`, " <<<<<<<<"))
	console.log(chalk.blueBright("----------------------------------------"))
})
