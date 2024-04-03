import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { Button } from "../Button";
import PhoneInput from "react-phone-input-2";
import { Input } from "../TextField/Input";
import { useFormik } from "formik";
import { administratorInfoSchema } from "../../ValidationSchema";
import {
  adminProfile,
  editAdminProfile,
} from "../../redux/halloAPIs/adminProfileAPI";
import { useDispatch, useSelector } from "react-redux";

const INITIAL_VALUE = {
  firstName: "",
  lastName: "",
  email: "",
  confirmemail: "",
  administratorPhone: "",
};

const AdministratorInfo = ({
  firstName,
  lastName,
  email,
  phone,
  state,
  regions,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUE);
  const { id } = useSelector((state) => state.root.loggedUserData);
  const data = useSelector((state) => state.root.getRegionPhysician);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: administratorInfoSchema,
    onSubmit: (value) => {},
    enableReinitialize: true,
  });

  useEffect(() => {
    setInitialValues({
      firstName: firstName,
      lastName: lastName,
      email: email,
      confirmemail: email,
      administratorPhone: phone,
    });
  }, [email, firstName, lastName, phone]);

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
            name="firstName"
            label="First Name"
            fullWidth
            disabled={isDisabled}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            name="lastName"
            label="Last Name"
            fullWidth
            disabled={isDisabled}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
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
          {data?.regions.map((region) => {
            const isChecked = regions?.some(
              (selectedRegion) => selectedRegion.name === region.name,
            );
            return (
              <FormControlLabel
                className="checkbox-padding"
                disabled={isDisabled}
                key={region.id}
                control={<Checkbox size="small" checked={isChecked} />}
                label={region.name}
              />
            );
          })}
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
                dispatch(
                  editAdminProfile({
                    id,
                    section: "administration",
                    updatedData: formik.values,
                  }),
                ).then((response) => {
                  if (response.type === "editAdminProfile/fulfilled") {
                    dispatch(adminProfile(id));
                  }
                });
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
