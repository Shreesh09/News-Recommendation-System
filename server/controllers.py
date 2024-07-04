from recommendation_model import content_based_filtering_model
import pandas as pd
from models import Users, News, NewsRead, app, db
import random

def recommendedNews(user, page):
    recommendations = []
    user_history = getUserHistory(user, -1)
    if len(user_history) == 0:
        random_numbers = [random.randint(0, 30000) for _ in range(9)]
        recommendations.append(getNewsArticle(random_numbers))
        return pd.concat(recommendations)
    indexes = user_history['id'].tolist()
    inputs = user_history['text'].tolist()
    recs = content_based_filtering_model(indexes, inputs, page)
    if(len(recs) == 0):
        return []
    recommendations.append(getNewsArticle(recs))
    return pd.concat(recommendations)    

def searchNewsArticle(title, page):
    articles = []
    searches = content_based_filtering_model([], [title], page)
    if(len(searches) == 0):
        return []
    articles.append(getNewsArticle(searches))
    return pd.concat(articles)    

def getNewsArticle(indexes):
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
        if(len(news) == 0):
            return []
        return pd.concat(news)


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
    with app.app_context():
        user = Users.query.filter_by(username=username).first()
        return user

def getUserHistoryById(username):
    with app.app_context():
        user_news = NewsRead.query.filter_by(username=username).all()
        news_IDs = [news.id for news in user_news]
        return news_IDs
    

def getUserHistory(username, page, paginate=False):
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
        if paginate:
            start = 9*(page-1)
            end = min(9*(page), len(news))
            news = news[start:end]
        if(len(news) == 0):
            return []
    return pd.concat(news)