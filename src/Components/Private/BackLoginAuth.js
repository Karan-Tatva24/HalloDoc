import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppRoutes } from "../../constants/routes";

export const BackLoginAuth = () => {
  const location = useLocation();
  const state = useSelector((state) => state.root.login);

  if (state.isLoggedIn) {
    return (
      <>
        <Navigate
          to={AppRoutes.DASHBOARD}
          state={{ path: location.pathname }}
        />
      </>
    );
  }
  return <Outlet />;
};
