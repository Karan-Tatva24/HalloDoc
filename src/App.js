import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import { AppRoutes } from "./constants/routes";
import "./App.css";
import DashBoard from "./Pages/DashBoard/DashBoard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route />
        <Route path={AppRoutes.LOGIN} element={<Login />} />
        <Route path={AppRoutes.FORGOTPASSWORD} element={<ForgotPassword />} />
        <Route path={AppRoutes.DASHBOARD} element={<DashBoard />} />
      </Routes>
    </div>
  );
}

export default App;
