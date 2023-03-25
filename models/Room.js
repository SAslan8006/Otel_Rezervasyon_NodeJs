const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
    },
    price: {
        type: Number,
        require: true,
        trim: true,
    },
    desc: {
        type: String,
        require: true,
        trim: true,
    },
    maxPeople: {
        type: Number,
        require: true,
        trim: true,
    },
    roomNumbers: {
        number: Number,
        unavailableDates: {
            type: [Date]
        },
    },
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);