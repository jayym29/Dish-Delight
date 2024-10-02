import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
   
      <section className="relative bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-6 animate-fadeInUp">
              Welcome to Dish Delight
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 animate-fadeInUp delay-2">
              Discover, share, and explore a world of flavors. Whether you’re a
              chef or a food enthusiast, Dish Delight brings delicious recipes
              to your fingertips.
            </p>
            <Link
              to="/explore"
              className="bg-primary text-white py-3 px-8 rounded-lg shadow-lg hover:bg-secondary transition duration-300 ease-in-out transform hover:scale-105 animate-fadeInUp delay-4"
            >
              Explore Recipes
            </Link>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <img
              src="/recipe_hero.svg"
              alt="Cooking"
              className="w-full rounded-lg  animate-fadeInRight"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            Why Use Dish Delight?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Share Your Recipes
              </h3>
              <p className="text-gray-600">
                Easily share your favorite recipes with the community. Inspire
                others to cook and explore new flavors.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Explore New Dishes
              </h3>
              <p className="text-gray-600">
                Browse a diverse range of recipes from around the world, and
                discover your next favorite dish.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Save Your Favorites
              </h3>
              <p className="text-gray-600">
                Save and manage your favorite recipes in one place, and come
                back to them whenever you want.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8 animate-fadeInUp">
            Ready to Cook Something New?
          </h2>
          <p className="text-lg mb-8 animate-fadeInUp delay-2">
            Explore hundreds of unique and delicious recipes. Find the perfect
            dish for any occasion.
          </p>
          <Link
            to="/explore"
            className="bg-white text-primary py-3 px-8 rounded-lg shadow-lg hover:bg-secondary hover:text-white transition duration-300 ease-in-out transform hover:scale-105 animate-fadeInUp delay-4"
          >
            Start Exploring
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
