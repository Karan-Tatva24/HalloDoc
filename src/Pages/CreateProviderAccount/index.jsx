import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import {
  Box,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import PhoneInput from "react-phone-input-2";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/TextField/Input";
import { createProviderAccount } from "../../redux/halloAPIs/userAPIs/createProviderAccountAPI";
import { createProviderAccountSchema } from "../../ValidationSchema";
import "./createProviderAccount.css";
import { AppRoutes } from "../../constants/routes";
import { getRoles } from "../../redux/halloAPIs/adminAPIs/commonAPIs/getRoleAPI";

const initialValues = {
  userName: "",
  password: "",
  role: "",
  firstName: "",
  lastName: "",
  email: "",
  administratorPhone: "",
  medicalLicense: "",
  npiNumber: "",
  selectedRegions: [],
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  mailingPhone: "",
  businessName: "",
  businessWebsite: "",
  adminNotes: "",
  IndConAgg: false,
  BacCheck: false,
  HIPAA: false,
  nonDisAgg: false,
};

const CreateProviderAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [indConAggFile, setIndConAggFile] = useState(null);
  const [backCheckFile, setBackCheckFile] = useState(null);
  const [hipaaCompFile, setHipaaCompFile] = useState(null);
  const [nonDisAggFile, setNonDisAggFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { regions } = useSelector((state) => state.root.getRegionPhysician);
  const { roles } = useSelector((state) => state.root.getRoles);

  useEffect(() => {
    dispatch(getRoles({ accountType: "physician" }));
  }, [dispatch]);

  const formik = useFormik({
    initialValues,
    onSubmit: (values, onSubmitProps) => {
      const formData = new FormData();
      formData.append("photo", selectedFile);
      formData.append("backgroundCheck", backCheckFile);
      formData.append("independentContract", indConAggFile);
      formData.append("hipaaCompliance", hipaaCompFile);
      formData.append("nonDisclosureAgreement", nonDisAggFile);
      dispatch(
        createProviderAccount({
          accountType: "Physician",
          userName: values.userName,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.administratorPhone,
          medicalLicense: values.medicalLicense,
          NPINumber: values.npiNumber,
          regions: values.selectedRegions,
          address1: values.address1,
          address2: values.address2,
          city: values.city,
          state: values.state,
          zipCode: values.zip,
          altPhone: values.mailingPhone,
          businessName: values.businessName,
          businessWebsite: values.businessWebsite,
          files: formData,
        }),
      ).then((response) => {
        console.log(response);
        if (response.type === "createProviderAccount/fulfilled") {
          toast.success(response.payload.message);
          onSubmitProps.resetForm();
          setSelectedFile(null);
          navigate(AppRoutes.PROVIDER);
        } else if (response.type === "createProviderAccount/rejected") {
          toast.error(response.payload.data.message);
        }
      });
    },
    validationSchema: createProviderAccountSchema,
  });

  const handleFileChange = (event) => {
    event.preventDefault();
    setSelectedFile(event.target.files[0]);
  };

  const handleRegionChange = (regionId) => {
    const index = formik.values.selectedRegions.indexOf(regionId);
    if (index === -1) {
      formik.setFieldValue("selectedRegions", [
        ...formik.values.selectedRegions,
        regionId,
      ]);
    } else {
      const updatedRegions = [...formik.values.selectedRegions];
      updatedRegions.splice(index, 1);
      formik.setFieldValue("selectedRegions", updatedRegions);
    }
  };

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
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => navigate(-1)}
              className="back-btn"
            />
          </Box>
          <Paper className="create-provider-form-container">
            <form onSubmit={formik.handleSubmit}>
              <Typography variant="h6">
                <b>Account Information</b>
              </Typography>
              <Grid container mt={5} spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={4}>
                  <Input
                    name="userName"
                    label="User Name(MD.LastName.F)"
                    fullWidth
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.userName && Boolean(formik.errors.userName)
                    }
                    helperText={
                      formik.touched.userName && formik.errors.userName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Input
                    name="password"
                    label="Password"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((show) => !show)}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffOutlinedIcon />
                            ) : (
                              <VisibilityOutlinedIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Input
                    select
                    name="role"
                    label="Role"
                    fullWidth
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
                  >
                    {roles?.map((role) => (
                      <MenuItem key={role?.id} value={role?.Name}>
                        {role?.Name}
                      </MenuItem>
                    ))}
                  </Input>
                </Grid>
              </Grid>
              <Typography variant="h6" mt={4}>
                <b>Administrator Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <Input
                    name="firstName"
                    label="First Name"
                    fullWidth
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="email"
                    label="Email"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <PhoneInput
                    label="Phone Number"
                    name="administratorPhone"
                    country={"in"}
                    inputStyle={{ width: "100%", height: "3.438rem" }}
                    value={formik.values.administratorPhone}
                    onChange={(value) =>
                      formik.setFieldValue("administratorPhone", value)
                    }
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.administratorPhone &&
                      Boolean(formik.errors.administratorPhone)
                    }
                    helperText={
                      formik.touched.administratorPhone &&
                      formik.errors.administratorPhone
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="medicalLicense"
                    label="Medical License"
                    fullWidth
                    value={formik.values.medicalLicense}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.medicalLicense &&
                      Boolean(formik.errors.medicalLicense)
                    }
                    helperText={
                      formik.touched.medicalLicense &&
                      formik.errors.medicalLicense
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="npiNumber"
                    label="NPI Number"
                    fullWidth
                    value={formik.values.npiNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.npiNumber &&
                      Boolean(formik.errors.npiNumber)
                    }
                    helperText={
                      formik.touched.npiNumber && formik.errors.npiNumber
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {regions?.map((region) => {
                    return (
                      <FormControlLabel
                        key={region?.id}
                        control={
                          <Checkbox
                            size="medium"
                            checked={formik.values.selectedRegions?.includes(
                              region?.id,
                            )}
                            onChange={() => handleRegionChange(region?.id)}
                            value={region?.name}
                          />
                        }
                        label={region?.name}
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
                  <Input
                    name="address1"
                    label="Address 1"
                    fullWidth
                    value={formik.values.address1}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.address1 && Boolean(formik.errors.address1)
                    }
                    helperText={
                      formik.touched.address1 && formik.errors.address1
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="address2"
                    label="Address 2"
                    fullWidth
                    value={formik.values.address2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.address2 && Boolean(formik.errors.address2)
                    }
                    helperText={
                      formik.touched.address2 && formik.errors.address2
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="city"
                    label="City"
                    fullWidth
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="state"
                    label="State"
                    select
                    fullWidth
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                  >
                    {regions?.map((region) => (
                      <MenuItem key={region?.id} value={region?.name}>
                        {region?.name}
                      </MenuItem>
                    ))}
                  </Input>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="zip"
                    label="Zip"
                    fullWidth
                    value={formik.values.zip}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.zip && Boolean(formik.errors.zip)}
                    helperText={formik.touched.zip && formik.errors.zip}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <PhoneInput
                    label="Phone Number"
                    name="mailingPhone"
                    country={"us"}
                    inputStyle={{ width: "100%", height: "3.438rem" }}
                    value={formik.values.mailingPhone}
                    onChange={(value) =>
                      formik.setFieldValue("mailingPhone", value)
                    }
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.mailingPhone &&
                      Boolean(formik.errors.mailingPhone)
                    }
                    helperText={
                      formik.touched.mailingPhone && formik.errors.mailingPhone
                    }
                  />
                </Grid>
              </Grid>
              <Typography variant="h6" mt={4}>
                <b>Provider Profile</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <Input
                    name="businessName"
                    label="Business name"
                    fullWidth
                    value={formik.values.businessName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.businessName &&
                      Boolean(formik.errors.businessName)
                    }
                    helperText={
                      formik.touched.businessName && formik.errors.businessName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="businessWebsite"
                    label="Business Website"
                    fullWidth
                    value={formik.values.businessWebsite}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.businessWebsite &&
                      Boolean(formik.errors.businessWebsite)
                    }
                    helperText={
                      formik.touched.businessWebsite &&
                      formik.errors.businessWebsite
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box display="flex" position="relative" mb={2} mt={2}>
                    <Button
                      style={{
                        color: "#000000",
                        display: "flex",
                        justifyContent: "flex-start",
                        backgroundColor: "#f6f6f6",
                      }}
                      fullWidth
                      variant="outlined"
                      component="label"
                      title="Upload-files"
                    >
                      <input
                        onChange={handleFileChange}
                        type="file"
                        id="selectFile"
                        hidden
                      />
                      <label htmlFor="selectFile">
                        {selectedFile !== null
                          ? selectedFile.name
                          : "Select File"}
                      </label>
                    </Button>

                    <Button
                      name="Upload"
                      variant="contained"
                      size="large"
                      startIcon={<CloudUploadOutlinedIcon />}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Input
                    name="adminNotes"
                    label="Admin Notes"
                    fullWidth
                    multiline
                    rows={4}
                    value={formik.values.adminNotes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.adminNotes &&
                      Boolean(formik.errors.adminNotes)
                    }
                    helperText={
                      formik.touched.adminNotes && formik.errors.adminNotes
                    }
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
                <Box display="none">
                  <input
                    type="file"
                    id="IndConAggFileInput"
                    onChange={(e) => {
                      formik.setFieldValue("IndConAgg", true);
                      setIndConAggFile(e.target.files[0]);
                    }}
                  />
                  <input
                    type="file"
                    id="BacCheckFileInput"
                    onChange={(e) => {
                      formik.setFieldValue("BacCheck", true);
                      setBackCheckFile(e.target.files[0]);
                    }}
                  />
                  <input
                    type="file"
                    id="HIPAAFileInput"
                    onChange={(e) => {
                      formik.setFieldValue("HIPAA", true);
                      setHipaaCompFile(e.target.files[0]);
                    }}
                  />
                  <input
                    type="file"
                    id="NonDisAggFileInput"
                    onChange={(e) => {
                      formik.setFieldValue("nonDisAgg", true);
                      setNonDisAggFile(e.target.files[0]);
                    }}
                  />
                </Box>
                <Box display="flex" flexWrap="wrap" gap={65}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="IndConAgg"
                        checked={formik.values.IndConAgg}
                        onChange={formik.handleChange}
                      />
                    }
                    label="Independent Contractor Agreement"
                    sx={{ width: "310px" }}
                  />
                  <Button
                    name="Upload"
                    startIcon={<CloudUploadOutlinedIcon />}
                    onClick={() =>
                      document.getElementById("IndConAggFileInput").click()
                    }
                  />
                </Box>
                <Box display="flex" flexWrap="wrap" gap={65}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="BacCheck"
                        checked={formik.values.BacCheck}
                        onChange={formik.handleChange}
                      />
                    }
                    label="Background Check"
                    sx={{ width: "310px" }}
                  />
                  <Button
                    name="Upload"
                    startIcon={<CloudUploadOutlinedIcon />}
                    onClick={() =>
                      document.getElementById("BacCheckFileInput").click()
                    }
                  />
                </Box>
                <Box display="flex" flexWrap="wrap" gap={65}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="HIPAA"
                        checked={formik.values.HIPAA}
                        onChange={formik.handleChange}
                      />
                    }
                    label="HIPAA Compliance"
                    sx={{ width: "310px" }}
                  />
                  <Button
                    name="Upload"
                    startIcon={<CloudUploadOutlinedIcon />}
                    onClick={() =>
                      document.getElementById("HIPAAFileInput").click()
                    }
                  />
                </Box>
                <Box display="flex" flexWrap="wrap" gap={65}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="nonDisAgg"
                        checked={formik.values.nonDisAgg}
                        onChange={formik.handleChange}
                      />
                    }
                    label="Non-Disclosure Agreement"
                    sx={{ width: "310px" }}
                  />
                  <Button
                    name="Upload"
                    startIcon={<CloudUploadOutlinedIcon />}
                    onClick={() =>
                      document.getElementById("NonDisAggFileInput").click()
                    }
                  />
                </Box>
              </Box>
              <Divider
                sx={{ backgroundColor: "#413f3f85", marginTop: "1.5rem" }}
              />
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button name="Create Account" color="success" type="submit" />
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default CreateProviderAccount;
