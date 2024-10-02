import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    // Fetch saved recipes when user changes or is available
    if (user) {
      fetchSavedRecipes();
    }
  }, [user]); // Dependency array includes user
  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:5000/recipes");
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const fetchSavedRecipes = async () => {
    const response1 = await fetch("http://localhost:5000/saved-recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user }), // Include the user object
    });
    const data1 = await response1.json();
    console.log(data1, "     data1");
    setSavedRecipes(data1);

    return data1;
  };
  const addRecipe = async (recipe) => {
    try {
      const response = await fetch("http://localhost:5000/addrecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...recipe, user }), // Include the user object
      });
      const newRecipe = await response.json();

      setRecipes([...recipes, newRecipe]);
      toast.success("Recipe added successfully");
    } catch (error) {
      console.error("Error adding recipe:", error);
      toast.error("Error adding recipe");
    }
  };

  const updateRecipe = async (id, updatedRecipe) => {
    console.log(updatedRecipe, "updatedRecipe");
    try {
      await fetch(`http://localhost:5000/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updatedRecipe, user }), // Include the user object
      });
      const ingredientsArray = updatedRecipe.ingredients.map((ingredient) => ({
        name: ingredient,
      }));
      updatedRecipe.ingredients = ingredientsArray;
      setRecipes(
        recipes.map((recipe) => (recipe.id === id ? updatedRecipe : recipe))
      );
      toast.success("Recipe updated successfully");
    } catch (error) {
      console.error("Error updating recipe:", error);
      toast.error("Error updating recipe");
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await fetch(`http://localhost:5000/recipes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }), // Include the user object
      });
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
      toast.success("Recipe deleted successfully");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      toast.error("Error deleting recipe");
    }
  };

  const saveRecipe = async (recipeId) => {
    try {
      const response = await fetch("http://localhost:5000/save-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipe_id: recipeId, user }), // Include the user object
      });

      const data = await response.json();

      if (response.ok) {
        // Check if the recipe was removed or added based on the message
        if (data.message === "Recipe removed from favorites.") {
          // Remove recipe from savedRecipes
          setSavedRecipes(savedRecipes.filter((r) => r.id !== recipeId));
          console.log("Recipe removed from favorites");
        } else if (data.message === "Recipe saved successfully") {
          // Add recipe to savedRecipes
          setSavedRecipes([
            ...savedRecipes,
            recipes.find((r) => r.id === recipeId),
          ]);
        }
        toast.success(data.message);
      } else {
        console.error(data.message || "Error saving recipe");
        toast.error(data.message || "Error saving recipe");
      }
    } catch (error) {
      console.error("Server error:", error);
    }
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        savedRecipes,
        fetchSavedRecipes,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        saveRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
