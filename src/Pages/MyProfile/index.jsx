import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import { Button } from "../../Components/Button";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import "./myProfile.css";
import AccountInfo from "../../Components/infoForms/AccountInfo";
import AdministratorInfo from "../../Components/infoForms/AdministratorInfo";
import AddressInfo from "../../Components/infoForms/AddressInfo";
import { useSelector, useDispatch } from "react-redux";
import { getRoles } from "../../redux/halloAPIs/adminAPIs/commonAPIs/getRoleAPI";
import PhysiciansInformation from "../../Components/infoForms/PhysiciansInformation";
import ProviderProfile from "../../Components/infoForms/ProviderProfile";
import OnBoarding from "./components/OnBoarding";
import RequestToAdminModal from "../../Components/Modal/RequestToAdminModal";
import { adminProfile } from "../../redux/halloAPIs/adminAPIs/profileAPIs/adminProfileAPI";

const MyProfile = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profileData } = useSelector((state) => state.root.adminProfile);
  const { roles } = useSelector((state) => state.root.getRoles);
  const { accountType } = useSelector((state) => state?.root.loggedUserData);

  useEffect(() => {
    dispatch(adminProfile());
    dispatch(getRoles({ accountType: "admin" }));
  }, [dispatch]);

  const handleOpen = (name, id) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    id,
    userName,
    status,
    firstName,
    lastName,
    email,
    phoneNumber,
    address1,
    address2,
    city,
    state,
    zipCode,
    altPhone,
    medicalLicense,
    NPINumber,
    regions,
    role,
    business,
    userFiles,
  } = profileData;

  return (
    <>
      <Box className="main-profile-container">
        <Container maxWidth="md" className="main-profile-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>My Profile</b>
              </Typography>
            </Box>
            <Button
              name="Back"
              variant="outlined"
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => navigate(-1)}
            />
          </Box>
          <Paper className="profile-form-container">
            {accountType === "Physician" ? (
              <Box display="flex" justifyContent="flex-end" pb={3}>
                <Button
                  name="Request To Admin"
                  variant="outlined"
                  onClick={handleOpen}
                />
              </Box>
            ) : null}
            <AccountInfo
              name="MyProfile"
              id={id}
              userName={userName}
              status={status}
              role={role}
              roles={roles}
            />
            {accountType === "Admin" ? (
              <AdministratorInfo
                firstName={firstName}
                lastName={lastName}
                email={email}
                phone={phoneNumber}
                state={state}
                regions={regions}
              />
            ) : (
              <PhysiciansInformation
                id={id}
                firstName={firstName}
                lastName={lastName}
                email={email}
                phone={phoneNumber}
                medicalLicense={medicalLicense}
                npiNumber={NPINumber}
                state={state}
                regions={regions}
              />
            )}
            <AddressInfo
              name="MyProfile"
              address1={address1}
              address2={address2}
              city={city}
              state={state}
              zip={zipCode}
              altPhone={altPhone}
              regions={regions}
            />
            {accountType === "Physician" ? (
              <>
                <ProviderProfile
                  id={id}
                  businessName={business?.businessName}
                  businessWebsite={business?.businessWebsite}
                  photo={userFiles?.photo}
                  signature={userFiles?.signature}
                />
                <Divider sx={{ backgroundColor: "#1f1e1e86" }} />
                <OnBoarding
                  id={id}
                  isAgreementDoc={userFiles?.isAgreementDoc}
                  isBackgroundDoc={userFiles?.isBackgroundDoc}
                  isNonDisclosureDoc={userFiles?.isNonDisclosureDoc}
                  isLicenseDoc={userFiles?.isLicenseDoc}
                  isHipaaDoc={userFiles?.isHipaaDoc}
                />
              </>
            ) : null}
          </Paper>
        </Container>
      </Box>
      <RequestToAdminModal id={id} open={open} handleClose={handleClose} />
    </>
  );
};

export default MyProfile;
