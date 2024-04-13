import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  Box,
  Container,
  Grid,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/TextField/Input";
import PhoneInput from "react-phone-input-2";
import { addBusinessSchema } from "../../ValidationSchema";
import "./addBusiness.css";
import { useSelector, useDispatch } from "react-redux";
import { clearBusiness } from "../../redux/halloSlices/adminSlices/partnersSlice";
import { AppRoutes } from "../../constants/routes";
import { toast } from "react-toastify";
import { addBusiness, updateBusiness } from "../../redux/halloAPIs/partnersAPI";

const INITIAL_VALUE = {
  businessName: "",
  profession: "",
  faxNumber: "",
  phoneNumber: "",
  email: "",
  businessContact: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
};

const AddBusiness = () => {
  const [initialValues, setInitialValues] = useState(INITIAL_VALUE);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { professions } = useSelector(
    (state) => state.root.getProfessionsBusiness,
  );
  const { business } = useSelector((state) => state.root.partners);

  const formik = useFormik({
    initialValues,
    validationSchema: addBusinessSchema,
    enableReinitialize: true,
  });

  useEffect(() => {
    setInitialValues({
      businessName: business?.businessName || "",
      profession: business?.profession || "",
      faxNumber: business?.faxNumber || "",
      phoneNumber: business?.phoneNumber || "",
      email: business?.email || "",
      businessContact: business?.businessContact || "",
      street: business?.street || "",
      city: business?.city || "",
      state: business?.state || "",
      zipCode: business?.zipCode || "",
    });
  }, [business]);

  const handleSave = () => {
    if (business?.id) {
      dispatch(updateBusiness({ id: business.id, data: formik.values })).then(
        (response) => {
          if (response.type === "updateBusiness/fulfilled") {
            toast.success(response.payload.message);
            dispatch(clearBusiness());
            navigate(AppRoutes.PARTNERS);
          }
        },
      );
    } else {
      dispatch(addBusiness(formik.values)).then((response) => {
        if (response.type === "addBusiness/fulfilled") {
          toast.success(response.payload.message);
          dispatch(clearBusiness());
          navigate(AppRoutes.PARTNERS);
        }
      });
    }
  };

  return (
    <>
      <Box className="add-business-main-container">
        <Container maxWidth="lg" className="add-business-wrapper-container">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            pt={5}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>{business?.id ? "Update Business" : "Add Business"}</b>
              </Typography>
            </Box>
            <Button
              name="Back"
              variant="outlined"
              size="small"
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => {
                dispatch(clearBusiness());
                navigate(-1);
              }}
              className="back-btn"
            />
          </Box>
          <Paper className="add-business-paper">
            <Typography variant="h5" mb={2}>
              <b>Submit Information</b>
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Business Name"
                    name="businessName"
                    fullWidth
                    value={formik.values.businessName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.businessName &&
                      Boolean(formik.errors.businessName)
                    }
                    helperText={
                      formik.touched.businessName && formik.errors.businessName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Profession"
                    name="profession"
                    select
                    fullWidth
                    value={formik.values.profession}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.profession &&
                      Boolean(formik.errors.profession)
                    }
                    helperText={
                      formik.touched.profession && formik.errors.profession
                    }
                  >
                    {professions?.map((profession, index) => {
                      return (
                        <MenuItem key={index} value={profession.profession}>
                          {profession.profession}
                        </MenuItem>
                      );
                    })}
                  </Input>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Fax Number"
                    name="faxNumber"
                    fullWidth
                    value={formik.values.faxNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.faxNumber &&
                      Boolean(formik.errors.faxNumber)
                    }
                    helperText={
                      formik.touched.faxNumber && formik.errors.faxNumber
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <PhoneInput
                    label="Phone Number"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={(value) =>
                      formik.setFieldValue("phoneNumber", value)
                    }
                    onBlur={formik?.handleBlur}
                    country={"in"}
                    helperText={
                      formik?.touched.phoneNumber && formik?.errors.phoneNumber
                    }
                    error={
                      formik?.touched.phoneNumber &&
                      Boolean(formik?.errors.phoneNumber)
                    }
                    inputStyle={{ width: "100%", height: "3.438rem" }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Email"
                    name="email"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Business Contact"
                    name="businessContact"
                    fullWidth
                    value={formik.values.businessContact}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.businessContact &&
                      Boolean(formik.errors.businessContact)
                    }
                    helperText={
                      formik.touched.businessContact &&
                      formik.errors.businessContact
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Street"
                    name="street"
                    fullWidth
                    value={formik.values.street}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.street && Boolean(formik.errors.street)
                    }
                    helperText={formik.touched.street && formik.errors.street}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label="City"
                    name="city"
                    fullWidth
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label="State"
                    name="state"
                    fullWidth
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Zip/Postal"
                    name="zipCode"
                    fullWidth
                    value={formik.values.zipCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.zipCode && Boolean(formik.errors.zipCode)
                    }
                    helperText={formik.touched.zipCode && formik.errors.zipCode}
                  />
                </Grid>
              </Grid>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                gap={2}
                pt={4}
              >
                <Button name="Save" size="large" onClick={handleSave} />
                <Button
                  name="Cancel"
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    dispatch(clearBusiness());
                    navigate(AppRoutes.PARTNERS);
                  }}
                />
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default AddBusiness;
