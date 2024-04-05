import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useFormik } from "formik";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import { physicianInformationSchema } from "../../ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  editProviderProfile,
  physicianProfile,
} from "../../redux/halloAPIs/providerInfoAPI";
import { toast } from "react-toastify";

const INITIAL_VALUE = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  medicalLicense: "",
  NPINumber: "",
  syncEmailAddress: "",
  regions: [],
};

const PhysiciansInformation = ({
  id,
  firstName,
  lastName,
  email,
  phone,
  medicalLicense,
  npiNumber,
  syncEmail,
  regions,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUE);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.root.getRegionPhysician);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {},
    validationSchema: physicianInformationSchema,
    enableReinitialize: true,
  });

  useEffect(() => {
    setInitialValues({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phone,
      medicalLicense: medicalLicense,
      NPINumber: npiNumber,
      syncEmailAddress: syncEmail,
      regions: regions.map((region) => region.id),
    });
  }, [
    email,
    firstName,
    lastName,
    medicalLicense,
    npiNumber,
    phone,
    regions,
    syncEmail,
  ]);

  const handleChangeRegions = (id) => {
    const newRegions = formik.values.regions.includes(id)
      ? formik.values.regions.filter((selectedId) => selectedId !== id)
      : [...formik.values.regions, id];
    formik.setFieldValue("regions", newRegions);
  };

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
          <PhoneInput
            inputStyle={{ height: "55px", width: "100%" }}
            name="phoneNumber"
            country="in"
            label="Phone Number"
            fullWidth="true"
            disabled={isDisabled}
            value={formik.values.phoneNumber}
            onChange={(value) => formik.setFieldValue("phoneNumber", value)}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            name="medicalLicense"
            label="Medical License"
            fullWidth
            disabled={isDisabled}
            value={formik.values.medicalLicense}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.medicalLicense &&
              Boolean(formik.errors.medicalLicense)
            }
            helperText={
              formik.touched.medicalLicense && formik.errors.medicalLicense
            }
          ></Input>
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            name="NPINumber"
            label="NPI Number"
            fullWidth
            disabled={isDisabled}
            value={formik.values.NPINumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.NPINumber && Boolean(formik.errors.NPINumber)}
            helperText={formik.touched.NPINumber && formik.errors.NPINumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            name="syncEmailAddress"
            label="Synchronization Email Address"
            fullWidth
            disabled={isDisabled}
            value={formik.values?.syncEmailAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.syncEmailAddress &&
              Boolean(formik.errors.syncEmailAddress)
            }
            helperText={
              formik.touched.syncEmailAddress && formik.errors.syncEmailAddress
            }
          ></Input>
        </Grid>

        <Grid item xs={12} md={6}>
          {data?.regions.map((region) => {
            return (
              <FormControlLabel
                className="checkbox-padding"
                disabled={isDisabled}
                key={region.id}
                control={
                  <Checkbox
                    size="small"
                    checked={formik.values.regions.includes(region.id)}
                    onChange={() => handleChangeRegions(region.id)}
                  />
                }
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
                dispatch(editProviderProfile({ id, data: formik.values })).then(
                  (response) => {
                    if (response.type === "editProviderProfile/fulfilled") {
                      dispatch(physicianProfile(id));
                      toast.success(response.payload.message);
                    } else if (
                      response.type === "editProviderProfile/rejected"
                    ) {
                      toast.error(response.payload.data?.message);
                    }
                  },
                );
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
