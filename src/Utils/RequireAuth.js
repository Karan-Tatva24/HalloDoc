import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./auth";
import { AppRoutes } from "../constants/routes";

export const RequireAuth = () => {
  const location = useLocation();
  const auth = useAuth();
  {
    console.log(auth.user);
  }
  if (!auth.user) {
    return (
      <>
        {console.log("pathname", location)}
        <Navigate to={AppRoutes.LOGIN} state={{ path: location.pathname }} />
      </>
    );
  }
  return <Outlet />;
};
