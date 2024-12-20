const axios = require('axios');  // Import Axios  
const Movie = require('../models/movieModel');  

// Get all movies  
const getAllMovies = async (req, res) => {  
    try {  
        const movies = await Movie.find();  
        res.status(200).json(movies);  
    } catch (error) {  
        res.status(500).json({ message: error.message });  
    }  
};  

// Create a new movie  
const createMovie = async (req, res) => {  
    const movie = new Movie(req.body);  
    try {  
        const savedMovie = await movie.save();  
        
        // Optional: Example of making an Axios request to an external API  
        await axios.post('https://externalapi.com/movies', savedMovie); // Example of what you could do  
         
        res.status(201).json(savedMovie);  
    } catch (error) {  
        res.status(400).json({ message: error.message });  
    }  
};  

// Update a movie (toggle favorite or other properties)  
const updateMovie = async (req, res) => {  
    const { id } = req.params;  
    try {  
        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });  
        if (!updatedMovie) {  
            return res.status(404).json({ message: 'Movie not found' });  
        }  
        
        // Example: Notify another service of the update  
        await axios.put(`https://externalapi.com/movies/${id}`, updatedMovie); // Example AXIOS usage  

        res.status(200).json(updatedMovie);  
    } catch (error) {  
        res.status(400).json({ message: error.message });  
    }  
};  

// Delete a movie  
const deleteMovie = async (req, res) => {  
    const { id } = req.params;  
    try {  
        const deletedMovie = await Movie.findByIdAndDelete(id);  
        if (!deletedMovie) {  
            return res.status(404).json({ message: 'Movie not found' });  
        }  
        
        // Optional: Notify an external service of the deletion  
        await axios.delete(`https://externalapi.com/movies/${id}`); // Example AXIOS usage  

        res.status(204).send();  
    } catch (error) {  
        res.status(500).json({ message: error.message });  
    }  
};  

module.exports = {  
    getAllMovies,  
    createMovie,  
    updateMovie,  
    deleteMovie,  
};