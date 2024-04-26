import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button";
import "./encounterForm.css";
import { useFormik } from "formik";
import { Input } from "../../Components/TextField/Input";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import { encounterFormSchema } from "../../ValidationSchema";
import {
  editEncounterForm,
  finalizeForm,
  getEncounterForm,
  saveEncounterForm,
} from "../../redux/halloAPIs/providerAPIs/dashboardAPIs/encounterAPI";
import { toast } from "react-toastify";
import { clearEncounterForm } from "../../redux/halloSlices/providerSlices/encounterFormSlice";
import { AppRoutes } from "../../constants/routes";
import { apiPending, apiSuccess } from "../../redux/halloSlices/apiStatusSlice";

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  location: "",
  dob: "",
  serviceDate: "",
  email: "",
  phoneNumber: "",
  presentIllnessHistory: "",
  medicalHistory: "",
  medications: "",
  allergies: "",
  temperature: "",
  heartRate: "",
  repositoryRate: "",
  sisBP: "",
  diaBP: "",
  oxygen: "",
  pain: "",
  heent: "",
  cv: "",
  chest: "",
  abd: "",
  extr: "",
  skin: "",
  neuro: "",
  other: "",
  diagnosis: "",
  treatmentPlan: "",
  medicationDispensed: "",
  procedure: "",
  followUp: "",
};

