import { Box, Container, Paper, Typography } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import React from "react";
import { Button } from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import "./concludeCare.css";
import { useSelector } from "react-redux";

const ConcludeCare = () => {
  const navigate = useNavigate();
  const { patientFirstName, patientLastName } = useSelector(
    (state) => state.root.patientName,
  );

  return (
    <>
      <Box className="conclude-care-main-container">
        <Container maxWidth="md" className="conclude-care-main-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Conclude Care</b>
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
          <Paper className="conclude-care-container">
            <Typography variant="caption">Patient Name</Typography>
            <Typography variant="h6">
              <b className="patient-name">
                {patientFirstName} {patientLastName}
              </b>
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5">
                <b>Encounter Form</b>
              </Typography>
              <Button
                name="Upload"
                variant="outlined"
                size="large"
                startIcon={<CloudUploadOutlinedIcon />}
                type="submit"
              />
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ConcludeCare;
