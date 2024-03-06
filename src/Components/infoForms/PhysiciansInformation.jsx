import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useFormik } from "formik";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import { physicianInformationSchema } from "../../ValidationSchema";

const INITIAL_VALUE = {
  firstname: "1234",
  lastname: "2345",
  email: "test123@mailinator.com",
  phoneNumber: "4565156514",
  medicalLicence: "51351531gvbjkdcbsdhjbjhvbvg",
  npiNumber: "",
  synEmail: "",
};

const PhysiciansInformation = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUE);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log("Form submitted", values);
    },
    validationSchema: physicianInformationSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h6" className="account">
        <b>Physician Information</b>
      </Typography>
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        className="profile-input-container"
      >
        <Grid item xs={12} md={6}>
          <Input
            name="firstname"
            label="First Name"
            fullWidth
            disabled={isDisabled}
            value={formik.values.firstname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            helperText={formik.touched.firstname && formik.errors.firstname}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            name="lastname"
            label="Last Name"
            fullWidth
            disabled={isDisabled}
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            helperText={formik.touched.lastname && formik.errors.lastname}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            name="email"
            label="Email"
            fullWidth
            disabled={isDisabled}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.lastname)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PhoneInput
            inputStyle={{ height: "55px", width: "100%" }}
            name="phoneNumber"
            country="in"
            label="Phone Number"
            fullWidth="true"
            disabled={isDisabled}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmemail && Boolean(formik.errors.phoneNumber)
            }
            helperText={
              formik.touched.phoneNumber && formik.errors.confirmemail
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            name="medicalLicence"
            label="Medical Licence"
            fullWidth
            disabled={isDisabled}
            value={formik.values.medicalLicence}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.medicalLicence &&
              Boolean(formik.errors.medicalLicence)
            }
            helperText={
              formik.touched.medicalLicence && formik.errors.medicalLicence
            }
          ></Input>
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            name="npiNumber"
            label="NPI Number"
            fullWidth
            disabled={isDisabled}
            value={formik.values.npiNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.npiNumber && Boolean(formik.errors.npiNumber)}
            helperText={formik.touched.npiNumber && formik.errors.npiNumber}
          ></Input>
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            name="synEmail"
            label="Synchronization Email Address"
            fullWidth
            disabled={isDisabled}
            value={formik.values.synEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.synEmail && Boolean(formik.errors.synEmail)}
            helperText={formik.touched.synEmail && formik.errors.synEmail}
          ></Input>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControlLabel
            className="checkbox-padding"
            control={<Checkbox size="small" />}
            label="District Of Columbia"
          />
          <FormControlLabel
            className="checkbox-padding"
            control={<Checkbox size="small" />}
            label="New York"
          />
          <FormControlLabel
            className="checkbox-padding"
            control={<Checkbox size="small" />}
            label="Virginia"
          />
          <FormControlLabel
            className="checkbox-padding"
            control={<Checkbox size="small" />}
            label="Maryland"
          />
        </Grid>
      </Grid>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        gap={2}
        mt={5}
        mb={2}
      >
        {isDisabled ? (
          <Button name="Edit" onClick={() => setIsDisabled(false)} />
        ) : (
          <>
            <Button
              name="Save"
              type="submit"
              onClick={() => {
                setInitialValues(formik.values);
                setIsDisabled(true);
              }}
            />
            <Button
              name="Cancel"
              variant="outlined"
              onClick={() => {
                formik.setValues(initialValues);
                setIsDisabled(true);
              }}
            />
          </>
        )}
      </Box>
    </form>
  );
};

export default PhysiciansInformation;
