import React from "react";
import { useFormik } from "formik";
import { Box, Grid, MenuItem, Typography } from "@mui/material";
import { Button } from "../Button";
import { Input } from "../TextField/Input";
import { AppRoutes } from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import { accountInfoSchema } from "../../ValidationSchema";

const initialValues = {
  username: "admin@gmail.com",
  password: "Admin@123",
  status: "active",
  role: "masterAdmin",
};

const AccountInfo = () => {
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
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            name="password"
            label="Password"
            type="password"
            fullWidth
            disabled
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            select
            name="status"
            label="Status"
            fullWidth
            disabled
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
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
          onClick={() => navigate(AppRoutes.FORGOTPASSWORD)}
        />
      </Box>
    </form>
  );
};

export default AccountInfo;
