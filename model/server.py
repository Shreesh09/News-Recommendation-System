# Flask
from flask import request, render_template, jsonify
from controllers import *
from app import app

@app.route('/', methods=['GET'])
def index():
    # Main page
    return render_template('index.html')

@app.route('/getNews', methods=['GET'])
def get_news():
    try:
        user = request.args.get('username')
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
        return createUser(username)
    except Exception as e:
        print(e)
        error_message = str(e)
        return jsonify({'error': error_message}), 500

@app.route('/addNews', methods=['POST'])
def add_news():
    try:
        username = request.json['username']
        news_title = request.json['news_title']
        return addNews(username, news_title)
    except Exception as e:
        print(e)
        error_message = str(e)
        return jsonify({'error': error_message}), 500

@app.route('/getUserHistory', methods=['GET'])
def get_user_history():
    try:
        username = request.args.get('username')
        user_history = getUserHistory(username)
        return user_history
    except Exception as e:
        print(e)
        error_message = str(e)
        return jsonify({'error': error_message}), 500

    

print('Check http://127.0.0.1:5000/')
if __name__ == '__main__':
    app.run(debug=True)
    # app.run(debug=True, host='0.0.0.0')