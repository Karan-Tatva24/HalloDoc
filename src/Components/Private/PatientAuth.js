import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PatientAuth = () => {
  const location = useLocation();
  const { accountType } = useSelector((state) => state.root.loggedUserData);

  if (accountType !== "User") {
    return (
      <>
        <Navigate to="/*" state={{ path: location.pathname }} />
      </>
    );
  }
  return <Outlet />;
};

export default PatientAuth;
