from flask import Blueprint, request, jsonify
from .models import Recipe, Ingredient, db, User
from flask_cors import cross_origin

bp = Blueprint('routes', __name__)

def get_user_from_request():
    data = request.get_json()
    user_data = data.get('user')
    print(user_data)
    print(user_data['name'])
    if user_data:
        return User.query.filter_by(username=user_data['name']).first()
    
    return None

@bp.route('/recipes', methods=['GET'])
def get_recipes():
    try:
        recipes = Recipe.query.all()
        recipe_list = [
            {
                'id': recipe.id,
                'name': recipe.name,
                'user_id': recipe.user_id,
                'description':recipe.description, 
                'ingredients': [
                    {'id': ingredient.id, 'name': ingredient.name}
                    for ingredient in recipe.ingredients
                ]
            }
            for recipe in recipes
        ]
        return jsonify(recipe_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/saved-recipes', methods=['POST'])
def get_favorite_recipes():
    user = get_user_from_request()
    if user:
        favorite_recipes = user.favorite_recipes
        recipe_list = [
            {
                'id': recipe.id,
                'name': recipe.name,
                'user_id': recipe.user_id,
                'description': recipe.description,
                'ingredients': [
                    {'id': ingredient.id, 'name': ingredient.name}
                    for ingredient in recipe.ingredients
                ]
            }
            for recipe in favorite_recipes
        ]
        return jsonify( recipe_list), 200
    else:
        return jsonify({'error': 'User not found'}), 404

@bp.route('/addrecipe', methods=['POST'])
def create_recipe():
    if request.method == 'OPTIONS':
        return '', 200

    data = request.get_json()
    user = get_user_from_request()
    
    if user:
        try:
            # Create the new recipe
            new_recipe = Recipe(name=data['name'], user_id=user.id,description=data.get('description') )
            db.session.add(new_recipe)
            db.session.flush()  

            # Create the ingredients and link them to the new recipe
            ingredient_list = data['ingredients']
            for ingredient_name in ingredient_list:
                new_ingredient = Ingredient(name=ingredient_name, recipe_id=new_recipe.id)
                db.session.add(new_ingredient)

            db.session.commit() 
            
            return jsonify({'name': new_recipe.name,'id':new_recipe.id, 'user_id': new_recipe.user_id,
                'description': new_recipe.description,
                'ingredients': [
                    {'id': ingredient.id, 'name': ingredient.name}
                    for ingredient in new_recipe.ingredients
                ]}), 201
        
        except Exception as e:
            db.session.rollback()  
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'User not found'}), 404

@bp.route('/recipes/<int:id>', methods=['PUT'])
def update_recipe(id):
    user = get_user_from_request()
    recipe = Recipe.query.get_or_404(id)
    if recipe.author != user:
        return jsonify({'error': 'You can only edit your own recipes'}), 403
    data = request.get_json()

    recipe.name = data['name']
    recipe.description = data.get('description')  

    current_ingredients = recipe.ingredients

    for ingredient in current_ingredients:
        db.session.delete(ingredient)

    for ingredient_name in data.get('ingredients', []):
        ingredient = Ingredient(name=ingredient_name,recipe_id=recipe.id)  # Create a new Ingredient instance
        recipe.ingredients.append(ingredient)  # Append the ingredient

    db.session.commit()
    updated_ingredients = [ing.name for ing in recipe.ingredients]  # Get updated ingredient names

    return jsonify({'recipe': recipe.name, 'ingredients': updated_ingredients}), 200

@bp.route('/recipes/<int:id>', methods=['DELETE'])
def delete_recipe(id):
    user = get_user_from_request()
    
    # Get the recipe by ID or return a 404 if not found
    recipe = Recipe.query.get_or_404(id)
    
    # Check if the user is the author of the recipe
    if recipe.author != user:
        return jsonify({'error': 'You can only delete your own recipes'}), 403
    
    # Delete all ingredients associated with the recipe
    Ingredient.query.filter_by(recipe_id=recipe.id).delete()
    
    # Remove the recipe from any user's saved/favorite list
    if recipe in user.favorite_recipes:
        user.favorite_recipes.remove(recipe)
    
    # Delete the recipe
    db.session.delete(recipe)
    db.session.commit()
    
    return jsonify({'message': 'Recipe deleted successfully'})

@bp.route('/save-recipe', methods=['POST'])
def save_recipe():
    data = request.get_json()
    recipe_id = data.get('recipe_id')
    user = get_user_from_request()

    if not recipe_id:
        return jsonify({'message': 'Recipe ID is required'}), 400

    recipe = Recipe.query.get(recipe_id)

    if not recipe:
        return jsonify({'message': 'Recipe not found'}), 404
    if(user.favorite_recipes):
        if recipe in user.favorite_recipes:
            user.favorite_recipes.remove(recipe)
            db.session.commit()
            return jsonify({'message': 'Recipe removed from favorites.'}), 200
    user.favorite_recipes.append(recipe)  # Many-to-many relationship
    db.session.commit()

    return jsonify({'message': 'Recipe saved successfully'}), 200


@bp.route('/user-recipes', methods=['GET','POST'])
def get_user_recipes():
    user = get_user_from_request() 
    if not user:
        return jsonify({'message': 'User not found'}), 404

   
    recipes = user.recipes  
    for recipe in recipes:
        print(recipe.name)
    recipe_list = [
            {
                'id': recipe.id,
                'name': recipe.name,
                'user_id': recipe.user_id,
                'description': recipe.description,
                'ingredients': [
                    {'id': ingredient.id, 'name': ingredient.name}
                    for ingredient in recipe.ingredients
                ]
            }
            for recipe in recipes
        ]
    return jsonify(recipe_list), 200
