import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;

  // return isAuthenticated ? <Outlet /> : <Navigate to="/" replace/>;
  //what is replace ?
  //it will replace the current route with the new route
  // what is outlet
  //it will render the children of the current route
};

export default ProtectedRoute;
