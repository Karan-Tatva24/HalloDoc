import { Box } from "@mui/material";
import React from "react";
import { loginHeading } from "../../../assets/Images";
import { Button } from "../../../Components/Button";
import "./patient.css";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../constants/routes";

const Patient = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      flexWrap="wrap"
      gap={5}
      pt={10}
    >
      <img src={loginHeading} alt="headingImg" />
      <Box display="flex" flexDirection="column" gap={5} pt={2}>
        <Button
          name="Submit A Request"
          className="patient-site-btn"
          onClick={() => navigate(AppRoutes.SUBMIT_REQUEST)}
        />
        <Button
          name="Registered Patients"
          color="info"
          className="patient-site-btn"
        />
      </Box>
      <Box pt={50}>
        <Link to="#">Terms of Conditions</Link>
        <Box component="span"> | </Box>
        <Link to="#">Privacy Policy</Link>
      </Box>
    </Box>
  );
};

export default Patient;
