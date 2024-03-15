import React from "react";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import "./viewReservation.css";
import { Input } from "../../Components/TextField/Input";
import { Button } from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/routes";
import { useFormik } from "formik";
import { viewReservationSchema } from "../../ValidationSchema";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useSelector } from "react-redux";

const ViewReservation = () => {
  const state = useSelector((state) => state.root?.viewCase);
  const data = state?.data?.data[0];
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      patientNotes: data?.["Patient Notes"] || "",
      firstName: data?.["First Name"] || "",
      lastName: data?.["Last Name"] || "",
      dateOfBirth: data?.["Date Of Birth"] || "",
      phone: data?.["Phone Number"] || "",
      email: data?.["Email"] || "",
      region: data?.["Region"] || "",
      address: data?.["Address"] || "",
      roomNo: data?.["Room"] || "",
    },
    validationSchema: viewReservationSchema,
    onSubmit: (values, onSubmitProps) => {
      console.log(values);
      onSubmitProps.resetForm();
    },
  });
  return (
    <>
      <Box className="main-container">
        <Container maxWidth="md" className="main-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>View Reservation</b>
              </Typography>
              <span className="patient-btn">Patient</span>
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

          <Paper className="form-container">
            <form onSubmit={formik.handleSubmit}>
              <Typography variant="h6">
                <b>Patient Information</b>
              </Typography>
              <Typography variant="caption" display="block">
                Conformation Number
              </Typography>
              <Typography variant="subtitle1" color="primary">
                <b>{data?.["Confirmation Number"]}</b>
              </Typography>
              <Input
                label="Patient Notes"
                name="patientNotes"
                disabled
                value={
                  formik.values.patientNotes ? formik.values.patientNotes : "-"
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.patientNotes && formik.errors.patientNotes
                }
                error={
                  formik.touched.patientNotes &&
                  Boolean(formik.errors.patientNotes)
                }
                multiline
                rows={3}
                fullWidth
                className="form-input"
              />
              <Divider />
              <Grid
                container
                spacing={{ xs: 1, md: 2 }}
                className="input-container"
              >
                <Grid item xs={12} md={6}>
                  <Input
                    label="First Name"
                    name="firstName"
                    disabled
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
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Last Name"
                    name="lastName"
                    disabled
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    type="date"
                    name="dateOfBirth"
                    disabled
                    value={formik.values.dateOfBirth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    }
                    error={
                      formik.touched.dateOfBirth &&
                      Boolean(formik.errors.dateOfBirth)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={10} md={5}>
                  <PhoneInput
                    label="Phone Number"
                    name="phone"
                    disabled
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    country={"in"}
                    helperText={formik.touched.phone && formik.errors.phone}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    inputStyle={{ width: "100%", height: "3.438rem" }}
                  />
                </Grid>
                <Grid item xs={2} md={1}>
                  <Button
                    variant="outlined"
                    size="large"
                    className="form-btn icon-btn"
                  >
                    <PhoneOutlinedIcon />
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Email"
                    name="email"
                    disabled
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.email && formik.errors.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Typography variant="h6">
                <b>Location Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Region"
                    name="region"
                    disabled
                    value={formik.values.region}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.region && formik.errors.region}
                    error={
                      formik.touched.region && Boolean(formik.errors.region)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={10} md={5}>
                  <Input
                    label="Business Name/Address"
                    name="address"
                    disabled
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.address && formik.errors.address}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2} md={1}>
                  <Button
                    variant="outlined"
                    size="large"
                    className="form-btn icon-btn"
                  >
                    <LocationOnOutlinedIcon />
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Room #"
                    name="roomNo"
                    disabled
                    value={formik.values.roomNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.roomNo && formik.errors.roomNo}
                    error={
                      formik.touched.roomNo && Boolean(formik.errors.roomNo)
                    }
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Box
                display="flex"
                justifyContent="flex-end"
                gap={2}
                mt={4}
                flexWrap="wrap"
              >
                {data["Case Tag"] === "New" && (
                  <Button name="Assign" type="submit" disableRipple />
                )}
                <Button
                  name="View Notes"
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(AppRoutes.VIEW_NOTES)}
                />
                <Button name="Cancel" variant="contained" color="error" />
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ViewReservation;
