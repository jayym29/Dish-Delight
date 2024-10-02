from flask import Flask,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from app.config import Config
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()
login = LoginManager()

@login.unauthorized_handler
def unauthorized():
    # Return a JSON response and a 401 status code
    return jsonify({'error': 'Unauthorized access'}), 401

@login.user_loader
def load_user(user_id):
    from .models import User
    return User.query.get(int(user_id))  # Fetch user by ID from the database

def create_app():
    app = Flask(__name__)
    cors = CORS(app, supports_credentials=True, origins=["http://localhost:3000"])
    app.config['CORS_HEADERS'] = 'Content-Type'
    


    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    login.init_app(app)
    login.login_view = 'auth.login'  
    

    from . import routes, models, auth
    app.register_blueprint(routes.bp)
    app.register_blueprint(auth.bp)

    return app
