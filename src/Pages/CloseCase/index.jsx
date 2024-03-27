import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { Button } from "../../Components/Button";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import "./closecase.css";
import { Input } from "../../Components/TextField/Input";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { closeCaseSchema } from "../../ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCase,
  closeCaseEdit,
  closeCaseView,
} from "../../redux/halloAPIs/closeCaseAPI";

const INITIAL_VALUES = {
  phone: "",
  email: "",
};

const CloseCase = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [orderBy, setOrderBy] = useState("createdAt");
  const [order, setOrder] = useState("asc");
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const { id } = useSelector((state) => state.root.patientName);
  const { closeCaseData } = useSelector((state) => state.root.closeCase);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: closeCaseSchema,
    onSubmit: (values) => {
      console.log(values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    setInitialValues({
      phone: closeCaseData.patientPhoneNumber,
      email: closeCaseData.patientEmail,
    });
  }, [closeCaseData.patientEmail, closeCaseData.patientPhoneNumber]);

  const handleEdit = () => {
    setIsDisabled(false);
  };

  const handleSave = () => {
    setInitialValues(formik.values);
    setIsDisabled(true);
    dispatch(
      closeCaseEdit({
        id,
        patientPhoneNumber: formik.values.phone,
        patientEmail: formik.values.email,
      }),
    );
  };

  const handleCancel = () => {
    formik.setValues(initialValues);
    setIsDisabled(true);
  };

  const handleDownload = (document) => {
    console.log(`Downloading ${document}`);
  };

  useEffect(() => {
    dispatch(
      closeCaseView({ id, sortBy: orderBy, orderBy: order.toUpperCase() }),
    );
  }, [dispatch, id, order, orderBy]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  return (
    <>
      <Box className="closecase-main-container">
        <Container maxWidth="lg" className="closecase-main-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Close Case</b>
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
          <Paper className="closecase-container">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
            >
              <Box>
                <Typography variant="caption">Patient Name</Typography>
                <Typography variant="h6">
                  <b className="patient-name">
                    {closeCaseData.patientFirstName}
                    {closeCaseData.patientLastName}
                  </b>
                  ({closeCaseData.confirmationNumber})
                </Typography>
              </Box>
              <Button
                variant="outlined"
                name="Create Invoice Through Quickbooks"
                size="large"
              />
            </Box>
            <Typography variant="h6" gutterBottom mt={4}>
              <b>Documents</b>
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead style={{ backgroundColor: "#f6f6f6" }}>
                  <TableRow>
                    <TableCell className="document-cl"></TableCell>
                    <TableCell className="date-cl">
                      <TableSortLabel
                        active={orderBy === "uploadDate"}
                        direction={order}
                        onClick={() => handleRequestSort("createdAt")}
                      >
                        Upload Date
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {closeCaseData?.requestWiseFiles?.map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{row.fileName}</TableCell>
                      <TableCell>{row.createdAt}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => handleDownload(row.document)}
                          size="large"
                          className="icon-btn"
                        >
                          <CloudDownloadOutlinedIcon size="large" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" mt={5} mb={3}>
              Patient Information
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <Input
                    label="First Name"
                    value={closeCaseData.patientFirstName}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Last Name"
                    value={closeCaseData.patientLastName}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Date of Birth"
                    type="date"
                    fullWidth
                    disabled
                    value={closeCaseData.dob}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarMonthOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={10} md={5}>
                  <Input
                    label="Phone Number"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SmartphoneOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    disabled={isDisabled}
                  />
                </Grid>
                <Grid item xs={2} md={1}>
                  <Button variant="outlined" size="large" className="form-btn">
                    <PhoneOutlinedIcon />
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isDisabled}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                gap={2}
                mt={2}
              >
                <Button
                  name={isDisabled ? "Edit" : "Save"}
                  type={isDisabled ? "button" : "submit"}
                  size="large"
                  onClick={isDisabled ? handleEdit : handleSave}
                />
                <Button
                  name={isDisabled ? "Close Case" : "Cancel"}
                  variant="outlined"
                  size="large"
                  onClick={
                    isDisabled
                      ? () => {
                          dispatch(closeCase(id));
                          navigate(-1);
                        }
                      : handleCancel
                  }
                />
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default CloseCase;
