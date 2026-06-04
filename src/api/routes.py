"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from api.auth import hash_password, verify_password, create_token
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def handle_signup():
    body = request.get_json()

    if not body:
        raise APIException("Missing request body", status_code=400)

    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        raise APIException("Email and password are required", status_code=400)

    existing = User.query.filter_by(email=email).first()
    if existing:
        raise APIException("User already exists", status_code=409)

    user = User()
    user.email = email
    user.password = hash_password(password)
    user.is_active = True
    db.session.add(user)
    db.session.commit()

    token = create_token(user.id)

    return jsonify({"token": token, "user": user.serialize()}), 201


@api.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()

    if not body:
        raise APIException("Missing request body", status_code=400)

    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        raise APIException("Email and password are required", status_code=400)

    user = User.query.filter_by(email=email).first()
    if not user or not verify_password(password, user.password):
        raise APIException("Invalid email or password", status_code=401)

    token = create_token(user.id)

    return jsonify({"token": token, "user": user.serialize()}), 200