const EncounterForm = () => {
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { encounterFormData } = useSelector(
    (state) => state.root.encounterForm,
  );
  const { accountType } = useSelector((state) => state?.root.loggedUserData);

  const {
    id,
    patientFirstName,
    patientLastName,
    patientEmail,
    street,
    city,
    state,
    zipCode,
    dob,
    patientPhoneNumber,
  } = useSelector((state) => state.root.patientName);

  useEffect(() => {
    dispatch(getEncounterForm(id));
  }, [dispatch, id]);

  const formik = useFormik({
    initialValues,
    validationSchema: encounterFormSchema,
    onSubmit: (values) => {
      dispatch(apiPending());
      if (encounterFormData?.id) {
        dispatch(editEncounterForm({ id, data: values })).then((response) => {
          if (response.type === "editEncounterForm/fulfilled") {
            toast.success(response?.payload?.message);
            navigate(AppRoutes.DASHBOARD);
            dispatch(apiSuccess());
          }
        });
      } else {
        dispatch(saveEncounterForm({ id, data: values })).then((response) => {
          if (response.type === "saveEncounterForm/fulfilled") {
            toast.success(response?.payload?.message);
            dispatch(apiSuccess());
          }
        });
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    setInitialValues({
      firstName: encounterFormData?.firstName || patientFirstName,
      lastName: encounterFormData?.lastName || patientLastName,
      dob: encounterFormData?.dob || dob,
      location:
        encounterFormData?.location ||
        `${street}, ${city}, ${state}, ${zipCode}`,
      serviceDate: encounterFormData?.serviceDate || "",
      email: encounterFormData?.email || patientEmail,
      phoneNumber: encounterFormData?.phoneNumber || patientPhoneNumber,
      presentIllnessHistory: encounterFormData?.presentIllnessHistory || "",
      medicalHistory: encounterFormData?.medicalHistory || "",
      medications: encounterFormData?.medications || "",
      allergies: encounterFormData?.allergies || "",
      temperature: encounterFormData?.temperature || "",
      heartRate: encounterFormData?.heartRate || "",
      repositoryRate: encounterFormData?.repositoryRate || "",
      sisBP: encounterFormData?.sisBP || "",
      diaBP: encounterFormData?.diaBP || "",
      oxygen: encounterFormData?.oxygen || "",
      pain: encounterFormData?.pain || "",
      heent: encounterFormData?.heent || "",
      cv: encounterFormData?.cv || "",
      chest: encounterFormData?.chest || "",
      abd: encounterFormData?.abd || "",
      extr: encounterFormData?.extr || "",
      skin: encounterFormData?.skin || "",
      neuro: encounterFormData?.neuro || "",
      other: encounterFormData?.other || "",
      diagnosis: encounterFormData?.diagnosis || "",
      treatmentPlan: encounterFormData?.treatmentPlan || "",
      medicationDispensed: encounterFormData?.medicationDispensed || "",
      procedure: encounterFormData?.procedure || "",
      followUp: encounterFormData?.followUp || "",
    });
  }, [
    city,
    dob,
    encounterFormData,
    patientEmail,
    patientFirstName,
    patientLastName,
    patientPhoneNumber,
    state,
    street,
    zipCode,
  ]);

  const handleFinalize = () => {
    dispatch(apiPending());
    dispatch(finalizeForm(id)).then((response) => {
      if (response.type === "finalizeForm/fulfilled") {
        toast.success(response?.payload?.message);
        navigate(AppRoutes.DASHBOARD);
        dispatch(apiSuccess());
      }
    });
  };

  return (
    <>
      <Box className="encounter-main-container">
        <Container maxWidth="md" className="encounter-main-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Encounter Form</b>
              </Typography>
            </Box>
            <Button
              name="Back"
              variant="outlined"
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => {
                formik.resetForm();
                navigate(-1);
              }}
            />
          </Box>
          <Paper className="encounter-form-container">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={2}
            >
              <Typography variant="h4" className="encounter-form-header">
                <b>Medical Report Confidential</b>
              </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <Input
                    name="firstName"
                    label="First Name"
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
                    name="lastName"
                    label="Last Name"
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
                <Grid item xs={12}>
                  <Input
                    name="location"
                    label="Location"
                    fullWidth
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.location && formik.errors.location
                    }
                    error={
                      formik.touched.location && Boolean(formik.errors.location)
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
                <Grid item xs={12} md={6}>
                  <Input
                    name="serviceDate"
                    label="Date"
                    type="date"
                    fullWidth
                    value={formik.values.serviceDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.serviceDate && formik.errors.serviceDate
                    }
                    error={
                      formik.touched.serviceDate &&
                      Boolean(formik.errors.serviceDate)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <PhoneInput
                    label="Phone Number"
                    name="phoneNumber"
                    country={"in"}
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
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.email && formik.errors.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="presentIllnessHistory"
                    label="History Of Present Illness Or Injury"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.presentIllnessHistory}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.presentIllnessHistory &&
                      formik.errors.presentIllnessHistory
                    }
                    error={
                      formik.touched.presentIllnessHistory &&
                      Boolean(formik.errors.presentIllnessHistory)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="medicalHistory"
                    label="Medical History"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.medicalHistory}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.medicalHistory &&
                      formik.errors.medicalHistory
                    }
                    error={
                      formik.touched.medicalHistory &&
                      Boolean(formik.errors.medicalHistory)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="medications"
                    label="Medications"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.medications}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.medications && formik.errors.medications
                    }
                    error={
                      formik.touched.medications &&
                      Boolean(formik.errors.medications)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="allergies"
                    label="Allergies"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.allergies}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.allergies && formik.errors.allergies
                    }
                    error={
                      formik.touched.allergies &&
                      Boolean(formik.errors.allergies)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Input
                    name="temperature"
                    label="Temp"
                    fullWidth
                    value={formik.values.temperature}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.temperature && formik.errors.temperature
                    }
                    error={
                      formik.touched.temperature &&
                      Boolean(formik.errors.temperature)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Input
                    name="heartRate"
                    label="HR"
                    fullWidth
                    value={formik.values.heartRate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.heartRate && formik.errors.heartRate
                    }
                    error={
                      formik.touched.heartRate &&
                      Boolean(formik.errors.heartRate)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Input
                    name="repositoryRate"
                    label="RR"
                    fullWidth
                    value={formik.values.repositoryRate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.repositoryRate &&
                      formik.errors.repositoryRate
                    }
                    error={
                      formik.touched.repositoryRate &&
                      Boolean(formik.errors.repositoryRate)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <Input
                    name="sisBP"
                    label="Blood Pressure(Systolic)"
                    fullWidth
                    value={formik.values.sisBP}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.sisBP && formik.errors.sisBP}
                    error={formik.touched.sisBP && Boolean(formik.errors.sisBP)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <Input
                    name="diaBP"
                    label="Blood Pressure(Diastolic)"
                    fullWidth
                    value={formik.values.diaBP}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.diaBP && formik.errors.diaBP}
                    error={formik.touched.diaBP && Boolean(formik.errors.diaBP)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Input
                    name="oxygen"
                    label="O2"
                    fullWidth
                    value={formik.values.oxygen}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.oxygen && formik.errors.oxygen}
                    error={
                      formik.touched.oxygen && Boolean(formik.errors.oxygen)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Input
                    name="pain"
                    label="Pain"
                    fullWidth
                    value={formik.values.pain}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.pain && formik.errors.pain}
                    error={formik.touched.pain && Boolean(formik.errors.pain)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="heent"
                    label="Heent"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.heent}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.heent && formik.errors.heent}
                    error={formik.touched.heent && Boolean(formik.errors.heent)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="cv"
                    label="CV"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.cv}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.cv && formik.errors.cv}
                    error={formik.touched.cv && Boolean(formik.errors.cv)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="chest"
                    label="Chest"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.chest}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.chest && formik.errors.chest}
                    error={formik.touched.chest && Boolean(formik.errors.chest)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="abd"
                    label="ABD"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.abd}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.abd && formik.errors.abd}
                    error={formik.touched.abd && Boolean(formik.errors.abd)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="extr"
                    label="Extr"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.extr}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.extr && formik.errors.extr}
                    error={formik.touched.extr && Boolean(formik.errors.extr)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="skin"
                    label="Skin"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.skin}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.skin && formik.errors.skin}
                    error={formik.touched.skin && Boolean(formik.errors.skin)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="neuro"
                    label="Neuro"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.neuro}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.neuro && formik.errors.neuro}
                    error={formik.touched.neuro && Boolean(formik.errors.neuro)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="other"
                    label="Other"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.other}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.other && formik.errors.other}
                    error={formik.touched.other && Boolean(formik.errors.other)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="diagnosis"
                    label="Diagnosis"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.diagnosis}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.diagnosis && formik.errors.diagnosis
                    }
                    error={
                      formik.touched.diagnosis &&
                      Boolean(formik.errors.diagnosis)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="treatmentPlan"
                    label="Treatment Plan"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.treatmentPlan}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.treatmentPlan &&
                      formik.errors.treatmentPlan
                    }
                    error={
                      formik.touched.treatmentPlan &&
                      Boolean(formik.errors.treatmentPlan)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="medicationDispensed"
                    label="Medication Dispensed"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.medicationDispensed}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.medicationDispensed &&
                      formik.errors.medicationDispensed
                    }
                    error={
                      formik.touched.medicationDispensed &&
                      Boolean(formik.errors.medicationDispensed)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="procedure"
                    label="Procedures"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.procedure}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.procedure && formik.errors.procedure
                    }
                    error={
                      formik.touched.procedure &&
                      Boolean(formik.errors.procedure)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    name="followUp"
                    label="Follow Up"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.followUp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.followUp && formik.errors.followUp
                    }
                    error={
                      formik.touched.followUp && Boolean(formik.errors.followUp)
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
                pt={4}
                pb={1}
              >
                <Button name="Save Changes" type="submit" />
                {accountType === "Physician" ? (
                  <Button
                    name="Finalize"
                    color="secondary"
                    variant="contained"
                    onClick={handleFinalize}
                  />
                ) : null}
                <Button
                  name="Cancel"
                  variant="outlined"
                  onClick={() => {
                    formik.resetForm();
                    dispatch(clearEncounterForm());
                    navigate(AppRoutes.DASHBOARD);
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

export default EncounterForm;
