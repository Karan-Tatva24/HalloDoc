import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { Button } from "../../../Components/Button";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../Components/TextField/Input";
import PhoneInput from "react-phone-input-2";
import { useFormik } from "formik";
import { debounce } from "lodash";
import InformationModal from "../../../Components/Modal/InformationModal";
import { useDispatch } from "react-redux";
import {
  createRequest,
  isEmailFound,
} from "../../../redux/halloAPIs/userAPIs/createRequestAPI";
import { toast } from "react-toastify";
import { createRequestAllSchema } from "../../../ValidationSchema";

const initialValues = {
  requestType: "Business",
  requestorFirstName: "",
  requestorLastName: "",
  requestorPhoneNumber: "",
  requestorEmail: "",
  relationName: "",
  patientNote: "",
  patientFirstName: "",
  patientLastName: "",
  dob: "",
  patientEmail: "",
  isEmail: "",
  patientPhoneNumber: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  roomNumber: "",
};

const debouncedApiCall = debounce(async (email, setFieldValue, dispatch) => {
  try {
    const response = await dispatch(isEmailFound({ patientEmail: email }));
    if (response.type === "isEmailFound/fulfilled") {
      setFieldValue("isEmail", response.payload?.data);
    }
  } catch (error) {
    toast.error("Failed to check email:", error);
  }
}, 1000);

const BusinessRequest = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      dispatch(createRequest(values)).then((response) => {
        toast.success(response?.payload?.message);
        formik.resetForm();
      });
    },
    validationSchema: createRequestAllSchema,
  });

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (formik.values.patientEmail) {
      debouncedApiCall(
        formik.values.patientEmail,
        formik.setFieldValue,
        dispatch,
      );
    }
    return () => {
      debouncedApiCall.cancel();
    };
  }, [dispatch, formik.setFieldValue, formik.values.patientEmail]);

  return (
    <>
      <Box sx={{ backgroundColor: "#f6f6f6" }}>
        <Container maxWidth="md" sx={{ padding: "1rem 3rem" }}>
          <Box display="flex" justifyContent="flex-end" mb={2} flexWrap="wrap">
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
          <Paper sx={{ padding: "1.25rem" }}>
            <form onSubmit={formik.handleSubmit}>
              <Typography variant="h5" pb={2}>
                <b>Business Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <Input
                    name="requestorFirstName"
                    label="Your First Name"
                    fullWidth
                    value={formik.values.requestorFirstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.requestorFirstName &&
                      formik.errors.requestorFirstName
                    }
                    error={
                      formik.touched.requestorFirstName &&
                      Boolean(formik.errors.requestorFirstName)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="requestorLastName"
                    label="Your Last Name"
                    fullWidth
                    value={formik.values.requestorLastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.requestorLastName &&
                      formik.errors.requestorLastName
                    }
                    error={
                      formik.touched.requestorLastName &&
                      Boolean(formik.errors.requestorLastName)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <PhoneInput
                    name="requestorPhoneNumber"
                    country={"in"}
                    inputStyle={{ width: "100%", height: "3.438rem" }}
                    value={formik.values.requestorPhoneNumber}
                    onChange={(value) =>
                      formik.setFieldValue("requestorPhoneNumber", value)
                    }
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.requestorPhoneNumber &&
                      formik.errors.requestorPhoneNumber
                    }
                    error={
                      formik.touched.requestorPhoneNumber &&
                      Boolean(formik.errors.requestorPhoneNumber)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="requestorEmail"
                    label="Your Email"
                    fullWidth
                    value={formik.values.requestorEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.requestorEmail &&
                      formik.errors.requestorEmail
                    }
                    error={
                      formik.touched.requestorEmail &&
                      Boolean(formik.errors.requestorEmail)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="relationName"
                    label="Business/Property Name"
                    fullWidth
                    value={formik.values.relationName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.relationName && formik.errors.relationName
                    }
                    error={
                      formik.touched.relationName &&
                      Boolean(formik.errors.relationName)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input label="Case Number (Optional)" fullWidth />
                </Grid>
              </Grid>
              <Typography variant="h5" pb={2} pt={3}>
                <b>Patient Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12}>
                  <Input
                    name="patientNote"
                    label="Enter Brief Details Of Symptoms (Optional)"
                    fullWidth
                    multiline
                    rows={3}
                    value={formik.values.patientNote}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.patientNote && formik.errors.patientNote
                    }
                    error={
                      formik.touched.patientNote &&
                      Boolean(formik.errors.patientNote)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="patientFirstName"
                    label="First Name"
                    fullWidth
                    value={formik.values.patientFirstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.patientFirstName &&
                      formik.errors.patientFirstName
                    }
                    error={
                      formik.touched.patientFirstName &&
                      Boolean(formik.errors.patientFirstName)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="patientLastName"
                    label="Last Name"
                    fullWidth
                    value={formik.values.patientLastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.patientLastName &&
                      formik.errors.patientLastName
                    }
                    error={
                      formik.touched.patientLastName &&
                      Boolean(formik.errors.patientLastName)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="dob"
                    label="Date Of Birth"
                    type="date"
                    fullWidth
                    value={formik.values.dob}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.dob && formik.errors.dob}
                    error={formik.touched.dob && Boolean(formik.errors.dob)}
                  />
                </Grid>
              </Grid>
              <Typography variant="h5" pb={2} pt={3}>
                <b>Patient Contact Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <Input
                    name="patientEmail"
                    label="Email"
                    fullWidth
                    value={formik.values.patientEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.patientEmail && formik.errors.patientEmail
                    }
                    error={
                      formik.touched.patientEmail &&
                      Boolean(formik.errors.patientEmail)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <PhoneInput
                    name="patientPhoneNumber"
                    country={"in"}
                    inputStyle={{ width: "100%", height: "3.438rem" }}
                    value={formik.values.patientPhoneNumber}
                    onChange={(value) =>
                      formik.setFieldValue("patientPhoneNumber", value)
                    }
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.patientPhoneNumber &&
                      formik.touched.patientPhoneNumber
                    }
                    error={
                      formik.touched.patientPhoneNumber &&
                      Boolean(formik.touched.patientPhoneNumber)
                    }
                  />
                </Grid>
              </Grid>
              <Typography variant="h5" pb={2} pt={3}>
                <b>Patient Location</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <Input
                    name="street"
                    label="Street"
                    fullWidth
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
                    value={formik.values.zipCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.zipCode && formik.errors.zipCode}
                    error={
                      formik.touched.zipCode && Boolean(formik.errors.zipCode)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="roomNumber"
                    label="Room # / Suite (Optional)"
                    fullWidth
                    value={formik.values.roomNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.roomNumber && formik.errors.roomNumber
                    }
                    error={
                      formik.touched.roomNumber &&
                      Boolean(formik.errors.roomNumber)
                    }
                  />
                </Grid>
              </Grid>
              <Box
                display="flex"
                justifyContent="flex-end"
                gap={2}
                alignItems="center"
                flexWrap="wrap"
                pt={2}
              >
                <Button name="Submit" type="submit" />
                <Button name="Cancel" variant="outlined" />
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
      <InformationModal open={open} handleClose={handleClose} />
    </>
  );
};

export default BusinessRequest;
