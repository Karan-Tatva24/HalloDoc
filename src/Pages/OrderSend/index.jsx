import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Box, Grid, MenuItem, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { orderDetails } from "../../ValidationSchema";
import "./order.css";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/TextField/Input";
import { AppRoutes } from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness } from "../../redux/halloAPIs/adminAPIs/partnerAPIs/getProfessionsBusinessAPI";
import {
  sendOrder,
  viewSendOrder,
} from "../../redux/halloAPIs/adminAPIs/partnerAPIs/sendOrderAPI";
import { toast } from "react-toastify";
import { clearOrder } from "../../redux/halloSlices/adminSlices/sendOrderSlice";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";

const Order = () => {
  const navigate = useNavigate();
  const [businessId, setBusinessId] = useState(-1);
  const { professions, businesses } = useSelector(
    (state) => state.root.getProfessionsBusiness,
  );
  const { order } = useSelector((state) => state.root.sendOrder);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      selectProfession: "",
      business: "",
      orderDetail: "",
      refillNumber: "",
    },
    validationSchema: orderDetails,
    onSubmit: (values, onSubmitProps) => {
      dispatch(apiPending());
      dispatch(
        sendOrder({
          id: businessId,
          prescription: values.orderDetail,
          noOfRefill: values.refillNumber,
        }),
      ).then((response) => {
        if (response.type === "sendOrder/fulfilled") {
          onSubmitProps.resetForm();
          navigate(AppRoutes.DASHBOARD);
          dispatch(apiSuccess());
          toast.success(response.payload.message);
        } else if (response.type === "sendOrder/rejected") {
          dispatch(apiFails());
          toast.error(response.payload.data.validation.body.message);
        }
      });
    },
  });

  return (
    <>
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
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => {
                dispatch(clearOrder());
                navigate(-1);
              }}
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
                    helperText={
                      formik.touched.selectProfession &&
                      formik.errors.selectProfession
                    }
                  >
                    {professions?.map((profession) => {
                      return (
                        <MenuItem
                          key={profession?.id}
                          value={profession?.id}
                          onClick={() => dispatch(getBusiness(profession?.id))}
                        >
                          {profession?.name}
                        </MenuItem>
                      );
                    })}
                  </Input>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="business"
                    label="Business"
                    select
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.business}
                    error={
                      formik.touched.business && Boolean(formik.errors.business)
                    }
                    helperText={
                      formik.touched.business && formik.errors.business
                    }
                  >
                    {businesses &&
                      businesses?.map((business) => {
                        return (
                          <MenuItem
                            key={business?.id}
                            value={business?.businessName}
                            onClick={() => {
                              setBusinessId(business?.id);
                              dispatch(viewSendOrder(business?.id));
                            }}
                          >
                            {business?.businessName}
                          </MenuItem>
                        );
                      })}
                  </Input>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="businessContact"
                    label="Business Contact"
                    fullWidth
                    disabled
                    value={order?.businessContact}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="email"
                    label="Email"
                    fullWidth
                    disabled
                    value={order?.email}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="faxNumber"
                    label="Fax Number"
                    fullWidth
                    disabled
                    value={order?.faxNumber}
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
                    helperText={
                      formik.touched.orderDetail && formik.errors.orderDetail
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
                    helperText={
                      formik.touched.refillNumber && formik.errors.refillNumber
                    }
                  >
                    <MenuItem value="0">Not required</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value=">2">More than two</MenuItem>
                  </Input>
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" gap={2} mt={5}>
                <Button name="Submit" variant="contained" type="submit" />
                <Button
                  name="Cancel"
                  variant="outlined"
                  onClick={() => {
                    dispatch(clearOrder());
                    navigate(AppRoutes.DASHBOARD);
                  }}
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
