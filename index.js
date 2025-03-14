require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const port = process.env.PORT || 5000;

app.set("view engine", "twig");
app.set("views", __dirname + "/views");

app.use(express.static(path.join(__dirname, "/public")));
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.render("./pages");
});

// app.use("/common/v1", infoRouter);

app.use("*", (req, res) => {
  res.status(200).send({ message: "Error 404, file or page not found" });
});

app.listen(port, async () => {
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`APP url:     ${process.env.APP_URL}`);
  console.log(`API url:     ${process.env.API_URL}`);
});

module.exports = app;
