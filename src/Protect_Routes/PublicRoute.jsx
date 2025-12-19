import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return children; // Token nahi → login allow
  } else {
    return <Navigate to="/home" />; // Token hai → home per redirect
  }
};

export default PublicRoute;
