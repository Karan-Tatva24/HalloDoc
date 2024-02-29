import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import { AppRoutes } from "./constants/routes";
import "./App.css";
import DashBoard from "./Pages/DashBoard";
import ViewReservation from "./Pages/ViewReservation";
import ViewNotes from "./Pages/ViewNotes";
import { RequireAuth } from "./Components/Private/RequireAuth";
import ViewUpload from "./Pages/ViewUpload";
import { BackLoginAuth } from "./Components/Private/BackLoginAuth";
import Order from "./Pages/OrderSend";
import CloseCase from "./Pages/CloseCase";
import MyProfile from "./Pages/MyProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<BackLoginAuth />}>
          <Route path="/" element={<Login />} />
          <Route path={AppRoutes.LOGIN} element={<Login />} />
        </Route>
        <Route path={AppRoutes.FORGOTPASSWORD} element={<ForgotPassword />} />
        <Route element={<RequireAuth />}>
          <Route path={AppRoutes.DASHBOARD} element={<DashBoard />} />
          <Route path={AppRoutes.VIEW_CASE} element={<ViewReservation />} />
          <Route path={AppRoutes.VIEW_NOTES} element={<ViewNotes />} />
          <Route path={AppRoutes.VIEW_UPLOAD} element={<ViewUpload />} />
          <Route path={AppRoutes.SEND_ORDER} element={<Order />} />
          <Route path={AppRoutes.CLOSE_CASE} element={<CloseCase />} />
          <Route path={AppRoutes.MY_PROFILE} element={<MyProfile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
