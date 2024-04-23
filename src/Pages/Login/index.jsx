import React, { useState } from "react";
import { Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { loginHeading, loginHeroImage } from "../../assets/Images";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/routes";
import { Input } from "../../Components/TextField/Input";
import { Button } from "../../Components/Button";
import { loginSchema } from "../../ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userLogin } from "../../redux/halloAPIs/AuthAPIs/loginAPI";
import { loggedUser } from "../../redux/halloAPIs/adminAPIs/commonAPIs/loggedUserAPI";
import "../../App.css";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading } = useSelector((state) => state.root.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    dispatch(userLogin(values)).then((response) => {
      if (response.type === "userLogin/fulfilled") {
        localStorage.setItem("private_token", response.payload.token);
        toast.success("You are login Successfully");
        dispatch(loggedUser(values?.email));
        navigate(AppRoutes.DASHBOARD);
      } else {
        toast.error("Invalid email or password");
      }
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
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
              name="email"
              label="Username"
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
              className="form-input"
              name="password"
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
            {isLoading && <p>Loading ...</p>}
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
