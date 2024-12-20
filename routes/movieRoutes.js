// routes/movieRoutes.js  
const express = require('express');  
const {  
    getAllMovies,  
    createMovie,  
    updateMovie,  
    deleteMovie,  
} = require('../controllers/movieController');  

const router = express.Router();  

router.get('/movies', getAllMovies); // Read all movies  
router.post('/movies', createMovie); // Create a new movie  
router.patch('/movies/:id/favorite', updateMovie); // Update a movie or toggle favorite  
router.delete('/movies/:id', deleteMovie); // Delete a movie  

module.exports = router;