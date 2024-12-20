from sqlalchemy import Column, Integer, String, Text, ForeignKey  
from sqlalchemy.orm import relationship, declarative_base  

Base = declarative_base()  

# Movie Table  
class Movie(Base):  
    __tablename__ = "movies"  # Corrected from _tablename_ to __tablename__  

    id = Column(Integer, primary_key=True, autoincrement=True)  
    title = Column(String(100), nullable=False)  
    genres = Column(String(100))  
    release_date = Column(String(20))  
    overview = Column(Text)  
    poster_url = Column(String(200))  

    def __repr__(self):  # Corrected from _repr_ to __repr__  
        return f"<Movie(title={self.title}, release_date={self.release_date})>"  

# User Table  
class User(Base):  
    __tablename__ = "users"  # Corrected from _tablename_ to __tablename__  

    id = Column(Integer, primary_key=True, autoincrement=True)  
    name = Column(String(50), nullable=False)  
    email = Column(String(100), unique=True, nullable=False)  
    password = Column(String(100), nullable=False)  

    def __repr__(self):  # Corrected from _repr_ to __repr__  
        return f"<User(name={self.name}, email={self.email})>"  

# Favorite Movies Table (many-to-many relationship)  
class Favorite(Base):  
    __tablename__ = "favorites"  # Corrected from _tablename_ to __tablename__  

    id = Column(Integer, primary_key=True, autoincrement=True)  
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)  
    movie_id = Column(Integer, ForeignKey("movies.id"), nullable=False)  

    user = relationship("User", back_populates="favorites")  
    movie = relationship("Movie", back_populates="favorited_by")  

# Establish relationships  
User.favorites = relationship("Favorite", back_populates="user")  
Movie.favorited_by = relationship("Favorite", back_populates="movie")