// models/movieModel.js  
const mongoose = require('mongoose');  

const movieSchema = new mongoose.Schema({  
    title: { type: String, required: true },  
    genre: { type: String, required: true },  
    year: { type: Number, required: true },  
    favorites: { type: Boolean, default: false },  
});  

const Movie = mongoose.model('Movie', movieSchema);  

module.exports = Movie;