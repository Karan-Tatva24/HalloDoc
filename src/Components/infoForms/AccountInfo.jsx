import React from "react";
import { useFormik } from "formik";
import { Box, Grid, MenuItem, Typography } from "@mui/material";
import { Button } from "../Button";
import { Input } from "../TextField/Input";
import { AppRoutes } from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import { accountInfoSchema } from "../../ValidationSchema";

const initialValues = {
  role: "masterAdmin",
};

const AccountInfo = ({ userName, status }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema: accountInfoSchema,
  });
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
            disabled
            value={status}
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
            disabled
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
      >
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
