import React from "react";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { loginHeading } from "../../../assets/Images";
import { Input } from "../../../Components/TextField/Input";
import { useFormik } from "formik/dist";
import { useState } from "react";
import { Button } from "../../../Components/Button";
import { Link, useNavigate } from "react-router-dom/dist";
import { useDispatch } from "react-redux";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../../redux/halloSlices/apiStatusSlice";
import { createPatientAccount } from "../../../redux/halloAPIs/userAPIs/createPatientAccountAPI";
import { toast } from "react-toastify";
import { AppRoutes } from "../../../constants/routes";
import { signUpPageSchema } from "../../../ValidationSchema";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      dispatch(apiPending());
      dispatch(createPatientAccount(values)).then((response) => {
        if (response.type === "createPatientAccount/fulfilled") {
          dispatch(apiSuccess());
          navigate(AppRoutes.LOGIN);
          toast.success(response?.payload?.message);
        } else if (response.type === "createPatientAccount/rejected") {
          dispatch(apiFails());
          toast.error("You are failed to create account");
        }
      });
    },
    validationSchema: signUpPageSchema,
  });

  const handleClickShowPassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        minHeight="100%"
      >
        <Box>
          <img src={loginHeading} alt="header logo" />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          maxWidth={500}
        >
          <Typography variant="h4" pb={5}>
            <b>Create Account</b>
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Input
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.email && formik.errors.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              type="text"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircleOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
              margin="normal"
            />
            <Input
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.password && formik.errors.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              type={showPassword.password ? "text" : "password"}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword("password")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword.password ? (
                        <VisibilityOffOutlinedIcon />
                      ) : (
                        <VisibilityOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              margin="normal"
            />
            <Input
              name="confirmPassword"
              label="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              type={showPassword.confirmPassword ? "text" : "password"}
              variant="outlined"
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword("confirmPassword")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword.confirmPassword ? (
                        <VisibilityOffOutlinedIcon />
                      ) : (
                        <VisibilityOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              margin="normal"
            />
            <Box pt={2}>
              <Button name="Create" type="submit" size="large" fullWidth />
            </Box>
          </form>
        </Box>
        <Box className="footer-links-login">
          <Link to="#">Terms of Conditions</Link>
          <Link to="#">Privacy Policy</Link>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
