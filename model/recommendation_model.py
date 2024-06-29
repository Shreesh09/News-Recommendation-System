import numpy as np

cosine_similarities = np.load('data/cosine_similarities.npy')

def content_based_filtering_model(idx, num_similar_items):
    #get similarity values with other articles
    similarity_score = list(enumerate(cosine_similarities[idx]))
    similarity_score = sorted(similarity_score, key=lambda x: x[1], reverse=True)
    # Get the scores of the n most similar news articles. Ignore the first movie.
    similarity_score = similarity_score[1:num_similar_items+1]

    news_indices = [i[0] for i in similarity_score]
  
    return news_indices
