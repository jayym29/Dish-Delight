import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";
import { AuthContext } from "../context/AuthContext";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, updateRecipe, deleteRecipe, saveRecipe } =
    useContext(RecipeContext);
  const { user, loading } = useContext(AuthContext);

  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(recipe?.name || "");
  const [description, setDescription] = useState(
    recipe ? recipe.description : ""
  );

  const [updatedIngredients, setUpdatedIngredients] = useState(
    recipe?.ingredients.join(", ") || ""
  );
  console.log(recipe, "  jjsj");
  const handleUpdate = (e) => {
    e.preventDefault();
    const ingredientList = updatedIngredients
      .split(",")
      .map((ingredient) => ingredient.trim())
      .filter((ingredient) => ingredient !== ""); // Remove any empty ingredients
    updateRecipe(recipe.id, {
      ...recipe,
      name: updatedName,
      description: description,
      ingredients: ingredientList,
    });

    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteRecipe(recipe.id);
    navigate("/explore");
  };

  const handleFavorite = () => {
    saveRecipe(recipe.id);
  };

  if (!recipe)
    return <p className="text-red-500 text-center mt-6">Recipe not found.</p>;

  return (
    <div className="p-6">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-4 mb-6">
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            required
            placeholder="Recipe Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              rows="4"
            />
          </div>
          <textarea
            value={updatedIngredients}
            onChange={(e) => setUpdatedIngredients(e.target.value)}
            required
            placeholder="Ingredients (comma separated)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2"
            rows="3"
          ></textarea>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition duration-200"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          {/* Center Container */}
          <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8 text-center">
            {/* Recipe Title */}
            <h1 className="text-4xl font-extrabold text-primary mb-6 animate-fadeIn">
              {recipe.name}
            </h1>

            {/* Recipe Description */}
            <p
              className="text-lg text-gray-700 mb-8 w-full md:w-[80%] mx-auto animate-fadeIn delay-2"
              style={{ whiteSpace: "normal", wordWrap: "break-word" }}
            >
              {recipe.description}
            </p>

            {/* Ingredients List */}
            <div className="bg-gray-100 p-6 rounded-md shadow-inner mb-8">
              <h3 className="text-xl font-bold text-primary mb-4">
                Ingredients
              </h3>
              <ul className="list-disc list-inside text-left mx-auto w-[80%]">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-600">
                    {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            {recipe.user_id === user.id && !loading && (
              <div className="flex justify-center space-x-4 mt-6 animate-fadeIn delay-4">
                <button
                  onClick={() => {
                    setIsEditing(!isEditing);
                    setUpdatedIngredients(
                      recipe.ingredients
                        .map((ingredient) => ingredient.name)
                        .join(", ")
                    );
                    setUpdatedName(recipe.name);
                  }}
                  className="bg-primary text-white py-3 px-6 rounded-md hover:bg-secondary transition duration-300 transform hover:scale-105"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white py-3 px-6 rounded-md hover:bg-red-600 transition duration-300 transform hover:scale-105"
                >
                  Delete
                </button>
                <button
                  onClick={handleFavorite}
                  className="bg-accent text-black py-3 px-6 rounded-md hover:bg-gray-300 transition duration-300 transform hover:scale-105"
                >
                  Favorite
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
