import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Loader } from "./Loader";

export function ProtectedRoute() {
  const { token, loading } = useAuth();
  const loc = useLocation();
  if (loading) return <Loader />;
  return token ? <Outlet /> : <Navigate to="/login" state={{ from: loc.pathname }} replace />;
}
