import React from "react";
import { Box, Typography } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { Button } from "../../../Components/Button";
import { useNavigate } from "react-router-dom";
import Footer from "../../../Components/Footer";
import { AppRoutes } from "../../../constants/routes";

const SubmitRequest = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        pt={5}
        gap={3}
      >
        <Box display="flex">
          <Typography variant="h4">
            <b>I am a ...</b>
          </Typography>
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
        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            name="Patient"
            color="info"
            onClick={AppRoutes.PATIENT_CREATE_REQUEST}
          />
          <Button
            name="Family/Friend"
            color="primary"
            onClick={AppRoutes.FAMILY_FRIEND_REQUEST}
          />
          <Button
            name="Concierge"
            color="success"
            onClick={AppRoutes.CONCIERGE_REQUEST}
          />
          <Button
            name="Business Partner"
            color="secondary"
            onClick={AppRoutes.BUSINESS_REQUEST}
          />
        </Box>
      </Box>
      <Box position="fixed" bottom={0} minWidth="100%">
        <Footer />
      </Box>
    </>
  );
};

export default SubmitRequest;
