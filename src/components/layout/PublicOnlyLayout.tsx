import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/** Keeps authenticated users away from /login and /signup. */
export function PublicOnlyLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/chat" replace />;

  return <Outlet />;
}
