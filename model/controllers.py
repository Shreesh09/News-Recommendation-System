from recommendation_model import TFIDF_based_model, df2
import pandas as pd
from models import Users, News, app, db

def recommendedNews(user, page):
    try:
        recommendations = []
        user_history = getUserHistory(user)
        i = (page-1)*3;
        while i < len(user_history) and (i < page*3):
            title = user_history[i]
            ind=df2[df2['Title']==title].index[0]
            print(ind)
            recs = TFIDF_based_model(ind, 4)
            recommendations.append(recs)
            i += 1

        if len(recommendations) < 9:
            recommendations.append(df2.sample(n=(9-len(recommendations))))

        return pd.concat(recommendations)
    
    except Exception as e:
        print(e)
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

def addNews(username, news_title):
    with app.app_context():
        try:
            new_news = News(username=username, title=news_title)
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

def getUserHistory(username):
    try:
        with app.app_context():
            user_news = News.query.filter_by(username=username).all()
            news_titles = [news.title for news in user_news]
            return news_titles
    except Exception as e:
        raise e