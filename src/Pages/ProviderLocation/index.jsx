import { Box, Container, Paper, Typography } from "@mui/material";
import { Button } from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import "./providerLocation.css";
import Map from "../../Components/Map";

const ProviderLocation = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box className="provider-location-main-container">
        <Container className="provider-location-wrapper" maxWidth="md">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Provider Location</b>
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
          <Paper className="provider-location-container">
            <Map />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ProviderLocation;
