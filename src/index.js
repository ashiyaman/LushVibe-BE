const express = require("express")
require("dotenv").config()
const {connectDb} = require("./config/database")
const {Category} = require("./models/Category")
const fs = require("fs")
const { Products } = require("./models/Products")

const app = express()




// const categoryJSONData = JSON.parse(fs.readFileSync("./src/data/category.json", "utf-8"))
// const productJSONData = JSON.parse(fs.readFileSync("./src/data/product.json", "utf-8"))

const seedCategoryData = async() => {
    try{
        for(const categoryData of categoryJSONData){
            const category = new Category({
                name: categoryData.name,
                imageUrl: categoryData.imageUrl
            })

            await category.save()
        }
    }
    catch(err){
        console.log("Cannot seed data", err)
    }
}

const seedProductData = async() => {
    try{
       await Products.insertMany(productJSONData)
    }
    catch(err){
        console.log("Cannot seed data", err)
    }
}

app.get("/categories", async(req, res) => {
    try{
        const categories = await Category.find()
        if(!categories || categories.length < 1){
            return res.status(404).json({message: "No categories found" + err})
        }
        return res.status(200).json({
            message: "Categories fetched successfully",
            data: categories
        })
    }
    catch(err){
        return res.status(400).json({message: "Couldn't fetch categories" + err})
    }
})

app.get("/products", async(req, res) => {
    try{
        const products = await Products.find()
        if(!products || products.length < 1){
            return res.status(404).json({message: "No Products found" + err})
        }
        return res.status(200).json({
            message: "Products fetched successfully",
            data: products
        })
    }
    catch(err){
        return res.status(400).json({message: "Couldn't fetch products" + err})
    }
})









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
