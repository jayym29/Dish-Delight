import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  // If user is not authenticated, redirect to the login page
  console.log(user, "user", loading, "loading");

  if (!user && !loading) {
    return <Navigate to="/login" />;
  }

 
  return children;
};

export default PrivateRoute;
