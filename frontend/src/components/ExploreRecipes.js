import React, { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { Link } from "react-router-dom";

const ExploreRecipes = () => {
  const { recipes, saveRecipe, savedRecipes } = useContext(RecipeContext);

  const handleFavorite = (recipeId) => {
    saveRecipe(recipeId);
  };

  const searchRecipe = (id) => {
    const isFavorite = savedRecipes.some((element) => element.id === id);

    // If recipe is found in savedRecipes, return 'Remove from Favorites'
    return isFavorite ? true : false;
  };

 
  const truncateDescription = (description, maxLength) => {
    if (description?.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-primary mb-8">
          Explore Recipes
        </h2>

        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-101 hover:shadow-xl flex flex-col h-full"
              >
                {/* Recipe Link */}
                <Link to={`/recipe/${recipe.id}`} className="flex-grow">
                  <div className="p-5 text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {recipe.name}
                    </h3>
                    {/* Truncate long descriptions */}
                    <p
                      className="text-gray-600 "
                      style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                    >
                      {truncateDescription(recipe.description, 100)}
                    </p>
                  </div>
                </Link>

                {/* Card Footer */}
                <div className="p-4 bg-gray-50 flex justify-between items-center mt-auto">
                  {searchRecipe(recipe.id) ? (
                    <button
                      onClick={() => handleFavorite(recipe.id)}
                      className="bg-accent text-gray-900 text-sm py-2 px-3 rounded-md hover:brightness-75 transition duration-200"
                    >
                      Remove from Favorites
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFavorite(recipe.id)}
                      className="bg-accent text-gray-900  py-2 px-3 rounded-md hover:brightness-75 transition duration-200"
                    >
                      Add to Favorites
                    </button>
                  )}
                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="text-primary hover:text-secondary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">
            No recipes found. Try adding some!
          </p>
        )}
      </div>
    </div>
  );
};

export default ExploreRecipes;
