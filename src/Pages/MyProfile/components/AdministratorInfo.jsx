import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { Button } from "../../../Components/Button";
import PhoneInput from "react-phone-input-2";
import { Input } from "../../../Components/TextField/Input";
import { useFormik } from "formik";
import { administratorInfoSchema } from "../../../ValidationSchema";

const INITIAL_VALUE = {
  firstname: "Test",
  lastname: "test",
  email: "test@gmail.com",
  confirmemail: "test@gmail.com",
  administratorPhone: "7435002910",
};

const AdministratorInfo = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUE);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: administratorInfoSchema,
    onSubmit: (value) => {
      console.log("Account Values", value);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h6">
        <b>Administrator Information</b>
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
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            name="confirmemail"
            label="Confirm Email"
            fullWidth
            disabled={isDisabled}
            value={formik.values.confirmemail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmemail && Boolean(formik.errors.confirmemail)
            }
            helperText={
              formik.touched.confirmemail && formik.errors.confirmemail
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PhoneInput
            label="Phone Number"
            name="administratorPhone"
            country={"in"}
            disabled={isDisabled}
            inputStyle={{ width: "100%", height: "3.438rem" }}
            value={formik.values.administratorPhone}
            onChange={formik.handleChange}
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
          <FormControlLabel
            className="checkbox-padding"
            control={<Checkbox size="small" />}
            label="District Of Colombia"
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
          <Button
            name="Edit"
            className="profile-btn"
            onClick={() => setIsDisabled(false)}
          />
        ) : (
          <>
            <Button
              name="Save"
              type="submit"
              className="profile-btn"
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

export default AdministratorInfo;
