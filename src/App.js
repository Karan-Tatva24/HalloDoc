import { useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { halloDocTheme } from "./doc.theme";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import DashBoard from "./Pages/DashBoard";
import ViewReservation from "./Pages/ViewReservation";
import ViewNotes from "./Pages/ViewNotes";
import ViewUpload from "./Pages/ViewUpload";
import Order from "./Pages/OrderSend";
import CloseCase from "./Pages/CloseCase";
import MyProfile from "./Pages/MyProfile";
import Header from "./Components/Header";
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
import PageNotFound from "./Pages/PageNotFound";
import ConcludeCare from "./Pages/ConcludeCare";
import EncounterForm from "./Pages/EncounterForm";
import MySchedule from "./Pages/MySchedule";
import Patient from "./Pages/patientSite/Patient";
import SubmitRequest from "./Pages/patientSite/SubmitRequest";
import PatientCreateRequest from "./Pages/patientSite/createRequestPages/PatientCreateRequest";
import FamilyFriendRequest from "./Pages/patientSite/createRequestPages/FamilyFriendRequest";
import ConciergeRequest from "./Pages/patientSite/createRequestPages/ConciergeRequest";
import BusinessRequest from "./Pages/patientSite/createRequestPages/BusinessRequest";
import SubmitInformation from "./Pages/patientSite/SubmitInformation";
import Agreement from "./Pages/patientSite/Agreement";
import UserProfile from "./Pages/patientSite/UserProfile";
import Footer from "./Components/Footer";
import { AppRoutes } from "./constants/routes";
import { RequireAuth } from "./Components/Private/RequireAuth";
import { BackLoginAuth } from "./Components/Private/BackLoginAuth";
import AdminAuth from "./Components/Private/AdminAuth";
import ProviderAuth from "./Components/Private/ProviderAuth";
import AdminProviderAuth from "./Components/Private/AdminProviderAuth";
import PatientAuth from "./Components/Private/PatientAuth";
import { loader } from "./assets/Images";
import "react-phone-input-2/lib/style.css";
import "./App.css";
import { useSelector } from "react-redux";

const App = () => {
  const [toggleDarkMode, setToggleDarkMode] = useState(false);
  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  };

  const { isLoading } = useSelector((state) => state.root.apiStatus);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100vh"
      gap={2}
    >
      {isLoading ? (
        <Box className="loader-wrapper">
          <img src={loader} alt="loader" />
        </Box>
      ) : null}

      <ThemeProvider theme={halloDocTheme(toggleDarkMode)}>
        <CssBaseline />
        <Routes>
          {/* ****** This routes are only access by logged out user only ********* */}
          <Route element={<BackLoginAuth />}>
            <Route path="/" element={<Login />} />
            <Route path={AppRoutes.LOGIN} element={<Login />} />
            <Route
              path={AppRoutes.FORGOTPASSWORD}
              element={<ForgotPassword />}
            />
            <Route path={AppRoutes.RESETPASSWORD} element={<ResetPassword />} />
          </Route>

          <Route
            element={
              <Header
                onClickDarkTheme={toggleDarkTheme}
                toggle={toggleDarkMode}
              />
            }
          >
            <Route path="/*" element={<PageNotFound />} />

            {/* ******* This routes are access by only login user ******* */}
            <Route element={<RequireAuth />}>
              {/* ******* This routes are access by only Admin ********* */}
              <Route element={<AdminAuth />}>
                <Route path={AppRoutes.SEND_ORDER} element={<Order />} />
                <Route path={AppRoutes.CLOSE_CASE} element={<CloseCase />} />
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
                <Route
                  path={AppRoutes.CREATE_ROLE}
                  element={<CreateAccess />}
                />
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
                <Route
                  path={AppRoutes.ADD_BUSINESS}
                  element={<AddBusiness />}
                />
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
              </Route>

              {/* ******** This routes are access by only Physician ********* */}
              <Route element={<ProviderAuth />}>
                <Route
                  path={AppRoutes.CONCLUDE_CARE}
                  element={<ConcludeCare />}
                />
                <Route path={AppRoutes.MY_SCHEDULE} element={<MySchedule />} />
              </Route>

              {/* ******* This routes are access by admin and physician only ********** */}
              <Route element={<AdminProviderAuth />}>
                <Route
                  path={AppRoutes.VIEW_CASE}
                  element={<ViewReservation />}
                />
                <Route
                  path={AppRoutes.ENCOUNTER_FORM}
                  element={<EncounterForm />}
                />
                <Route path={AppRoutes.VIEW_NOTES} element={<ViewNotes />} />
                <Route path={AppRoutes.MY_PROFILE} element={<MyProfile />} />
                <Route
                  path={AppRoutes.CREATE_REQUEST_ADMIN_PHYSICIAN}
                  element={<CreateRequest />}
                />
              </Route>

              {/* ******* This routes are access by only Patient ******** */}
              <Route element={<PatientAuth />}>
                <Route
                  path={AppRoutes.SUBMIT_INFORMATION}
                  element={<SubmitInformation />}
                />
                <Route
                  path={AppRoutes.USER_PROFILE}
                  element={<UserProfile />}
                />
              </Route>

              <Route path={AppRoutes.DASHBOARD} element={<DashBoard />} />
              <Route path={AppRoutes.VIEW_UPLOAD} element={<ViewUpload />} />
            </Route>

            {/* ********** This Routes are Access without Login ********** */}
            <Route path={AppRoutes.AGREEMENT_PAGE} element={<Agreement />} />
            <Route
              path={AppRoutes.SUBMIT_REQUEST}
              element={<SubmitRequest />}
            />
            <Route path={AppRoutes.PATIENT_SITE} element={<Patient />} />
            <Route
              path={AppRoutes.PATIENT_CREATE_REQUEST}
              element={<PatientCreateRequest />}
            />
            <Route
              path={AppRoutes.FAMILY_FRIEND_REQUEST}
              element={<FamilyFriendRequest />}
            />
            <Route
              path={AppRoutes.BUSINESS_REQUEST}
              element={<BusinessRequest />}
            />
            <Route
              path={AppRoutes.CONCIERGE_REQUEST}
              element={<ConciergeRequest />}
            />
          </Route>
        </Routes>
      </ThemeProvider>
      <Box position="relative" bottom={0} minWidth="100%">
        <Footer />
      </Box>
    </Box>
  );
};

export default App;
