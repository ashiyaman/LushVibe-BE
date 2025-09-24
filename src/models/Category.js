const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        enum: {
            values: ["Eyes", "Lips", "Face", "Hair", "Fragrance", "Skincare", "Nail"],
            message: '{VALUE} is not accepted category name.'
        },
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Category = mongoose.model("Category", categorySchema)
module.exports = {Category}