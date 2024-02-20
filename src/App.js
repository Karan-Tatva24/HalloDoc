import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import { AppRoutes } from "./constants/routes";
import "./App.css";
import DashBoard from "./Pages/DashBoard/DashBoard";
import ViewReservation from "./Pages/ViewReservation/ViewReservation";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route />
        <Route path={AppRoutes.LOGIN} element={<Login />} />
        <Route path={AppRoutes.FORGOTPASSWORD} element={<ForgotPassword />} />
        <Route path={AppRoutes.DASHBOARD} element={<DashBoard />} />
        <Route path={AppRoutes.VIEW_CASE} element={<ViewReservation />} />
      </Routes>
    </div>
  );
}

export default App;
