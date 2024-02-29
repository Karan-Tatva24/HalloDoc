import React, { useState } from "react";
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
import Header from "../../Components/Header";
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

const rows = [
  {
    id: 1,
    document: "Medical Report Test AkStageBus 12-1-19.pdf",
    uploadDate: "2024-02-20",
  },
];

const INITIAL_VALUES = {
  phone: "9182006992",
  email: "qatatva8786@gmail.com",
};

const CloseCase = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [orderBy, setOrderBy] = useState("uploadDate");
  const [order, setOrder] = useState("asc");
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: closeCaseSchema,
    onSubmit: (values) => {
      console.log(values);
    },
    enableReinitialize: true,
  });

  const handleEdit = () => {
    setIsDisabled(false);
  };

  const handleSave = () => {
    setInitialValues(formik.values);
    setIsDisabled(true);
  };

  const handleCancle = () => {
    formik.setValues(initialValues);
    setIsDisabled(true);
  };

  const handleDownload = (document) => {
    console.log(`Downloading ${document}`);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a[orderBy], b[orderBy])
      : (a, b) => -descendingComparator(a[orderBy], b[orderBy]);
  };

  const descendingComparator = (a, b) => {
    if (b < a) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  return (
    <>
      <Header />
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
                  <b className="patient-name">Test AkStageBus</b>
                  (MD101819PRBH0005)
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
                        onClick={() => handleRequestSort("uploadDate")}
                      >
                        Upload Date
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy)).map(
                    (row) => (
                      <TableRow key={row.id} hover>
                        <TableCell>{row.document}</TableCell>
                        <TableCell>{row.uploadDate}</TableCell>
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
                    ),
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" mt={5} mb={3}>
              Patient Information
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <Input label="First Name" value="Test" fullWidth disabled />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input label="Last Name" value="Test" fullWidth disabled />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Date of Birth"
                    type="date"
                    fullWidth
                    disabled
                    value="2000-10-10"
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
                  type="submit"
                  size="large"
                  className="edit-btn"
                  onClick={isDisabled ? handleEdit : handleSave}
                />
                <Button
                  name={isDisabled ? "Close Case" : "Cancle"}
                  variant="outlined"
                  size="large"
                  onClick={
                    isDisabled
                      ? () => console.log("Close Case clicked")
                      : handleCancle
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
