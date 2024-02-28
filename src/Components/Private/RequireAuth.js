import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppRoutes } from "../../constants/routes";
import { useSelector } from "react-redux";

export const RequireAuth = () => {
  const location = useLocation();
  const state = useSelector((state) => state.login);
  if (!state.isLoggedIn) {
    return (
      <>
        <Navigate to={AppRoutes.LOGIN} state={{ path: location.pathname }} />
      </>
    );
  }
  return <Outlet />;
};
