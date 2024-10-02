import React, { useState, useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState(); // Add description field

  const { addRecipe } = useContext(RecipeContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !ingredients.trim()) {
      setError("Please provide both a recipe name and ingredients.");
      return;
    }
    const ingredientList = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());
    addRecipe({ name, description, ingredients: ingredientList });
    setName("");
    setDescription("");
    setIngredients("");
    setError("");
    navigate("/explore");
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">
        Add New Recipe
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Recipe name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows="4"
          />
        </div>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients separated by commas"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          rows="3"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition duration-200"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};
export default AddRecipe;
