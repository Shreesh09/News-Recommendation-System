import os
from app import app
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
# Initialize the database
db = SQLAlchemy(app)

# Define the User model
class Users(db.Model):
    username = db.Column(db.String(255), primary_key=True)

# Define the News model
class News(db.Model):
    username = db.Column(db.String(255), db.ForeignKey('users.username'), primary_key=True)
    title = db.Column(db.String(255), primary_key=True)

with app.app_context():
    db.create_all()
