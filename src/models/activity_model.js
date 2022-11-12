const mongoose = require("mongoose")

const activity_model = new mongoose.Schema({

    description: {
        type: String,
        required: true
    },
    score: {
        type: Number
    },
    percentage: {
        type: Number,
        required: true
    },
    dateDelivery: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("activity", activity_model)