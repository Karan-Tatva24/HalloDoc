import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { Button } from "../../Components/Button";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";
import AccountInfo from "../../Components/infoForms/AccountInfo";
import PhysiciansInformation from "../../Components/infoForms/PhysiciansInformation";
import AddressInfo from "../../Components/infoForms/AddressInfo";
import "./editPhysicianInfo.css";
import ProviderProfile from "../../Components/infoForms/ProviderProfile";
import OnBording from "./components/OnBording";
import { useSelector, useDispatch } from "react-redux";
import { deleteProviderAccount } from "../../redux/halloAPIs/providerInfoAPI";
import { toast } from "react-toastify";
import { AppRoutes } from "../../constants/routes";

const EditPhysicianInfo = () => {
  const { physicianData } = useSelector((state) => state.root.providerInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    regions,
  } = physicianData.physicianProfile[0];

  const { businessName, businessWebsite } = physicianData.businessDetails[0];

  const handelDeleteAccount = () => {
    dispatch(deleteProviderAccount(id)).then((response) => {
      if (response.type === "deleteProviderAccount/fulfilled") {
        toast.success(response.payload.message);
        navigate(AppRoutes.PROVIDER);
      }
    });
  };

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
              size="small"
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
              businessName={businessName}
              businessWebsite={businessWebsite}
              photo={photo}
              signature={signature}
            />
            <Divider sx={{ backgroundColor: "#1f1e1e86" }} />
            <OnBording
              id={id}
              isAgreementDoc={isAgreementDoc}
              isBackgroundDoc={isBackgroundDoc}
              isNonDisclosureDoc={isNonDisclosureDoc}
              isLicenseDoc={isLicenseDoc}
            />
            <Divider sx={{ backgroundColor: "#1f1e1e86", marginTop: "1rem" }} />
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              gap={2}
              mt={3}
            >
              <Button name="Save" />
              <Button
                color="error"
                name="Delete Account"
                onClick={handelDeleteAccount}
              />
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default EditPhysicianInfo;
