import React from "react";
import { Navigate } from "react-router-dom";

const RouteAuthProvider = ({ isProtected, children }) => {
  const token = localStorage.getItem("token");

  if (typeof isProtected === "boolean" && isProtected && !token) {
    return <Navigate to="/login" />;
  } else if (typeof isProtected === "boolean" && !isProtected && token) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default RouteAuthProvider;
