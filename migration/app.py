from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///movies.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the Movies model
class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(50))
    release_year = db.Column(db.Integer)

# Create the database and table
with app.app_context():
    db.create_all()

# Route to add a new movie
@app.route('/movies', methods=['POST'])
def add_movie():
    data = request.json
    new_movie = Movie(
        title=data['title'],
        genre=data.get('genre'),
        release_year=data.get('release_year')
    )
    db.session.add(new_movie)
    db.session.commit()
    return jsonify({"message": "Movie added successfully!", "movie": {
        "id": new_movie.id,
        "title": new_movie.title,
        "genre": new_movie.genre,
        "release_year": new_movie.release_year
    }}), 201

if __name__ == '__main__':
    app.run(debug=True)

print("Flask app is starting.....")    