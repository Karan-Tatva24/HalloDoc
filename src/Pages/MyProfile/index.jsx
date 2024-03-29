import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Paper, Typography } from "@mui/material";
import { Button } from "../../Components/Button";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import "./myProfile.css";
import AccountInfo from "../../Components/infoForms/AccountInfo";
import AdministratorInfo from "../../Components/infoForms/AdministratorInfo";
import AddressInfo from "../../Components/infoForms/AddressInfo";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const navigate = useNavigate();

  const { profileData } = useSelector((state) => state.root.adminProfile);
  const {
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
    regions,
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
              size="small"
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => navigate(-1)}
              className="back-btn"
            />
          </Box>
          <Paper className="profile-form-container">
            <AccountInfo userName={userName} status={status} />
            <AdministratorInfo
              firstName={firstName}
              lastName={lastName}
              email={email}
              phone={phoneNumber}
              state={state}
              regions={regions}
            />
            <AddressInfo
              address1={address1}
              address2={address2}
              city={city}
              state={state}
              zip={zipCode}
              altPhone={altPhone}
              regions={regions}
            />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default MyProfile;
