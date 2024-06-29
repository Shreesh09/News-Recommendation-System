from recommendation_model import content_based_filtering_model
import pandas as pd
from models import Users, News, NewsRead, app, db
import random

def recommendedNews(user, page):
    try:
        recommendations = []
        user_history = getUserHistoryById(user)
        i = (page-1)*3;
        while i < len(user_history) and (i < page*3):
            recs = content_based_filtering_model(user_history[i], 3)
            recommendations.append(getNewsArticle(recs))
            i += 1
        if len(recommendations) < 3:
            random_numbers = [random.randint(0, 1000) for _ in range(3*(3 - len(recommendations)))]
            recommendations.append(getNewsArticle(random_numbers))

        return pd.concat(recommendations)
    
    except Exception as e:
        print(e)
        raise e
    

def getNewsArticle(indexes):
    try:
        with app.app_context():
            news = []  # Define the 'news' variable as an empty list
            for index in indexes:
                news_item = News.query.filter_by(id=index).first()
                news.append(pd.DataFrame({
                'id': [news_item.id],
                'date': [news_item.date],
                'title': [news_item.title],
                'text': [news_item.text],
                'link': [news_item.link],
                }))
            return pd.concat(news)
    except Exception as e:
        raise e


def createUser(username, password):
    with app.app_context():
        try:
            new_user = Users(username=username, password=password)
            db.session.add(new_user)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise e

def addNewsRead(username, news_id):
    with app.app_context():
        try:
            new_news = NewsRead(username=username, id=news_id)
            db.session.add(new_news)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise e


def getUserCredentials(username):
    try:
        with app.app_context():
            user = Users.query.filter_by(username=username).first()
            return user
    except Exception as e:
        raise e

def getUserHistoryById(username):
    try:
        with app.app_context():
            user_news = NewsRead.query.filter_by(username=username).all()
            news_IDs = [news.id for news in user_news]
            return news_IDs
    except Exception as e:
        raise e
    

def getUserHistory(username):
    try:
        with app.app_context():
            news = []
            user_news = News.query.join(NewsRead).filter(NewsRead.username == username).all()
            for news_item in user_news:
                news.append(pd.DataFrame({
                'id': [news_item.id],
                'date': [news_item.date],
                'title': [news_item.title],
                'text': [news_item.text],
                'link': [news_item.link],
                }))
        return pd.concat(news)
    except Exception as e:
        raise e