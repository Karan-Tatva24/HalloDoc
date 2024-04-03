import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Box, Grid, MenuItem, Typography } from "@mui/material";
import { Button } from "../Button";
import { Input } from "../TextField/Input";
import { AppRoutes } from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import { accountInfoSchema } from "../../ValidationSchema";
import { useDispatch } from "react-redux";
import {
  editProviderProfile,
  physicianProfile,
} from "../../redux/halloAPIs/providerInfoAPI";

const INITIAL_VALUES = {
  role: "masterAdmin",
  status: "",
};

const AccountInfo = ({ id, name, userName, status }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);

  const formik = useFormik({
    initialValues,
    validationSchema: accountInfoSchema,
    enableReinitialize: true,
  });

  useEffect(() => {
    setInitialValues({
      role: "masterAdmin",
      status: status,
    });
  }, [status]);

  return (
    <form>
      <Typography variant="h6">
        <b>Account Information</b>
      </Typography>
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        className="profile-input-container"
      >
        <Grid item xs={12} md={6}>
          <Input
            name="username"
            label="User Name"
            fullWidth
            disabled
            value={userName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            name="password"
            label="Password"
            type="password"
            fullWidth
            disabled
            value=""
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            select
            name="status"
            label="Status"
            fullWidth
            disabled={isDisabled}
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Input>
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            select
            name="role"
            label="Role"
            fullWidth
            disabled={isDisabled}
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
          >
            <MenuItem value="masterAdmin">Master Admin</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="provider">Provider</MenuItem>
            <MenuItem value="patient">Patient</MenuItem>
          </Input>
        </Grid>
      </Grid>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        mt={5}
        mb={2}
        gap={2}
      >
        {name === "EditProvider" ? (
          isDisabled ? (
            <Button name="Edit" onClick={() => setIsDisabled(false)} />
          ) : (
            <>
              <Button
                name="Save"
                type="submit"
                onClick={() => {
                  dispatch(
                    editProviderProfile({ id, data: formik.values }),
                  ).then((response) => {
                    if (response.type === "editProviderProfile/fulfilled") {
                      dispatch(physicianProfile(id));
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
          )
        ) : null}
        <Button
          variant="outlined"
          name="Reset Password"
          onClick={() => navigate(AppRoutes.RESETPASSWORD)}
        />
      </Box>
    </form>
  );
};

export default AccountInfo;
