from fastapi import FastAPI  
from pydantic import BaseModel  
from typing import List  

app = FastAPI()  

# Define a movie model  
class Movie(BaseModel):  
    id: int  
    title: str  
    year: int  
    genre: str  

# Sample movie data  
movies = [  
    Movie(id=1, title="The Shawshank Redemption", year=1994, genre="Drama"),  
    Movie(id=2, title="The Godfather", year=1972, genre="Crime, Drama"),  
    Movie(id=3, title="The Dark Knight", year=2008, genre="Action, Crime, Drama"),  
]  

# Endpoint to get all movies  
@app.get("/movies", response_model=List[Movie])  
async def get_movies():  
    return movies  

# Endpoint to get a movie by ID  
@app.get("/movies/{movie_id}", response_model=Movie)  
async def get_movie(movie_id: int):  
    for movie in movies:  
        if movie.id == movie_id:  
            return movie  
    return {"error": "Movie not found"}