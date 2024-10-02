import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-3xl font-semibold">
          Dish Delight
        </Link>

        {/* Navbar Links for Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-primary font-semibold" : "text-gray-300"
            }
          >
            Home
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/explore"
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : "text-gray-300"
                }
              >
                Explore Recipes
              </NavLink>
              <NavLink
                to="/add-recipe"
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : "text-gray-300"
                }
              >
                Add Recipe
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : "text-gray-300"
                }
              >
                Profile
              </NavLink>
              <button
                onClick={logout}
                className=" text-white px-4 py-2 ml-4 rounded hover:bg-yellow-600 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : "text-gray-300"
                }
              >
                Signup
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : "text-gray-300"
                }
              >
                Login
              </NavLink>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {/* Hamburger Icon */}
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

    
      {isOpen && (
        <div className="md:hidden bg-gray-700 text-white space-y-4 p-4 mt-2">
          <NavLink
            to="/"
            onClick={toggleMenu} 
            className={({ isActive }) =>
              isActive ? "text-primary font-semibold" : "text-gray-300"
            }
          >
            Home
          </NavLink>

          {user ? (
            <div className="flex flex-col gap-4">
              <NavLink
                to="/explore"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : "text-gray-300"
                }
              >
                Explore Recipes
              </NavLink>
              <NavLink
                to="/add-recipe"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : "text-gray-300"
                }
              >
                Add Recipe
              </NavLink>
              <NavLink
                to="/profile"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : "text-gray-300"
                }
              >
                Profile
              </NavLink>
              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className=" text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200 w-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink
                to="/signup"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : "text-gray-300"
                }
              >
                Signup
              </NavLink>
              <NavLink
                to="/login"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : "text-gray-300"
                }
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
