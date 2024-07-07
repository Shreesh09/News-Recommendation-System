
---

## Application Access

> The app is accessible at: [News Recommendation System](https://shreesh09.github.io/News-Recommendation-System/)

## RESTful API

The API is available at `https://news-recommendation.azurewebsites.net` and includes the following endpoints:

- **`POST /createUser`**: Accepts a POST request containing a username and password. The server hashes the password using the SHA256 algorithm and stores it in the PostgreSQL database along with the username.
- **`POST /login`**: Accepts a POST request containing a username and password. The server validates the credentials against the stored data. If valid, the server issues a JWT authentication token, which must be included in all subsequent requests.
- **`GET /getNewsRecommendation`**: Accepts a GET request if a valid JWT token is provided. This endpoint requires pagination parameters such as page number. The server fetches previously read articles by the user, processes them through the model, and returns recommended articles.
- **`GET /searchArticle`**: Searches for articles in the database and returns the closest matches.
- **`GET /userHistory`**: Retrieves all articles read by the user.

## Self-Hosting

### Server Setup

1. Create a `.env` file with the same structure as `.env.example`.
2. Update the CORS policy in `server/app.py` to allow your origin (use the `flask_cors` library).
3. Navigate to the server folder and run the server using:
   ```bash
   python server.py
   ```

### Frontend Setup

1. Update `client/config/keys.jsx` by replacing the `SERVER_URL` with the URL of your locally running server.
2. Navigate to the client folder and run the client using:
   ```bash
   npm run dev
   ```


## Training the Model
> Use the Notebook [train_model.ipynb](https://github.com/Shreesh09/News-Recommendation-System/blob/main/model/train_model.ipynb)
---