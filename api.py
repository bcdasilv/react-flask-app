from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
import random
import string
from model_mongodb import User


app = Flask(__name__)

CORS(app) 

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/users', methods=['GET', 'POST'])
def get_users():
    if request.method == 'GET':
        search_username = request.args.get('name')
        search_job = request.args.get('job')
        if search_username and search_job :
            users = User().find_by_name_job(search_username, search_job)
        elif search_username :
            users = User().find_by_name(search_username)
        else :
            users = User().find_all()
        return {"users_list": users}
    elif request.method == 'POST':
        userToAdd = request.get_json()
        newUser = User(userToAdd)
        newUser.save()
        resp = jsonify(newUser), 201
        return resp

@app.route('/users/<id>', methods=['GET', 'DELETE'])
def get_user(id):
    user = User({"_id":id})
    if request.method == 'GET':
        if user.reload() :
            return user
    elif request.method == 'DELETE':
        if (user.remove() == 1):
            resp = jsonify(),204
            return resp                
    return jsonify({"error": "User not found"}), 404  
    