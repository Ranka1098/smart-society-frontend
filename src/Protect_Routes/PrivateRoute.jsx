import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return children; // Token hai → allow
  } else {
    return <Navigate to="/" />; // Token nahi → login page
  }
};

export default PrivateRoute;
