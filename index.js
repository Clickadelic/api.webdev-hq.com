require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")
const chalk = require("chalk")
const path = require("path")
const infoRouter = require("./routers/info.router")
const userRouter = require("./routers/user.router")
const newsletterRouter = require("./routers/newsletter.router")
const middleware = require("./middleware/middleware")
const port = process.env.PORT || 5000
const twig = require("twig")
const chokidar = require("chokidar")
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

app.get("/", (req, res) => {
	const pathSegments = req.path.split("/").filter(segment => segment)
	res.render("./pages", { pathSegments, fullPath: req.path })
})

app.get("/about", (req, res) => {
	const pathSegments = req.path.split("/").filter(segment => segment)
	res.render("./pages/about", { pathSegments, fullPath: req.path })
})

app.get("/auth/register", (req, res) => {
	const pathSegments = req.path.split("/").filter(segment => segment)
	res.render("./pages/register", { pathSegments, fullPath: req.path })
})

app.get("/auth/login", (req, res) => {
	const pathSegments = req.path.split("/").filter(segment => segment)
	res.render("./pages/login", { pathSegments, fullPath: req.path })
})

app.get("/auth/forgot-password", (req, res) => {
	const pathSegments = req.path.split("/").filter(segment => segment)
	res.render("./pages/forgot-password", { pathSegments, fullPath: req.path })
})

app.get("/auth/login", (req, res) => {
	res.render("./pages/login")
})

app.get("/disclaimer", (req, res) => {
	const pathSegments = req.path.split("/").filter(segment => segment)
	res.render("./pages/disclaimer", { pathSegments, fullPath: req.path })
})

app.get("/terms-of-privacy", (req, res) => {
	const pathSegments = req.path.split("/").filter(segment => segment)
	res.render("./pages/terms-of-privacy", { pathSegments, fullPath: req.path })
})

app.use("/common/v1", infoRouter)
app.use("/common/v1", userRouter)
app.use("/common/v1", newsletterRouter)

app.get("*", (req, res) => {
	const pathSegments = req.path.split("/").filter(segment => segment) // URL-Segmente extrahieren
	res.render("breadcrumb.twig", { pathSegments, fullPath: req.path })
})

app.listen(port, async () => {
	console.log(chalk.blueBright("----------------------------------------"))
	console.log(chalk.blue("----- Welcome to WebDev HQ Web API -----"))
	console.log(chalk.blueBright("----------------------------------------"))
	console.log(chalk.blue(">>>>>>>> http://localhost:5000 <<<<<<<<<"))
	console.log(chalk.blueBright("----------------------------------------"))
})

module.exports = app
