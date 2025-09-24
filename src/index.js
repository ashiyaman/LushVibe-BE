const express = require("express")
require("dotenv").config()

const app = express()

app.use("/", (req, res) => {
    res.send("Welcome to LushVibe Backend Server")
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})