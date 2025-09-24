const mongoose = require("mongoose")
require("dotenv").config()

const MONGOURI = process.env.MONGODB

const connectDb = async() => {
    await mongoose.connect(MONGOURI)
}

connectDb()
.then(() => console.log("Connected to database successfully"))
.catch(err => console.log("Error connecting to database..", err))

module.exports = {connectDb}