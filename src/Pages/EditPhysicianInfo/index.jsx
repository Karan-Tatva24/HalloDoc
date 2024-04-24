import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Button } from "../../Components/Button";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";
import AccountInfo from "../../Components/infoForms/AccountInfo";
import PhysiciansInformation from "../../Components/infoForms/PhysiciansInformation";
import AddressInfo from "../../Components/infoForms/AddressInfo";
import "./editPhysicianInfo.css";
import ProviderProfile from "../../Components/infoForms/ProviderProfile";
import OnBoarding from "./components/OnBoarding";
import { useSelector, useDispatch } from "react-redux";
import { getRoles } from "../../redux/halloAPIs/adminAPIs/commonAPIs/getRoleAPI";

const EditPhysicianInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { physicianData } = useSelector((state) => state.root.providerInfo);
  const { roles } = useSelector((state) => state.root.getRoles);

  useEffect(() => {
    dispatch(getRoles({ accountType: "physician" }));
  }, [dispatch]);

  const {
    id,
    userName,
    status,
    firstName,
    lastName,
    email,
    phoneNumber,
    medicalLicense,
    NPINumber,
    syncEmailAddress,
    address1,
    address2,
    city,
    state,
    zipCode,
    altPhone,
    photo,
    signature,
    isAgreementDoc,
    isBackgroundDoc,
    isNonDisclosureDoc,
    isLicenseDoc,
    isHipaaDoc,
    regions,
    role,
    notes,
    business,
    userFiles,
  } = physicianData.physicianProfile[0];

  const agreementDoc = userFiles?.filter(
    (file) => file?.docType === "independentContract",
  )?.[0]?.fileName;

  const backgroundDoc = userFiles?.filter(
    (file) => file?.docType === "backgroundCheck",
  )?.[0]?.fileName;

  const nonDisDoc = userFiles?.filter(
    (file) => file?.docType === "nonDisclosureAgreement",
  )?.[0]?.fileName;

  const hipaaDoc = userFiles?.filter(
    (file) => file?.docType === "hipaaCompliance",
  )?.[0]?.fileName;

  const licenseDoc = userFiles?.filter(
    (file) => file?.docType === "licenseDoc",
  )?.[0]?.fileName;

  return (
    <>
      <Box className="main-edit-container">
        <Container maxWidth="md" className="main-edit-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Edit Physician Account</b>
              </Typography>
            </Box>
            <Button
              name="Back"
              variant="outlined"
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => navigate(-1)}
              className="back-btn"
            />
          </Box>
          <Paper className="edit-form-container">
            <AccountInfo
              name="EditProvider"
              userName={userName}
              status={status}
              id={id}
              role={role}
              roles={roles}
            />
            <PhysiciansInformation
              id={id}
              firstName={firstName}
              lastName={lastName}
              email={email}
              phone={phoneNumber}
              medicalLicense={medicalLicense}
              npiNumber={NPINumber}
              syncEmail={syncEmailAddress ? syncEmailAddress : ""}
              state={state}
              regions={regions}
            />
            <AddressInfo
              index={id}
              name="EditProvider"
              address1={address1}
              address2={address2}
              city={city}
              state={state}
              zipCode={zipCode}
              altPhone={altPhone}
              regions={regions}
            />
            <ProviderProfile
              id={id}
              businessName={business?.businessName}
              businessWebsite={business?.businessWebsite}
              notes={notes}
              photo={photo}
              signature={signature}
            />
            <Divider sx={{ backgroundColor: "#1f1e1e86" }} />
            <OnBoarding
              id={id}
              agreementDoc={agreementDoc}
              backgroundDoc={backgroundDoc}
              nonDisDoc={nonDisDoc}
              hipaaDoc={hipaaDoc}
              licenseDoc={licenseDoc}
              isAgreementDoc={isAgreementDoc}
              isBackgroundDoc={isBackgroundDoc}
              isNonDisclosureDoc={isNonDisclosureDoc}
              isLicenseDoc={isLicenseDoc}
              isHipaaDoc={isHipaaDoc}
            />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default EditPhysicianInfo;
