import React, { useState } from "react";
import { Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { loginHeading, loginHeroImage } from "../../assets/Images";
import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Input } from "../../Components/TextField/Input";
import { Button } from "../../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetPassword } from "../../redux/halloAPIs/AuthAPIs/resetPassAPI";
import { resetPasswordSchema } from "../../ValidationSchema/resetPasswordSchema";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";

const initialValues = {
  newPassword: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const { isLoading } = useSelector((state) => state.root.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const onSubmit = (values) => {
    dispatch(apiPending());
    dispatch(resetPassword({ values, token })).then((response) => {
      if (response.type === "resetPassword/fulfilled") {
        toast.success("You are Reset Password Successfully");
        navigate(-1);
        dispatch(apiSuccess());
      } else {
        toast.error(response?.error?.message);
        dispatch(apiFails());
      }
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: resetPasswordSchema,
    onSubmit,
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
    <Grid container spacing={2} height="100%">
      <Grid item xl={6} lg={6} md={6} className="loginHero-image">
        <img src={loginHeroImage} alt="Login Page" width="100%" height="100%" />
      </Grid>
      <Grid
        item
        xl={6}
        lg={6}
        md={6}
        sm={12}
        xs={12}
        height="100%"
        className="login-grid"
      >
        <div className="bg-image"></div>
        <div className="right-page">
          <div className="logoHeading">
            <img src={loginHeading} alt="Hallo Doc logo" />
          </div>
          <div className="loginHeading">
            <Typography variant="h4" gutterBottom fontWeight="600">
              Set Your New Password
            </Typography>
          </div>
          <form onSubmit={formik.handleSubmit} className="login-form">
            <Input
              className="form-input"
              name="newPassword"
              label="New Password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              type={showPassword.newPassword ? "text" : "password"}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword("newPassword")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword.newPassword ? (
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
              className="form-input"
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
            <Button
              className="btn"
              name="Reset Password"
              type="submit"
              fullWidth
              size="large"
            />
            {isLoading && <p>Loading ...</p>}
          </form>
          <div className="footer-links-login">
            <Link to="#">Terms of Conditions</Link>
            <Link to="#">Privacy Policy</Link>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
