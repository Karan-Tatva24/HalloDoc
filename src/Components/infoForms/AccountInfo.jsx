import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Typography,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Button } from "../Button";
import { Input } from "../TextField/Input";
import { accountInfoSchema } from "../../ValidationSchema";
import { useDispatch } from "react-redux";
import {
  editProviderProfile,
  physicianProfile,
} from "../../redux/halloAPIs/providerInfoAPI";
import { changePassword } from "../../redux/halloAPIs/changePasswordAPI";
import { toast } from "react-toastify";

const INITIAL_VALUES = {
  role: "masterAdmin",
  status: "",
  password: "",
};

const AccountInfo = ({ id, name, userName, status, role, roles }) => {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const [passwordDisable, setPasswordDisable] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);

  const formik = useFormik({
    initialValues,
    validationSchema: accountInfoSchema,
    enableReinitialize: true,
  });

  useEffect(() => {
    setInitialValues({
      role: role?.id,
      status: status,
    });
  }, [role, status]);

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
            type={showPassword ? "text" : "password"}
            fullWidth
            disabled={passwordDisable}
            value={formik.values.password}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            select
            name="status"
            label="Status"
            fullWidth
            disabled={name === "MyProfile" ? true : isDisabled}
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Input>
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            select
            name="role"
            label="Role"
            fullWidth
            disabled={name === "MyProfile" ? true : isDisabled}
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
          >
            {roles?.map((role) => (
              <MenuItem key={role?.id} value={role?.id}>
                {role?.Name}
              </MenuItem>
            ))}
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
                      toast.success(response.payload.message);
                    } else if (
                      response.type === "editProviderProfile/rejected"
                    ) {
                      toast.error(
                        response.payload.data.validation.body.message,
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
          )
        ) : null}
        <Button
          variant="outlined"
          name={passwordDisable ? "Reset Password" : "Change Password"}
          onClick={
            passwordDisable
              ? () => setPasswordDisable(false)
              : () => {
                  dispatch(
                    changePassword({ id, password: formik.values.password }),
                  ).then((response) => {
                    if (response.type === "changePassword/fulfilled") {
                      formik.setFieldValue("password", "");
                      setPasswordDisable(true);
                      toast.success(response.payload.message);
                    } else if (response.type === "changePassword/rejected") {
                      toast.error(
                        response.payload.data.validation.body.message,
                      );
                    }
                  });
                }
          }
        />
        {!passwordDisable && (
          <Button
            name="Cancel"
            variant="outlined"
            onClick={() => {
              formik.setFieldValue("password", "");
              setPasswordDisable(true);
            }}
          />
        )}
      </Box>
    </form>
  );
};

export default AccountInfo;
