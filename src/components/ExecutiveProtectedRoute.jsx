import { Navigate } from "react-router-dom";

const ExecutiveProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("executiveToken");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ExecutiveProtectedRoute;