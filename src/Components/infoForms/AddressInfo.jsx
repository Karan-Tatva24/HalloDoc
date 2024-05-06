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
} from "../../redux/halloAPIs/adminAPIs/profileAPIs/adminProfileAPI";
import {
  editProviderProfile,
  physicianProfile,
} from "../../redux/halloAPIs/adminAPIs/providerAPIs/providerInfoAPI";
import { toast } from "react-toastify";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";

const INITIAL_VALUE = {
  address1: "",
  address2: "",
  city: "",
  state: "",
  zipCode: "",
  altPhone: "",
};

const AddressInfo = ({
  index,
  name,
  address1,
  address2,
  city,
  state,
  zipCode,
  altPhone,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUE);
  const { id } = useSelector((state) => state.root.loggedUserData);
  const { regions } = useSelector((state) => state.root.getRegionPhysician);
  const { accountType } = useSelector((state) => state.root.loggedUserData);
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
      zipCode,
      altPhone,
    });
  }, [address1, address2, altPhone, city, state, zipCode]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h6" pb={2} pt={3}>
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
              <MenuItem key={region?.id} value={region?.name}>
                {region?.name}
              </MenuItem>
            ))}
          </Input>
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            name="zipCode"
            label="zipCode"
            fullWidth
            disabled={isDisabled}
            value={formik.values.zipCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
            helperText={formik.touched.zipCode && formik.errors.zipCode}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PhoneInput
            label="Phone Number"
            name="altPhone"
            country={"us"}
            disabled={isDisabled}
            inputStyle={{ width: "100%", height: "3.438rem" }}
            value={formik.values.altPhone}
            onChange={(value) => formik.setFieldValue("altPhone", value)}
            onBlur={formik.handleBlur}
            error={formik.touched.altPhone && Boolean(formik.errors.altPhone)}
            helperText={formik.touched.altPhone && formik.errors.altPhone}
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
        {accountType === "Admin" ? (
          isDisabled ? (
            <Button name="Edit" onClick={() => setIsDisabled(false)} />
          ) : (
            <>
              <Button
                name="Save"
                type="submit"
                onClick={() => {
                  if (name === "EditProvider") {
                    dispatch(apiPending());
                    dispatch(
                      editProviderProfile({ id: index, data: formik.values }),
                    ).then((response) => {
                      if (response.type === "editProviderProfile/fulfilled") {
                        dispatch(physicianProfile(index));
                        dispatch(apiSuccess());
                        toast.success(response.payload.message);
                      } else if (
                        response.type === "editProviderProfile/rejected"
                      ) {
                        dispatch(apiFails());
                        toast.error(
                          response.payload?.data?.validation?.body?.message,
                        );
                      }
                    });
                  }

                  if (name === "MyProfile") {
                    dispatch(apiPending());
                    dispatch(
                      editAdminProfile({
                        id,
                        section: "billing",
                        updatedData: formik.values,
                      }),
                    ).then((response) => {
                      if (response.type === "editAdminProfile/fulfilled") {
                        dispatch(adminProfile(id));
                        dispatch(apiSuccess());
                        toast.success(response.payload.message);
                      } else if (
                        response.type === "editAdminProfile/rejected"
                      ) {
                        dispatch(apiFails());
                        toast.error(
                          response.payload?.data?.validation?.body?.message,
                        );
                      }
                    });
                  }
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
          )
        ) : null}
      </Box>
    </form>
  );
};

export default AddressInfo;
