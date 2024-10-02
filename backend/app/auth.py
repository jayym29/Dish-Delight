from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, current_user
from werkzeug.security import generate_password_hash
from .models import User, db

bp = Blueprint('auth', __name__)

@bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    # Check if username or email already exists
    if User.query.filter_by(username=data['name']).first():
        return jsonify({'error': 'Username already exists'}), 400
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 400
    
    # Create a new user
    new_user = User(
        username=data['name'],
        email=data['email']
    )
    
   
    new_user.set_password(data['password'])
    
    # Add user to the database
    db.session.add(new_user)
    db.session.commit()
    
    # Log the user in automatically after signup
    login_user(new_user)
    
    return jsonify({'message': 'User registered and logged in successfully', 'id': new_user.id}), 201

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['name']).first()
    if user and user.check_password(data['password']):
        login_user(user)

        print(current_user.id,"            l" )
        return jsonify({'message': 'User  logged in successfully', 'id': user.id}), 201
    
    return jsonify({'error': 'Invalid credentials'}), 401

@bp.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'})
