import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import pairwise_distances
import pandas as pd
from models import *

df2 = pd.read_csv("data/raw_data.csv")
data = pd.read_csv("data/processed_data.csv")

def recommendedNews(user, page):
    def TFIDF_based_model(row_index, num_similar_items):
        cate = data['Category'][row_index]
        name = data['Title'][row_index]
        cate_data = data[data['Category'] == cate]
        tfidf_headline_vectorizer = TfidfVectorizer(min_df = 0)
        row_index2 = cate_data[cate_data['Title'] == name].index[0]
        headline_features = tfidf_headline_vectorizer.fit_transform(cate_data['Title'].values)
        couple_dist = pairwise_distances(headline_features, headline_features[row_index2])
        indices = np.argsort(couple_dist.ravel())[0:num_similar_items]
        df = pd.DataFrame({'headline':df2[df2['Category']==cate]['Title'].values[indices],
                       'Category':cate_data['Category'].values[indices],
                       'Abstract':cate_data['Abstract'].values[indices],
                       'URL':df2[df2['Category']==cate]['URL'].values[indices]
                       })
        print("="*30,"News Article Name","="*30)
        print('News Headline : ',df2['Title'][indices[0]])
        print("\n","="*26,"Recommended News Using TFIDf: ","="*30)
        print(df)
        return df.iloc[1:,:]

    recommendations = []
    user_history = getUserNews(user)
    i = (page-1)*3;
    while i < len(user_history) and (i < page*3):
        title = user_history[i]
        ind=df2[df2['Title']==title].index[0]
        recs = TFIDF_based_model(ind, 4)
        recommendations.append(recs)
        i += 1


    if len(recommendations) < 9:
        recommendations.append(df2.sample(n=(9-len(recommendations))))

    return pd.concat(recommendations)

def createUser(username):
    with app.app_context():
        new_user = Users(username=username)
        db.session.add(new_user)
        db.session.commit()

def addNews(username, news_title):
    with


def getUserNews(user):
    return ["The Brands Queen Elizabeth, Prince Charles, and Prince Philip Swear By", "50 Worst Habits For Belly Fat"]