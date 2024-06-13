import React from "react";
import { RouteProps, Navigate } from "react-router-dom";
import { useAuth } from "../auth/auth.tsx";

type ProtectedRouteProps = RouteProps & {
  element: JSX.Element;
  role?: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  role,
}) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/notfound" replace />;
  }

  return element;
};

export default ProtectedRoute;
