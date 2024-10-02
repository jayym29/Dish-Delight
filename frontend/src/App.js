import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import RecipeDetails from "./components/RecipeDetails";
import AddRecipe from "./components/AddRecipe";
import Profile from "./components/Profile";
import ExploreRecipes from "./components/ExploreRecipes";
import { RecipeProvider } from "./context/RecipeContext";
import Login from "./components/login";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar"; // Import the Navbar

function App() {
  return (
    <AuthProvider>
      <RecipeProvider>
        <Router>
          <div className="App">
            <Navbar /> {/* Add Navbar here */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/recipe/:id"
                element={
                  <PrivateRoute>
                    {" "}
                    <RecipeDetails />{" "}
                  </PrivateRoute>
                }
              />
              <Route
                path="/add-recipe"
                element={
                  <PrivateRoute>
                    <AddRecipe />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    {" "}
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/explore"
                element={
                  <PrivateRoute>
                    <ExploreRecipes />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </RecipeProvider>
    </AuthProvider>
  );
}

export default App;
