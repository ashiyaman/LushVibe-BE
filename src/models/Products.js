const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    rating: {
        type: Number,
        min: [1, 'Must be at least 1. Got {VALUE}'],
        max: [5, 'Must be only up to 5. Got {VALUE}'],
        required: true
    },
    reviews: [String],
    discount: {
        type: Number,
        min: [5, 'Must be at least 5. Got {VALUE}'],
        max: [90, 'Must be only up to 90. Got {VALUE}'],
    },
    shades: [String],
    price: {
        type: Number,
        required: true
    },
    discountedPrice: Number,
    highlights: [String],
    benefits: [String],
    description: [String],
    directionsOfUse: String,
    keyIngredient: String,
    allIngredients: String,
    additionalInfo: [String],
    tags: [String],
    imagesUrl: {
        type: [String],
        default: ["https://static.vecteezy.com/system/resources/thumbnails/024/983/914/small_2x/simple-user-default-icon-free-png.png"],
        required: true
    }
}, {timestamps: true})

productSchema.pre("save", function(){
    const product = this

    if(product.discount > 0){
        product.discountedPrice = product.price - (product.price * 0.01 * product.discount)
        if(product.discountedPrice > product.price){
            throw new Error("Discounted Price cannot be more than Original Price")
        }
    }
    
})

const Products = mongoose.model("Products", productSchema)
module.exports = {Products}