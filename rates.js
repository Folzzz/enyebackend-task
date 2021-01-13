const mongoose = require ("mongoose")
const Schema =  mongoose.Schema

const rateSchema = new Schema({
    "results": {
        "base": String,
        "date": Date,
        "rates": {
            type: Number,
            type: Number,
            type: Number
        }
    }
})

module.exports = mongoose.model("Rate", rateSchema)