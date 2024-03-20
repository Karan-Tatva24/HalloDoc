import {
  Box,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { Button } from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Input } from "../../Components/TextField/Input";
import { useSelector } from "react-redux";
import { useState } from "react";
import { userDefault } from "../../assets/Images";
import "./providerOnCall.css";

const ProviderOnCall = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("all");
  const { regions } = useSelector((state) => state.root.getRegionPhysician);
  return (
    <>
      <Box className="provider-call-main-container">
        <Container maxWidth="lg" className="provider-call-wrapper-container">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>MDs On Call</b>
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            gap={2}
          >
            <Input
              className="search-text drop-list"
              select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="all">All Regions</MenuItem>
              {regions?.map((region) => {
                return (
                  <MenuItem key={region.id} value={region.name}>
                    {region.name}
                  </MenuItem>
                );
              })}
            </Input>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={2}
            >
              <Button name="Calender View" />
              <Button name="Shifts For Review" />
            </Box>
          </Box>
          <Paper className="provider-call-full-paper">
            <Typography>
              <b>Mds On Call</b>
            </Typography>

            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item xs={12}>
                <Typography>
                  <b>Physicians Off Duty</b>
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box display="flex">
                  <img src={userDefault} alt="user" height={70} />
                  Dr Green
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box display="flex">
                  <img src={userDefault} alt="user" height={70} />
                  Dr Brown
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box display="flex">
                  <img src={userDefault} alt="user" height={70} />
                  Dr John
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box display="flex">
                  <img src={userDefault} alt="user" height={70} />
                  Dr Test
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box display="flex">
                  <img src={userDefault} alt="user" height={70} />
                  Dr Physician
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box display="flex">
                  <img src={userDefault} alt="user" height={70} />
                  Dr Blue
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box display="flex">
                  <img src={userDefault} alt="user" height={70} />
                  Dr Patient
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box display="flex">
                  <img src={userDefault} alt="user" height={70} />
                  Dr Black
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box display="flex">
                  <img src={userDefault} alt="user" height={70} />
                  Dr Man
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box display="flex">
                  <img src={userDefault} alt="user" height={70} />
                  Dr Woman
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ProviderOnCall;
