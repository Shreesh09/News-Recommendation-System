from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pickle

with open('data/tfidf_vectorizer.pkl', 'rb') as file:
    tf = pickle.load(file)
with open('data/tfidf_matrix.pkl', 'rb') as file:
    tfidf_matrix = pickle.load(file)


def content_based_filtering_model(indexes, inputs, page):
    #get similarity values with other articles
    vector = tf.transform(inputs)
    vector = np.asarray(np.mean(vector, axis=0))
    cosine_similarities = cosine_similarity(tfidf_matrix, vector)
    similarity_score = list(enumerate(cosine_similarities))
    similarity_score = [score for score in similarity_score if score[0] not in indexes]
    similarity_score = sorted(similarity_score, key=lambda x: x[1], reverse=True)
    # Get the scores of the n most similar news articles. Ignore the first movie.
    start = 9*page;
    end = min(9*(page+1), len(similarity_score))
    similarity_score = similarity_score[start:end+1]
    news_indices = [i[0] for i in similarity_score]
  
    return news_indices

# print(content_based_filtering_model([3194],["The US has the highest number of cases"],1))