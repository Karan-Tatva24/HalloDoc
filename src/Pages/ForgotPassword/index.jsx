import React from "react";
import { Grid, InputAdornment, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { loginHeading, loginHeroImage } from "../../assets/Images";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../constants/routes";
import { Input } from "../../Components/TextField/Input";
import { Button } from "../../Components/Button";
import { forgotPasswordSchema } from "../../ValidationSchema";
import { useDispatch } from "react-redux";
import { forgotPass } from "../../redux/halloSlices/forgotPasswordAPI";
import { toast } from "react-toastify";

const initialValues = {
  email: "",
};

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(forgotPass(values)).then((response) => {
        console.log("Forgot response ", response);
        if (response.type === "forgotPass/fulfilled") {
          toast.success(response?.payload?.message);
        } else {
          toast.error(response?.error?.message);
        }
      });
    },
  });

  return (
    <Grid container spacing={2} height="100%">
      <Grid item xl={6} lg={6} md={6} className="loginHero-image">
        <img src={loginHeroImage} alt="Login Page" width="100%" height="100%" />
      </Grid>
      <div className="dm-btn">
        <Button
          name={<DarkModeOutlinedIcon fontSize="large" />}
          variant="outlined"
          size="large"
        />
      </div>
      <Grid item xl={6} lg={6} md={6} sm={12} xs={12} height="100%">
        <div className="bg-image"></div>
        <div className="right-page">
          <div className="logoHeading">
            <img src={loginHeading} alt="Hallo Doc logo" />
          </div>
          <div className="loginHeading">
            <Typography variant="h4" gutterBottom fontWeight="600">
              Reset Your Password
            </Typography>
          </div>
          <form onSubmit={formik.handleSubmit} className="login-form">
            <Input
              className="form-input"
              name="email"
              id="email"
              label="Username"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.email && formik.errors.email}
              type="text"
              variant="outlined"
              error={formik.touched.email && Boolean(formik.errors.email)}
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
            <Button
              className="btn"
              name="Reset Your Password"
              type="submit"
              fullWidth
              size="large"
            />
          </form>
          <div className="link">
            <ArrowBackIosNewIcon color="#67abb1" />
            <Link to={AppRoutes.LOGIN}>Back To Login</Link>
          </div>
          <div className="footer-links-fp">
            <Link to="#">Terms of Condition</Link>
            <Link to="#">Privacy Policy</Link>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
