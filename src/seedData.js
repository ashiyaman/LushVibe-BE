const Category = require("./models/Category")
const fs = require("fs")

const categoryJSONData = JSON.parse(fs.readFileSync("./data/category.json", "utf-8"))
console.log(categoryJSONData)

const seedCategorydata = async() => {
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

seedCategorydata()