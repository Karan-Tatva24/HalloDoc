import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Box, Grid, MenuItem, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { orderDetails } from "../../ValidationSchema/ValidationSchema";
import "./order.css";
import Header from "../../Components/Header";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/TextField/Input";
import { AppRoutes } from "../../constants/routes";

const Order = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      selectProfession: "",
      business: "",
      businessContact: "",
      email: "",
      faxNumber: "",
      orderDetail: "",
      refillNumber: "",
    },
    validationSchema: orderDetails,
    onSubmit: (values, onSubmitProps) => {
      console.log("Form Submitted", values);
      onSubmitProps.resetForm();
    },
  });
  return (
    <>
      <Header />
      <Box className="order-main-container">
        <Container maxWidth="lg" className="order-main-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Send Order</b>
              </Typography>
            </Box>
            <Button
              name="Back"
              variant="outlined"
              size="small"
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => navigate(-1)}
              className="back-btn"
            />
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Paper className="order-paper">
              <Grid container spacing={{ xs: 1, md: 2 }} className="divider">
                <Grid item xs={12} md={6}>
                  <Input
                    fullWidth
                    label="Select Profession"
                    select
                    name="selectProfession"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.selectProfession}
                    error={
                      formik.touched.selectProfession &&
                      Boolean(formik.errors.selectProfession)
                    }
                  >
                    <MenuItem value="doctor">Doctor</MenuItem>
                    <MenuItem value="teacher">Teacher</MenuItem>
                    <MenuItem value="govemployee">Goverment employee</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Input>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="business"
                    label="Business"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.business}
                    error={
                      formik.touched.business && Boolean(formik.errors.business)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="businessContact"
                    label="Business Contact"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.businessContact}
                    error={
                      formik.touched.businessContact &&
                      Boolean(formik.errors.businessContact)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="email"
                    label="Email"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="faxNumber"
                    label="Fax Number"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.faxNumber}
                    error={
                      formik.touched.faxNumber &&
                      Boolean(formik.errors.faxNumber)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    name="orderDetail"
                    label="Prescription or Order details"
                    multiline
                    rows={4}
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.orderDetail}
                    error={
                      formik.touched.orderDetail &&
                      Boolean(formik.errors.orderDetail)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="refillNumber"
                    label="Number Of Refill"
                    select
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.refillNumber}
                    error={
                      formik.touched.refillNumber &&
                      Boolean(formik.errors.refillNumber)
                    }
                  >
                    <MenuItem value="notrequired">Not required</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="more">More than two</MenuItem>
                  </Input>
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" gap={2} mt={5}>
                <Button
                  name="Submit"
                  variant="contained"
                  className="order-btn"
                  type="submit"
                />
                <Button
                  name="Cancle"
                  variant="outlined"
                  onClick={() => navigate(AppRoutes.DASHBOARD)}
                />
              </Box>
            </Paper>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Order;
