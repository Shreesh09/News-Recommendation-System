# Flask
from flask import request, render_template
from controllers import *
from app import app

@app.route('/', methods=['GET'])
def index():
    # Main page
    return render_template('index.html')

@app.route('/getNews', methods=['GET'])
def news():
    user = request.args.get('username')
    page = int(request.args.get('page'))
    recommendations = recommendedNews(user, page)
    json_data = recommendations.to_json(orient='records')
    return json_data

@app.route('/createUser', methods=['POST'])
def user():
    username = request.json['username']
    createUser(username)
    return {'message': 'User created'}
    

print('Check http://127.0.0.1:5000/')
if __name__ == '__main__':
    app.run(debug=True)
    # app.run(debug=True, host='0.0.0.0')