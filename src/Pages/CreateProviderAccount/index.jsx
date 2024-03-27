import {
  Box,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { Button } from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import "./createProviderAccount.css";
import { Input } from "../../Components/TextField/Input";
import PhoneInput from "react-phone-input-2";
import { useSelector } from "react-redux";

const CreateProviderAccount = () => {
  const navigate = useNavigate();
  const { regions } = useSelector((state) => state.root.getRegionPhysician);
  return (
    <>
      <Box className="main-create-provider-container">
        <Container maxWidth="lg" className="main-create-provider-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Create Provider Account</b>
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
          <Paper className="create-provider-form-container">
            <form>
              <Typography variant="h6">
                <b>Account Information</b>
              </Typography>
              <Grid container mt={5} spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={4}>
                  <Input
                    name="userName"
                    label="User Name(MD.Lastname.F)"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Input
                    name="password"
                    label="Password"
                    fullWidth
                    type="password"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Input select name="role" label="Role" fullWidth>
                    <MenuItem value="masterAdmin">Master Admin</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="provider">Provider</MenuItem>
                    <MenuItem value="patient">Patient</MenuItem>
                  </Input>
                </Grid>
              </Grid>
              <Typography variant="h6" mt={4}>
                <b>Administrator Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <Input name="firstName" label="First Name" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input name="lastName" label="Last Name" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input name="email" label="Email" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                  <PhoneInput
                    label="Phone Number"
                    name="administratorPhone"
                    country={"in"}
                    inputStyle={{ width: "100%", height: "3.438rem" }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="medicalLicense"
                    label="Medical License"
                    fullWidth
                  ></Input>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input name="npiNumber" label="NPI Number" fullWidth></Input>
                </Grid>
                <Grid item xs={12} md={6}>
                  {regions.map((region) => {
                    return (
                      <FormControlLabel
                        key={region.id}
                        control={<Checkbox size="medium" value={region.name} />}
                        label={region.name}
                      />
                    );
                  })}
                </Grid>
              </Grid>
              <Typography variant="h6" mt={4}>
                <b>Mailing & Billing Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <Input name="address1" label="Address 1" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input name="address2" label="Address 2" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input name="city" label="City" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input name="state" label="State" select fullWidth>
                    {regions.map((region) => (
                      <MenuItem key={region.id} value={region.name}>
                        {region.name}
                      </MenuItem>
                    ))}
                  </Input>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input name="zip" label="Zip" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                  <PhoneInput
                    label="Phone Number"
                    name="mailingPhone"
                    country={"us"}
                    inputStyle={{ width: "100%", height: "3.438rem" }}
                  />
                </Grid>
              </Grid>
              <Typography variant="h6" mt={4}>
                <b>Provider Profile</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <Input name="businessName" label="Business name" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="businessWebsite"
                    label="Business Website"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Box display="flex">
                      <Button
                        fullWidth
                        variant="outlined"
                        component="label"
                        title="Upload-files"
                      >
                        <input accept="image/*" type="file" />
                      </Button>

                      <Button
                        name="Upload"
                        variant="contained"
                        size="large"
                        startIcon={<CloudUploadOutlinedIcon />}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Input
                    name="adminNotes"
                    label="Admin Notes"
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
              <Divider
                sx={{ backgroundColor: "#413f3f85", marginTop: "1.5rem" }}
              />
              <Typography variant="h6" mt={2} mb={2}>
                <b>Onboarding</b>
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                gap={3}
              >
                <Box display="flex" flexWrap="wrap" gap={65}>
                  <FormControlLabel
                    control={<Checkbox name="IndConAgg" />}
                    label="Independent Contractor Agreement"
                    sx={{ width: "310px" }}
                  />
                  <Button
                    name="Upload"
                    startIcon={<CloudUploadOutlinedIcon />}
                  />
                </Box>
                <Box display="flex" flexWrap="wrap" gap={65}>
                  <FormControlLabel
                    control={<Checkbox name="BacCheck" />}
                    label="Background Check"
                    sx={{ width: "310px" }}
                  />
                  <Button
                    name="Upload"
                    startIcon={<CloudUploadOutlinedIcon />}
                  />
                </Box>
                <Box display="flex" flexWrap="wrap" gap={65}>
                  <FormControlLabel
                    control={<Checkbox name="HIPAA" />}
                    label="HIPAA Compliance"
                    sx={{ width: "310px" }}
                  />
                  <Button
                    name="Upload"
                    startIcon={<CloudUploadOutlinedIcon />}
                  />
                </Box>
                <Box display="flex" flexWrap="wrap" gap={65}>
                  <FormControlLabel
                    control={<Checkbox name="nonDisAgg" />}
                    label="Non-Disclosure Agreement"
                    sx={{ width: "310px" }}
                  />
                  <Button
                    name="Upload"
                    startIcon={<CloudUploadOutlinedIcon />}
                  />
                </Box>
              </Box>
              <Divider
                sx={{ backgroundColor: "#413f3f85", marginTop: "1.5rem" }}
              />
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button name="Create Account" color="success" />
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default CreateProviderAccount;
