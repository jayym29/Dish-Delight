import React, { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { savedRecipes } = useContext(RecipeContext);
  const [userRecipes, setUserRecipes] = useState([]);
  const { user, loading } = useContext(AuthContext);

  // Fetch user recipes from the backend
  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await fetch("http://localhost:5000/user-recipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: user }), // Include the user object
        });

        const data = await response.json();
        if (response.ok) {
          setUserRecipes(data);
        } else {
          console.error(data.message || "Error fetching user recipes");
        }
      } catch (error) {
        console.error("Server error:", error);
      }
    };

    fetchUserRecipes();
  }, [user]);


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
          Your Favorite Recipes
        </h2>

        {savedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {savedRecipes.map((recipe, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-101 hover:shadow-xl flex flex-col h-full"
              >
                <Link to={`/recipe/${recipe.id}`} className="flex-grow">
                  <div className="p-5 text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {recipe.name}
                    </h3>
                    <p
                      className="text-gray-600 mb-4"
                      style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                    >
                      {truncateDescription(recipe.description, 100)}
                    </p>
                  </div>
                </Link>
                <div className="p-4 bg-gray-50 flex justify-between items-center mt-auto">
                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="text-primary hover:text-yellow-500 transition duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">
            No favorite recipes yet.
          </p>
        )}

        <h2 className="text-4xl font-bold text-center text-primary mb-8 mt-12">
          Your Created Recipes
        </h2>

        {userRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {userRecipes.map((recipe, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-101 hover:shadow-xl flex flex-col h-full"
              >
                <Link to={`/recipe/${recipe.id}`} className="flex-grow">
                  <div className="p-5 text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {recipe.name}
                    </h3>
                    <p
                      className="text-gray-600 mb-4"
                      style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                    >
                      {truncateDescription(recipe.description, 100)}
                    </p>
                  </div>
                </Link>
                <div className="p-4 bg-gray-50 flex justify-between items-center mt-auto">
                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="text-primary hover:text-yellow-500 transition duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">
            No created recipes yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
