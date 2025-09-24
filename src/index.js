const express = require("express")
require("dotenv").config()
const {connectDb} = require("./config/database")

const app = express()

app.use("/", (req, res) => {
    res.send("Welcome to LushVibe Backend Server")
})

const PORT = process.env.PORT
connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`)
        })
    })
    .catch(err => console.log("Error  connecting to DB", err))
