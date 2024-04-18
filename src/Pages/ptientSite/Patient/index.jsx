import { Box, Typography } from "@mui/material";
import React from "react";
import { loginHeading } from "../../../assets/Images";
import { Button } from "../../../Components/Button";
import "./patient.css";

const Patient = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      gap={5}
      pt={10}
    >
      <img src={loginHeading} alt="headingImg" />
      <Box display="flex" flexDirection="column" gap={5} pt={2}>
        <Button name="Submit A Request" className="patient-btn" />
        <Button
          name="Registered Patients"
          color="info"
          className="patient-btn"
        />
      </Box>
      <Box>
        <Typography></Typography>
      </Box>
    </Box>
  );
};

export default Patient;
