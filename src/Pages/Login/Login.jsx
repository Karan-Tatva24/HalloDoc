import React, { useState } from "react";
import { Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "./login.css";
import { loginHeading, loginHeroImage } from "../../assets/Images";
import { useFormik } from "formik";
import validationSchema from "../../ValidationSchema/loginPage";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../constants/routes";
import { Input } from "../../Components/TextField/Input";
import { Button } from "../../Components/Button/Button";

const initialValues = {
  username: "",
  password: "",
};

const onSubmit = (values) => {
  alert(JSON.stringify(values, null, 2));
};
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
              Login To Your Account
            </Typography>
          </div>
          <form onSubmit={formik.handleSubmit} className="login-form">
            <Input
              className="form-input"
              name="username"
              id="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.username && formik.errors.username}
              type="text"
              variant="outlined"
              error={formik.touched.username && Boolean(formik.errors.username)}
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
              className="form-input"
              name="password"
              id="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.password && formik.errors.password}
              type={showPassword ? "text" : "password"}
              variant="outlined"
              error={formik.touched.password && Boolean(formik.errors.password)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
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
              fullWidth
              margin="normal"
            />
            <Button
              className="btn"
              name="Log In"
              type="submit"
              fullWidth
              size="large"
            />
          </form>
          <div className="link">
            <Link to={AppRoutes.FORGOTPASSWORD} underline="hover">
              Forgot Password?
            </Link>
          </div>
          <div className="footer-links-login">
            <Link to="#">Terms of Conditions</Link>
            <Link to="#">Privacy Policy</Link>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
