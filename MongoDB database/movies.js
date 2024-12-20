const mongoose = require("mongoose");  
const Movie = require("../models/movie");  
require("dotenv").config();  

// Connect to the database  
mongoose.connect(process.env.MONGO_URI, {  
    useNewUrlParser: true,  
    useUnifiedTopology: true,  
})  
.then(() => {  
    console.log("Database connected");  
    // Call the Movies function after successful connection  
    return Movies();  
})  
.catch((err) => console.error("Database connection error:", err));  

// Sample movie data  
const movieData = [  
    {  
        title: "Inception",  
        genres: ["Sci-Fi", "Thriller"],  
        release_date: new Date("2010-07-16"), // Using Date objects  
        overview: "A thief who steals corporate secrets...",  
        poster_url: "https://example.com/inception.jpg",  
    },  
    {  
        title: "The Matrix",  
        genres: ["Action", "Sci-Fi"],  
        release_date: new Date("1999-03-31"),  
        overview: "A computer hacker learns about...",  
        poster_url: "https://example.com/matrix.jpg",  
    },  
];  

// Insert movies into the database  
const Movies = async () => {  
    try {  
        await Movie.insertMany(movieData);  
        console.log("Movies added successfully");  
    } catch (error) {  
        console.error("Error adding movies:", error);  
    } finally {  
        mongoose.connection.close(); // Ensure the connection is closed  
    }  
};