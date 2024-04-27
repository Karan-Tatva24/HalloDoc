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
} from "../../redux/halloAPIs/adminAPIs/profileAPIs/adminProfileAPI";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";

const INITIAL_VALUE = {
  firstName: "",
  lastName: "",
  email: "",
  confirmEmail: "",
  administratorPhone: "",
  regions: [],
};

const AdministratorInfo = ({ firstName, lastName, email, phone, regions }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUE);
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
      confirmEmail: email,
      administratorPhone: phone,
      regions: regions?.map((region) => region?.id),
    });
  }, [email, firstName, lastName, phone, regions]);

  const handleChangeRegions = (id) => {
    const newRegions = formik.values.regions?.includes(id)
      ? formik.values.regions?.filter((selectedId) => selectedId !== id)
      : [...formik.values.regions, id];
    formik.setFieldValue("regions", newRegions);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h6" pb={2} pt={3}>
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
            name="confirmEmail"
            label="Confirm Email"
            fullWidth
            disabled={isDisabled}
            value={formik.values.confirmEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmEmail && Boolean(formik.errors.confirmEmail)
            }
            helperText={
              formik.touched.confirmEmail && formik.errors.confirmEmail
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
            onChange={(value) =>
              formik.setFieldValue("administratorPhone", value)
            }
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
          {data?.regions?.map((region) => {
            return (
              <FormControlLabel
                className="checkbox-padding"
                disabled={isDisabled}
                key={region?.id}
                control={
                  <Checkbox
                    size="small"
                    checked={formik.values.regions?.includes(region?.id)}
                    onChange={() => handleChangeRegions(region?.id)}
                  />
                }
                label={region?.name}
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
                dispatch(apiPending());
                dispatch(
                  editAdminProfile({
                    section: "administration",
                    updatedData: formik.values,
                  }),
                ).then((response) => {
                  if (response.type === "editAdminProfile/fulfilled") {
                    dispatch(adminProfile());
                    dispatch(apiSuccess());
                    toast.success(response.payload.message);
                  } else if (response.type === "editAdminProfile/rejected") {
                    dispatch(apiFails());
                    toast.error(
                      response.payload?.data?.validation?.body?.message,
                    );
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
