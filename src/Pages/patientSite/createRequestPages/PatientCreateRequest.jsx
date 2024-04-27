import {
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "../../../Components/Button";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../Components/TextField/Input";
import { useFormik } from "formik";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import {
  createRequest,
  isEmailFound,
} from "../../../redux/halloAPIs/userAPIs/createRequestAPI";
import { createRequestByPatientSchema } from "../../../ValidationSchema";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../../redux/halloSlices/apiStatusSlice";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const initialValues = {
  requestType: "Patient",
  patientNote: "",
  patientFirstName: "",
  patientLastName: "",
  dob: "",
  patientEmail: "",
  password: "",
  confirmPassword: "",
  isEmail: true,
  patientPhoneNumber: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  roomNumber: "",
  document: null,
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

const PatientCreateRequest = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      dispatch(apiPending());
      const formData = new FormData();
      formData.append("requestType", values.requestType);
      formData.append("patientNote", values.patientNote);
      formData.append("patientFirstName", values.patientFirstName);
      formData.append("patientLastName", values.patientLastName);
      formData.append("dob", values.dob);
      formData.append("patientEmail", values.patientEmail);
      formData.append("patientPhoneNumber", values.patientPhoneNumber);
      formData.append("isEmail", values.isEmail);
      formData.append("street", values.street);
      formData.append("state", values.state);
      formData.append("city", values.city);
      formData.append("zipCode", values.zipCode);
      formData.append("roomNumber", values.roomNumber);
      formData.append("password", values.password);
      formData.append("document", values.document);

      dispatch(createRequest(formData)).then((response) => {
        if (response.type === "createRequest/fulfilled") {
          toast.success(response?.payload?.message);
          formik.resetForm();
          dispatch(apiSuccess());
        } else if (response.type === "createRequest/rejected")
          dispatch(apiFails());
      });
    },
    validationSchema: createRequestByPatientSchema,
  });

  const handleFileChange = (event) => {
    event.preventDefault();
    formik.setFieldValue("document", event.target.files[0]);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
        <Container maxWidth="lg" sx={{ padding: "1rem 3rem" }}>
          <Box display="flex" justifyContent="flex-end" mb={2} flexWrap="wrap">
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
                <b>Patient Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12}>
                  <Input
                    name="patientNote"
                    label="Enter Brief Details Of Symptoms (Optional)"
                    multiline
                    rows={3}
                    fullWidth
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
                  <DatePicker
                    name="dob"
                    label="Date Of Birth"
                    sx={{ width: "100%" }}
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
                    error={
                      formik.touched.patientPhoneNumber &&
                      Boolean(formik.errors.patientPhoneNumber)
                    }
                    helperText={
                      formik.touched.patientPhoneNumber &&
                      formik.errors.patientPhoneNumber
                    }
                  />
                </Grid>
                {!formik.values.isEmail ? (
                  <>
                    <Grid item xs={12} md={6}>
                      <Input
                        name="password"
                        label="New Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
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
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Input
                        name="confirmPassword"
                        label="Confirm Password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={
                          formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
                        }
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        error={
                          formik.touched.confirmPassword &&
                          Boolean(formik.errors.confirmPassword)
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
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
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        * It looks like you are new to our service. Please
                        create password for your account.
                      </Typography>
                    </Grid>
                  </>
                ) : null}
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
              <Typography variant="h5" pb={2} pt={3}>
                <b>(Optional) Upload Photo or Document</b>
              </Typography>
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
                    {formik.values.document !== null
                      ? formik.values.document?.name
                      : "Select File"}
                  </label>
                </Button>

                <Button
                  name="Upload"
                  variant="contained"
                  size="large"
                  startIcon={<CloudUploadOutlinedIcon />}
                  type="submit"
                />
              </Box>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                gap={2}
                pt={2}
              >
                <Button name="Submit" type="submit" />
                <Button
                  name="Cancel"
                  variant="outlined"
                  onClick={() => {
                    navigate(-1);
                    formik.resetForm();
                  }}
                />
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default PatientCreateRequest;
