const express = require("express")
const cors = require("cors")
const path = require("path")
const fileUpload = require("express-fileupload")
require('dotenv').config()
const posts = require("./routes/posts")
const auth = require("./routes/auth")
const users = require("./routes/users")
const categories = require("./routes/categories")
const morgan = require("morgan")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/uploads",express.static("uploads"))
app.use("/assets",express.static("public"))
app.use(fileUpload())

app.use(morgan('dev'))

app.use(cors({ origin: "*" }))
app.set("view engine", "ejs")

app.get("/hello",(req,res) => res.send("salom"))

app.use("/", posts)
app.use("/", auth)
app.use("/", users)
app.use("/", categories)
app.use("/", (req, res) => res.render("index"))

// _________LISTEN PORT___________
const port = process.env.PORT || 5000

app.listen(port, () => console.log("Listening port on " + port))