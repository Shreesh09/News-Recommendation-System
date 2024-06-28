from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import pairwise_distances
import pandas as pd
import numpy as np

df2 = pd.read_csv("data/raw_data.csv")
data = pd.read_csv("data/processed_data.csv")

def TFIDF_based_model(row_index, num_similar_items):
    cate = data['Category'][row_index]
    name = data['Title'][row_index]
    cate_data = data[data['Category'] == cate]

    tfidf_headline_vectorizer = TfidfVectorizer(min_df = 0.0)
    row_index2 = cate_data[cate_data['Title'] == name].index[0]
    headline_features = tfidf_headline_vectorizer.fit_transform(cate_data['Title'].values)
    
    couple_dist = pairwise_distances(headline_features, headline_features[row_index2])
    indices = np.argsort(couple_dist.ravel())[0:num_similar_items]
    df = pd.DataFrame({'Title':df2[df2['Category']==cate]['Title'].values[indices],
                    'Category':cate_data['Category'].values[indices],
                    'Abstract':cate_data['Abstract'].values[indices],
                    'URL':df2[df2['Category']==cate]['URL'].values[indices]
                    })
    print("="*30,"News Article Name","="*30)
    print('News Headline : ',df2['Title'][indices[0]])
    print("\n","="*26,"Recommended News Using TFIDf: ","="*30)
    print(df)
    return df.iloc[1:,:]