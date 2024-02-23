import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import { AppRoutes } from "./constants/routes";
import "./App.css";
import DashBoard from "./Pages/DashBoard/DashBoard";
import ViewReservation from "./Pages/ViewReservation/ViewReservation";
import ViewNotes from "./Pages/ViewNotes/ViewNotes";
import { AuthProvider } from "./Utils/auth";
import { RequireAuth } from "./Utils/RequireAuth";
import ViewUpload from "./Pages/ViewUpload/ViewUpload";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path={AppRoutes.LOGIN} element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route
              path={AppRoutes.FORGOTPASSWORD}
              element={<ForgotPassword />}
            />
            <Route path={AppRoutes.DASHBOARD} element={<DashBoard />} />
            <Route path={AppRoutes.VIEW_CASE} element={<ViewReservation />} />
            <Route path={AppRoutes.VIEW_NOTES} element={<ViewNotes />} />
          </Route>
          <Route path={AppRoutes.VIEW_UPLOAD} element={<ViewUpload />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
