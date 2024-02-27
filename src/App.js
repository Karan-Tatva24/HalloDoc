import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import { AppRoutes } from "./constants/routes";
import "./App.css";
import DashBoard from "./Pages/DashBoard/DashBoard";
import ViewReservation from "./Pages/ViewReservation/ViewReservation";
import ViewNotes from "./Pages/ViewNotes/ViewNotes";
import { RequireAuth } from "./Utils/RequireAuth";
import ViewUpload from "./Pages/ViewUpload/ViewUpload";
import { BackLoginAuth } from "./Utils/BackLoginAuth";
import Order from "./Pages/OrderSend/Order";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<BackLoginAuth />}>
          <Route path="/" element={<Login />} />
          <Route path={AppRoutes.LOGIN} element={<Login />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path={AppRoutes.FORGOTPASSWORD} element={<ForgotPassword />} />
          <Route path={AppRoutes.DASHBOARD} element={<DashBoard />} />
          <Route path={AppRoutes.VIEW_CASE} element={<ViewReservation />} />
          <Route path={AppRoutes.VIEW_NOTES} element={<ViewNotes />} />
          <Route path={AppRoutes.VIEW_UPLOAD} element={<ViewUpload />} />
          <Route path={AppRoutes.SEND_ORDER} element={<Order />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
