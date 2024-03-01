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
import Header from "./Components/Header";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { halloDocTheme } from "./doc.theme";
import { useState } from "react";

function App() {
  const [toggleDarkMode, setToggleDarkMode] = useState(false);
  const toggleDarkTheme = () => {
    console.log("Dark mode button clicked");
    setToggleDarkMode(!toggleDarkMode);
  };
  return (
    <div className="App">
      <ThemeProvider theme={halloDocTheme(toggleDarkMode)}>
        <CssBaseline />
        <Routes>
          <Route element={<BackLoginAuth />}>
            <Route path="/" element={<Login />} />
            <Route path={AppRoutes.LOGIN} element={<Login />} />
          </Route>
          <Route path={AppRoutes.FORGOTPASSWORD} element={<ForgotPassword />} />
          <Route element={<RequireAuth />}>
            <Route
              element={
                <Header
                  onClickDarkTheme={toggleDarkTheme}
                  toggle={toggleDarkMode}
                />
              }
            >
              <Route path={AppRoutes.DASHBOARD} element={<DashBoard />} />
              <Route path={AppRoutes.VIEW_CASE} element={<ViewReservation />} />
              <Route path={AppRoutes.VIEW_NOTES} element={<ViewNotes />} />
              <Route path={AppRoutes.VIEW_UPLOAD} element={<ViewUpload />} />
              <Route path={AppRoutes.SEND_ORDER} element={<Order />} />
              <Route path={AppRoutes.CLOSE_CASE} element={<CloseCase />} />
              <Route path={AppRoutes.MY_PROFILE} element={<MyProfile />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
