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

const EditPhysicianInfo = () => {
  const navigate = useNavigate();
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
            <AccountInfo />
            <PhysiciansInformation />
            <AddressInfo />
            <ProviderProfile />
            <Divider sx={{ backgroundColor: "#1f1e1e86" }} />
            <OnBording />
            <Divider sx={{ backgroundColor: "#1f1e1e86", marginTop: "1rem" }} />
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              gap={2}
              mt={3}
            >
              <Button name="Save" />
              <Button color="error" name="Delete Account" />
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default EditPhysicianInfo;
