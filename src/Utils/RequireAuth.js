import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";
import { ToastContainer, toast } from "react-toastify";
import { AppRoutes } from "../constants/routes";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  if (!auth.user) {
    console.log("error", auth);
    toast("gkdjsgf");
    return (
      <>
        <Navigate to={AppRoutes.LOGIN} state={{ path: location.pathname }} />
        <ToastContainer />
      </>
    );
  }
  return children;
};
