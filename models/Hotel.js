const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  desc: {
    type: String,
    require: true,
    trim: true,
  },
  city: {
    type: String,
    require: true,
    trim: true,
  },
  distance: {
    type: String,
    require: true,
    trim: true,
  },
  photos: {
    type: [String],
  },
  type: {
    type: String,
    require: true,
    trim: true,
  },
  title: {
    type: String,
    require: true,
    trim: true,
  },
  rating: {
    type: Number,
    min:0,
    max:5
  },
  rooms: {
    type: [String],
  },
  featured:{
    type:Boolean,
    default:false
  },
  cheapestPrice: {
    type: Number,
    require: true,
    min:0,
  },

},{timestamps:true});

module.exports = mongoose.model("Hotel", hotelSchema);