import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Paper, Typography } from "@mui/material";
import { Button } from "../../Components/Button";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import Header from "../../Components/Header";
import "./myProfile.css";
import AccountInfo from "./components/AccountInfo";
import AdministratorInfo from "./components/AdministratorInfo";
import AddressInfo from "./components/AddressInfo";

const MyProfile = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
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
                <b>View Reservation</b>
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