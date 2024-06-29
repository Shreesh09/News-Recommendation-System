import os
from app import app
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from sqlalchemy import Sequence

load_dotenv()

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
db = SQLAlchemy(app)

# Define the User model
class Users(db.Model):
    username = db.Column(db.String(255), primary_key=True)
    password = db.Column(db.String(255), nullable=False)

# Define the News model
class News(db.Model):
    id = db.Column(db.Integer, Sequence('news_id_seq', start=0, increment=1, minvalue=0), primary_key=True)
    date = db.Column(db.String(255))
    title = db.Column(db.String(255))
    text = db.Column(db.Text)
    link = db.Column(db.String(255))
    cleaned_desc = db.Column(db.Text)

# def import_news_from_csv(file_path):
#     with app.app_context():
#         with open(file_path, 'r') as csv_file:
#             csv_reader = csv.DictReader(csv_file)
#             for row in csv_reader:
#                 news = News(
#                     date=row['date'],
#                     title=row['title'],
#                     text=row['text'],
#                     link=row['link'],
#                     cleaned_desc=row['cleaned_desc']
#                 )
#                 db.session.add(news)
#             db.session.commit()
# import_news_from_csv("data/processed_data.csv")


# Define the NewsRead model
class NewsRead(db.Model):
    username = db.Column(db.String(255), db.ForeignKey('users.username'), primary_key=True)
    id = db.Column(db.Integer, db.ForeignKey('news.id'), primary_key=True)

with app.app_context():
    db.create_all()

