import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </>
    );
  }

  //jika tidak terautentikasi, redirect ke login
  if (!isAuthenticated) {
    //redirect to login
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
