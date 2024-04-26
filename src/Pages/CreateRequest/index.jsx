import React, { useEffect } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Button } from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import "./createRequest.css";
import { Input } from "../../Components/TextField/Input";
import PhoneInput from "react-phone-input-2";
import { useFormik } from "formik";
import { createRequestSchema } from "../../ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  createRequestByAdminProvider,
  isEmailFound,
} from "../../redux/halloAPIs/userAPIs/createRequestAPI";
import { dashboardCount } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/dashboardCountAPI";
import { AppRoutes } from "../../constants/routes";
import { verifyState } from "../../redux/halloAPIs/adminAPIs/commonAPIs/verifyStateAPI";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";

const initialValues = {
  isEmail: true,
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  dob: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  room: "",
  adminNotes: "",
};

const debouncedApiCall = debounce(async (email, setFieldValue, dispatch) => {
  try {
    const response = await dispatch(isEmailFound({ patientEmail: email }));
    if (response.type === "isEmailFound/fulfilled") {
      setFieldValue("isEmail", response.payload?.data);
    }
  } catch (error) {
    console.error("Failed to check email:", error);
  }
}, 1000);

const CreateRequest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accountType } = useSelector((state) => state.root.loggedUserData);
  const formik = useFormik({
    initialValues,
    onSubmit: (values, onSubmitProps) => {
      dispatch(apiPending());
      dispatch(verifyState(values.state)).then((response) => {
        if (response.type === "verifyState/fulfilled") {
          dispatch(
            createRequestByAdminProvider({
              isEmail: values.isEmail,
              patientFirstName: values.firstName,
              patientLastName: values.lastName,
              patientEmail: values.email,
              patientPhoneNumber: values.phoneNumber,
              street: values.street,
              city: values.city,
              state: values.state,
              zipCode: values.zipCode,
              dob: values.dob,
              roomNumber: values.room,
              patientNote: values.adminNotes,
              requestType: accountType,
            }),
          ).then((response) => {
            if (response.type === "createRequestByAdminProvider/fulfilled") {
              dispatch(dashboardCount());
              toast.success(response.payload.message);
              navigate(AppRoutes.DASHBOARD);
              dispatch(apiSuccess());
            }
          });
          onSubmitProps.resetForm();
        } else {
          toast.error(response.payload.data.validation.body.message);
          formik.setErrors({
            state: response.payload?.data.message,
          });
          dispatch(apiFails());
        }
      });
    },
    validationSchema: createRequestSchema,
  });

  useEffect(() => {
    if (formik.values.email) {
      debouncedApiCall(formik.values.email, formik.setFieldValue, dispatch);
    }
    return () => {
      debouncedApiCall.cancel();
    };
  }, [dispatch, formik.setFieldValue, formik.values.email]);

  return (
    <>
      <Box className="create-request-main-container">
        <Container maxWidth="lg" className="create-request-wrapper-container">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
            pt={4}
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Submit Information</b>
              </Typography>
            </Box>
            <Button
              name="Back"
              variant="outlined"
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => navigate(-1)}
            />
          </Box>
          <Paper className="create-request-paper">
            <form onSubmit={formik.handleSubmit}>
              <Typography variant="h6" pb={3}>
                <b>Patient</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <Input
                    label="First Name"
                    name="firstName"
                    fullWidth
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
                    label="Last Name"
                    name="lastName"
                    fullWidth
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
                  <PhoneInput
                    label="Phone Number"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={(value) =>
                      formik.setFieldValue("phoneNumber", value)
                    }
                    onBlur={formik?.handleBlur}
                    country={"in"}
                    helperText={
                      formik?.touched.phoneNumber && formik?.errors.phoneNumber
                    }
                    error={
                      formik?.touched.phoneNumber &&
                      Boolean(formik?.errors.phoneNumber)
                    }
                    inputStyle={{ width: "100%", height: "3.438rem" }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Email"
                    name="email"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.email && formik.errors.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Date of Birth"
                    name="dob"
                    fullWidth
                    type="date"
                    value={formik.values.dob}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.dob && formik.errors.dob}
                    error={formik.touched.dob && Boolean(formik.errors.dob)}
                  />
                </Grid>
              </Grid>
              <Typography variant="h6" pt={3} pb={3}>
                <b>Location</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Street"
                    name="street"
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
                    label="City"
                    name="city"
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
                    label="State"
                    name="state"
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
                    label="Zip Code"
                    name="zipCode"
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
                    label="#Room"
                    name="room"
                    fullWidth
                    value={formik.values.room}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.room && formik.errors.room}
                    error={formik.touched.room && Boolean(formik.errors.room)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    gap={2}
                    alignItems="center"
                  >
                    <Button
                      name="verify"
                      variant="outlined"
                      size="large"
                      onClick={() => {
                        dispatch(verifyState(formik.values.state)).then(
                          (response) => {
                            if (response.type === "verifyState/fulfilled") {
                              toast.success(response.payload?.message);
                            } else {
                              formik.setErrors({
                                state: response.payload?.data.message,
                              });
                            }
                          },
                        );
                      }}
                    />
                    <Button
                      name="Map"
                      variant="outlined"
                      startIcon={<LocationOnOutlinedIcon />}
                      size="large"
                    />
                  </Box>
                </Grid>
              </Grid>
              <Typography variant="h6" pt={3} pb={3}>
                <b>Notes</b>
              </Typography>
              <Input
                label={
                  accountType === "Admin"
                    ? "Admin Notes (optional)"
                    : "Physician Notes (Optional)"
                }
                name="adminNotes"
                multiline
                rows={3}
                fullWidth
                value={formik.values.adminNotes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.adminNotes && formik.errors.adminNotes
                }
                error={
                  formik.touched.adminNotes && Boolean(formik.errors.adminNotes)
                }
              />
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                gap={2}
                mt={4}
              >
                <Button name="Save" type="submit" />
                <Button
                  name="Cancel"
                  variant="outlined"
                  type="reset"
                  onClick={() => navigate(-1)}
                />
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default CreateRequest;
