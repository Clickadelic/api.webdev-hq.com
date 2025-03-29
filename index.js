require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")
const chalk = require("chalk")
const path = require("path")
const infoRouter = require("./routers/info.router")
const userRouter = require("./routers/user.router")
const subscriberRouter = require("./routers/subscriber.router")
const middleware = require("./middleware/middleware")
const port = process.env.PORT || 5000
const twig = require("twig")
const chokidar = require("chokidar")

app.set("view engine", "twig")
app.set("view cache", false)
app.set("views", __dirname + "/views")

app.use(express.static(path.join(__dirname, "/public")))
app.use(cors({ credentials: true, origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.disable("x-powered-by")
const clearTwigCache = () => {
	twig.cache(false)
}

chokidar.watch("./views").on("change", () => {
	clearTwigCache()
	console.log(chalk.bgGreenBright.white("Twig cache cleared"))
})

app.get("/", (req, res) => {
	res.render("./pages")
})

app.get("/about", (req, res) => {
	res.render("./pages/about")
})

app.use("/common/v1", infoRouter)
app.use("/common/v1", userRouter)
app.use("/common/v1", subscriberRouter)

app.use("*", (req, res) => {
	res.status(200).send({ message: "Error 404, file or page not found" })
})

app.listen(port, async () => {
	console.log(chalk.blueBright("----------------------------------------"))
	console.log(chalk.blue("----- Welcome to WebDev HQ Web API -----"))
	console.log(chalk.blueBright("----------------------------------------"))
	console.log(chalk.blue(">>>>>>>> http://localhost:5000 <<<<<<<<<"))
	console.log(chalk.blueBright("----------------------------------------"))
})

module.exports = app
