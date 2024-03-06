import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Paper, Typography } from "@mui/material";
import { Button } from "../../Components/Button";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import "./myProfile.css";
import AccountInfo from "../../Components/infoForms/AccountInfo";
import AdministratorInfo from "../../Components/infoForms/AdministratorInfo";
import AddressInfo from "../../Components/infoForms/AddressInfo";

const MyProfile = () => {
  const navigate = useNavigate();
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
            <AccountInfo />
            <AdministratorInfo />
            <AddressInfo />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default MyProfile;
