import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";
import { AppRoutes } from "../constants/routes";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  if (!auth.user) {
    return (
      <>
        <Navigate to={AppRoutes.LOGIN} state={{ path: location.pathname }} />
      </>
    );
  }
  return children;
};
