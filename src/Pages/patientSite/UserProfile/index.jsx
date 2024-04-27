import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { Button } from "../../../Components/Button";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../Components/TextField/Input";
import { useFormik } from "formik";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../../redux/halloAPIs/patientAPIs/editProfileAPI";
import { toast } from "react-toastify";
import { adminProfile } from "../../../redux/halloAPIs/adminAPIs/profileAPIs/adminProfileAPI";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../../redux/halloSlices/apiStatusSlice";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  dob: "",
  email: "",
  phoneType: "",
  phoneNumber: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
};

const UserProfile = () => {
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const [isDisable, setIsDisable] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiPending());
    dispatch(adminProfile()).then((response) => {
      if (response.type === "adminProfile/fulfilled") dispatch(apiSuccess());
      else if (response.type === "adminProfile/rejected") dispatch(apiFails());
    });
  }, [dispatch]);

  const { profileData } = useSelector((state) => state.root.adminProfile);

  const formik = useFormik({ initialValues, enableReinitialize: true });

  useEffect(() => {
    setInitialValues({
      firstName: profileData?.firstName,
      lastName: profileData?.lastName,
      dob: profileData?.dob,
      email: profileData?.email,
      phoneType: profileData?.phoneType,
      phoneNumber: profileData?.phoneNumber,
      street: profileData?.street,
      city: profileData?.city,
      state: profileData?.state,
      zipCode: profileData?.zipCode,
    });
  }, [profileData]);

  const handleSave = () => {
    dispatch(apiPending());
    dispatch(editProfile(formik.values)).then((response) => {
      if (response.type === "editProfile/fulfilled") {
        dispatch(adminProfile(profileData.id));
        setIsDisable(true);
        dispatch(apiSuccess());
        toast.success(response.payload.message);
      } else if (response.type === "editProfile/rejected") dispatch(apiFails());
    });
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#f6f6f6" }}>
        <Container maxWidth="lg" sx={{ padding: "1rem 3rem" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Typography variant="h5">
              <b>User Profile</b>
            </Typography>
            <Button
              name="Back"
              variant="outlined"
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => navigate(-1)}
            />
          </Box>
          <Paper sx={{ padding: "1.25rem" }}>
            <form onSubmit={formik.handleSubmit}>
              <Typography variant="h5" pb={2}>
                <b>General Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <Input
                    name="firstName"
                    label="First Name"
                    fullWidth
                    disabled={isDisable}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    disabled={isDisable}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    name="dob"
                    label="Date Of Birth"
                    sx={{ width: "100%" }}
                    disabled={isDisable}
                    inputFormat="DD/MM/YYYY"
                    value={formik.values.dob ? dayjs(formik.values.dob) : null}
                    onChange={(newValue) => {
                      const formattedDate = newValue ? newValue : null;
                      formik.setFieldValue("dob", formattedDate);
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.dob && Boolean(formik.errors.dob)}
                    helperText={formik.touched.dob && formik.errors.dob}
                  />
                </Grid>
              </Grid>
              <Typography variant="h5" pb={2} pt={3}>
                <b>Contact Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={4} md={2}>
                  <Input
                    name="phoneType"
                    label="Type"
                    fullWidth
                    disabled={isDisable}
                    select
                    value={formik.values.phoneType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.phoneType && formik.errors.phoneType
                    }
                    error={
                      formik.touched.phoneType &&
                      Boolean(formik.errors.phoneType)
                    }
                  >
                    <MenuItem value="Phone">Phone</MenuItem>
                    <MenuItem value="Mobile">Mobile</MenuItem>
                    <MenuItem value="Landline">LandLine</MenuItem>
                  </Input>
                </Grid>
                <Grid item xs={8} md={4}>
                  <PhoneInput
                    name="phoneNumber"
                    country={"in"}
                    disabled={isDisable}
                    inputStyle={{ width: "100%", height: "3.438rem" }}
                    value={formik.values.phoneNumber}
                    onChange={(value) =>
                      formik.setFieldValue("phoneNumber", value)
                    }
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="email"
                    label="Email"
                    fullWidth
                    disabled={isDisable}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.email && formik.errors.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                  />
                </Grid>
              </Grid>
              <Typography variant="h5" pb={2} pt={3}>
                <b>Location Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <Input
                    name="street"
                    label="Street"
                    fullWidth
                    disabled={isDisable}
                    value={formik.values.street}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.street && formik.errors.street}
                    error={
                      formik.touched.street && Boolean(formik.errors.street)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="city"
                    label="City"
                    fullWidth
                    disabled={isDisable}
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.city && formik.errors.city}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="state"
                    label="State"
                    fullWidth
                    disabled={isDisable}
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.state && formik.errors.state}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="zipCode"
                    label="Zip Code"
                    fullWidth
                    disabled={isDisable}
                    value={formik.values.zipCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.zipCode && formik.errors.zipCode}
                    error={
                      formik.touched.zipCode && Boolean(formik.errors.zipCode)
                    }
                  />
                </Grid>
              </Grid>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
                pt={2}
              >
                {isDisable ? (
                  <Button name="Edit" onClick={() => setIsDisable(false)} />
                ) : (
                  <>
                    <Button name="Save" onClick={handleSave} />
                    <Button
                      name="Cancel"
                      variant="outlined"
                      onClick={() => {
                        formik.setValues(initialValues);
                        setIsDisable(true);
                      }}
                    />
                  </>
                )}
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default UserProfile;
