import React, { useEffect } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Button } from "../../../Components/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Input } from "../../../Components/TextField/Input";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import {
  createRequestByAdminProvider,
  isEmailFound,
} from "../../../redux/halloAPIs/userAPIs/createRequestAPI";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import { submitInformationSchema } from "../../../ValidationSchema";

const initialValues = {
  relationName: "",
  patientFirstName: "",
  patientLastName: "",
  patientEmail: "",
  patientPhoneNumber: "",
  isEmail: false,
  dob: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  roomNumber: "",
  patientNote: "",
  document: null,
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

const SubmitInformation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { requestType } = useSelector((state) => state.root.common);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("requestType", requestType);
      formData.append("relationName", values.relationName);
      formData.append("patientNote", values.patientNote);
      formData.append("patientFirstName", values.patientFirstName);
      formData.append("patientLastName", values.patientLastName);
      formData.append("patientPhoneNumber", values.patientPhoneNumber);
      formData.append("patientEmail", values.patientEmail);
      formData.append("dob", values.dob);
      formData.append("street", values.street);
      formData.append("city", values.city);
      formData.append("state", values.state);
      formData.append("zipCode", values.zipCode);
      formData.append("roomNumber", values.roomNumber);
      formData.append("document", values.document);
      formData.append("isEmail", values.isEmail);

      dispatch(createRequestByAdminProvider(formData)).then((response) => {
        if (response.type === "createRequestByAdminProvider/fulfilled") {
          toast.success(response?.payload?.message);
          formik.resetForm();
          navigate(-1);
        }
      });
    },
    validationSchema: submitInformationSchema,
  });

  const handleFileChange = (event) => {
    event.preventDefault();
    formik.setFieldValue("document", event.target.files[0]);
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
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Typography variant="h5" gutterBottom>
              <b>Submit Information</b>
            </Typography>
            <Button
              name="Back"
              variant="outlined"
              size="small"
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
              {requestType === "Patient" ? null : (
                <>
                  <Typography variant="h5" pb={2} pt={3}>
                    <b>Relation</b>
                  </Typography>
                  <Grid container spacing={{ xs: 1, md: 2 }}>
                    <Grid item xs={12} md={6}>
                      <Input
                        name="relationName"
                        label="Relation with Patient (Optional)"
                        fullWidth
                        value={formik.values.relationName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={
                          formik.touched.relationName &&
                          formik.errors.relationName
                        }
                        error={
                          formik.touched.relationName &&
                          Boolean(formik.errors.relationName)
                        }
                      />
                    </Grid>
                  </Grid>
                </>
              )}
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
    </>
  );
};

export default SubmitInformation;
