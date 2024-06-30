# Flask
import os, datetime
from flask import request, jsonify
from controllers import createUser, getUserCredentials, recommendedNews, addNewsRead, getUserHistory
from app import app
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from hashlib import sha256
from dotenv import load_dotenv

load_dotenv()
app.config['JWT_SECRET_KEY'] = os.getenv('SECRET_KEY') # Replace with your own secret key
jwt = JWTManager(app)

def hash_password(password, salt=os.getenv('SALT')):
    password = password.encode('utf-8')
    salt = salt.encode('utf-8')
    hashed_password = sha256(password + salt).hexdigest()
    return hashed_password

@app.route('/login', methods=['POST'])
def login():
    try:
        username = request.json['username']
        password = request.json['password']
        hashed_password = hash_password(password)

        credentials = getUserCredentials(username);
        if(credentials.password == hashed_password):
            access_token = create_access_token(identity=username, expires_delta=datetime.timedelta(days=1))
        else:
            raise Exception("wrong username or password")
        
        return jsonify({'access_token': access_token}), 200
    except Exception as e:
        print(e)
        error_message = str(e)
        return jsonify({'error': error_message}), 500


@app.route('/getNewsRecommendation', methods=['GET'])
@jwt_required()
def get_news_recommendation():
    try:
        user = get_jwt_identity()
        page = int(request.args.get('page'))
        recommendations = recommendedNews(user, page)
        json_data = recommendations.to_json(orient='records')
        return json_data
    except Exception as e:
        print(e)
        error_message = str(e)
        return jsonify({'error': error_message}), 500


@app.route('/createUser', methods=['POST'])
def create_user():
    try:
        username = request.json['username']
        password = request.json['password']
        hashed_password = hash_password(password)

        createUser(username, hashed_password)
        return jsonify({'message': 'user added successfully'})
    except Exception as e:
        print(e)
        error_message = str(e)
        return jsonify({'error': error_message}), 500


@app.route('/addNewsRead', methods=['POST'])
@jwt_required()
def add_news_read():
    try:
        username = get_jwt_identity()
        news_id = int(request.json['news_id'])
        addNewsRead(username, news_id)
        return jsonify({'message': 'news added successfully'})
    except Exception as e:
        print(e)
        error_message = str(e)
        return jsonify({'error': error_message}), 500


@app.route('/getUserHistory', methods=['GET'])
@jwt_required()
def get_user_history():
    try:
        username = get_jwt_identity()
        user_history = getUserHistory(username)
        return user_history.to_json(orient='records')
    except Exception as e:
        print(e)
        error_message = str(e)
        return jsonify({'error': error_message}), 500

    

# print('Check http://127.0.0.1:5000/')
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='8000')
