import React, { useEffect, useState } from "react";
import { Button } from "../Button";
import { Box, Grid, MenuItem, Typography } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { Input } from "../TextField/Input";
import { useFormik } from "formik";
import { addressInfoSchema } from "../../ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  adminProfile,
  editAdminProfile,
} from "../../redux/halloAPIs/adminProfileAPI";

const INITIAL_VALUE = {
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  mailingPhone: "",
};

const AddressInfo = ({ address1, address2, city, state, zip, altPhone }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUE);
  const { id } = useSelector((state) => state.root.loggedUserData);
  const { regions } = useSelector((state) => state.root.getRegionPhysician);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: addressInfoSchema,
    onSubmit: (values) => {},
    enableReinitialize: true,
  });

  useEffect(() => {
    setInitialValues({
      address1,
      address2,
      city,
      state,
      zip,
      mailingPhone: altPhone,
    });
  }, [address1, address2, altPhone, city, state, zip]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h6">
        <b>Mailing & Billing Information</b>
      </Typography>
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        className="profile-input-container"
      >
        <Grid item xs={12} md={6}>
          <Input
            name="address1"
            label="Address 1"
            fullWidth
            disabled={isDisabled}
            value={formik.values.address1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address1 && Boolean(formik.errors.address1)}
            helperText={formik.touched.address1 && formik.errors.address1}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            name="address2"
            label="Address 2"
            fullWidth
            disabled={isDisabled}
            value={formik.values.address2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address2 && Boolean(formik.errors.address2)}
            helperText={formik.touched.address2 && formik.errors.address2}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            name="city"
            label="City"
            fullWidth
            disabled={isDisabled}
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            name="state"
            label="State"
            select
            fullWidth
            disabled={isDisabled}
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
          >
            {regions?.map((region) => (
              <MenuItem key={region.id} value={region.name}>
                {region.name}
              </MenuItem>
            ))}
          </Input>
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            name="zip"
            label="Zip"
            fullWidth
            disabled={isDisabled}
            value={formik.values.zip}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.zip && Boolean(formik.errors.zip)}
            helperText={formik.touched.zip && formik.errors.zip}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PhoneInput
            label="Phone Number"
            name="mailingPhone"
            country={"us"}
            disabled={isDisabled}
            inputStyle={{ width: "100%", height: "3.438rem" }}
            value={formik.values.mailingPhone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.mailingPhone && Boolean(formik.errors.mailingPhone)
            }
            helperText={
              formik.touched.mailingPhone && formik.errors.mailingPhone
            }
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
                dispatch(
                  editAdminProfile({
                    id,
                    section: "billing",
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

export default AddressInfo;
