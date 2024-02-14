import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import { AppRoutes } from "./constants/routes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route />
        <Route path={AppRoutes.LOGIN} element={<Login />} />
        <Route path={AppRoutes.FORGOTPASSWORD} element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
