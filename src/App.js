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
import ProviderInfo from "./Pages/ProviderInfo";
import EditPhysicianInfo from "./Pages/EditPhysicianInfo";
import ResetPassword from "./Pages/ResetPassword";
import AccountAccess from "./Pages/AccountAccess";
import CreateAccess from "./Pages/CreateAccess";
import Scheduling from "./Pages/Scheduling";
import RequestedShifts from "./Pages/RequestedShifts";
import UserAccess from "./Pages/UserAccess";
import ProviderOnCall from "./Pages/ProviderOnCall";
import CreateProviderAccount from "./Pages/CreateProviderAccount";
import ProviderLocation from "./Pages/ProviderLocation";
import Partners from "./Pages/Partners";
import AddBusiness from "./Pages/AddBusiness";
import PatientHistory from "./Pages/PatientHistory";
import PatientRecord from "./Pages/PatientRecord";
import SearchRecords from "./Pages/SearchRecords";
import EmailLogs from "./Pages/EmailLogs";
import SMSLogs from "./Pages/SMSLogs";
import BlockHistory from "./Pages/BlockHistory";
import CreateRequest from "./Pages/CreateRequest";
import "react-phone-input-2/lib/style.css";
import PageNotFound from "./Pages/PageNotFound";
import ConcludeCare from "./Pages/ConcludeCare";

const App = () => {
  const [toggleDarkMode, setToggleDarkMode] = useState(false);
  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  };
  return (
    <div className="App">
      <ThemeProvider theme={halloDocTheme(toggleDarkMode)}>
        <CssBaseline />
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route element={<BackLoginAuth />}>
            <Route path="/" element={<Login />} />
            <Route path={AppRoutes.LOGIN} element={<Login />} />
            <Route
              path={AppRoutes.FORGOTPASSWORD}
              element={<ForgotPassword />}
            />
          </Route>
          <Route path={AppRoutes.RESETPASSWORD} element={<ResetPassword />} />
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
              <Route path={AppRoutes.PROVIDER} element={<ProviderInfo />} />
              <Route
                path={AppRoutes.EDIT_PHYSICIAN}
                element={<EditPhysicianInfo />}
              />
              <Route
                path={AppRoutes.CREATE_PROVIDER_ACCOUNT}
                element={<CreateProviderAccount />}
              />
              <Route
                path={AppRoutes.ACCOUNT_ACCESS}
                element={<AccountAccess />}
              />
              <Route path={AppRoutes.USER_ACCESS} element={<UserAccess />} />
              <Route path={AppRoutes.CREATE_ROLE} element={<CreateAccess />} />
              <Route path={AppRoutes.SCHEDULING} element={<Scheduling />} />
              <Route
                path={AppRoutes.REQUESTED_SHIFTS}
                element={<RequestedShifts />}
              />
              <Route
                path={AppRoutes.PROVIDER_ON_CALL}
                element={<ProviderOnCall />}
              />
              <Route
                path={AppRoutes.PROVIDER_LOCATION}
                element={<ProviderLocation />}
              />
              <Route path={AppRoutes.PARTNERS} element={<Partners />} />
              <Route path={AppRoutes.ADD_BUSINESS} element={<AddBusiness />} />
              <Route
                path={AppRoutes.PATIENT_HISTORY}
                element={<PatientHistory />}
              />
              <Route
                path={AppRoutes.PATIENTS_RECORDS}
                element={<PatientRecord />}
              />
              <Route
                path={AppRoutes.SEARCH_RECORDS}
                element={<SearchRecords />}
              />
              <Route path={AppRoutes.EMAIL_LOGS} element={<EmailLogs />} />
              <Route path={AppRoutes.SMS_LOGS} element={<SMSLogs />} />
              <Route
                path={AppRoutes.BLOCKED_HISTORY}
                element={<BlockHistory />}
              />
              <Route
                path={AppRoutes.CREATE_REQUEST_ADMIN_PHYSICIAN}
                element={<CreateRequest />}
              />
              <Route
                path={AppRoutes.CONCLUDE_CARE}
                element={<ConcludeCare />}
              />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;
