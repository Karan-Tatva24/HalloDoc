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
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import "./closeCase.css";
import { Input } from "../../Components/TextField/Input";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { closeCaseSchema } from "../../ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCase,
  closeCaseEdit,
  closeCaseView,
} from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/closeCaseAPI";
import { toast } from "react-toastify";
import { downloadFile } from "../../redux/halloAPIs/adminAPIs/commonAPIs/downloadFileAPI";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const INITIAL_VALUES = {
  phone: "",
  email: "",
};

const CloseCase = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [orderBy, setOrderBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const { id } = useSelector((state) => state.root.patientName);
  const { closeCaseData } = useSelector((state) => state.root.closeCase);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: closeCaseSchema,
    onSubmit: (values) => {},
    enableReinitialize: true,
  });

  useEffect(() => {
    setInitialValues({
      phone: closeCaseData?.patientPhoneNumber,
      email: closeCaseData?.patientEmail,
    });
  }, [closeCaseData]);

  const handleEdit = () => {
    setIsDisabled(false);
  };

  const handleSave = () => {
    setInitialValues(formik.values);
    setIsDisabled(true);
    dispatch(apiPending());
    dispatch(
      closeCaseEdit({
        id,
        patientPhoneNumber: formik.values.phone,
        patientEmail: formik.values.email,
      }),
    ).then((response) => {
      if (response.type === "closeCaseEdit/fulfilled") {
        dispatch(apiSuccess());
        toast.success(response.payload.message);
      } else if (response.type === "closeCaseEdit/rejected") {
        dispatch(apiFails());
        toast.error(response.payload.data.validation.body.message);
      }
    });
  };

  const handleCancel = () => {
    formik.setValues(initialValues);
    setIsDisabled(true);
  };

  const handleDownload = (fileName) => {
    dispatch(apiPending());
    dispatch(downloadFile({ fileNames: [fileName] }))
      .then((response) => {
        if (response.type === "downloadFile/fulfilled") {
          const blob = new Blob([response.payload], {
            type: "application/zip",
          });

          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, `${fileName}.zip`);
          } else {
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = `downloaded-files.zip`;
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(url);
            document.body.removeChild(link);
          }
          dispatch(apiSuccess());
          toast.success(response.payload.message);
        } else {
          dispatch(apiFails());
          toast.error("File download failed.");
        }
      })
      .catch((error) => {
        dispatch(apiFails());
        toast.error("Error downloading file:", error);
      });
  };

  useEffect(() => {
    dispatch(apiPending());
    dispatch(
      closeCaseView({ id, sortBy: orderBy, orderBy: order.toUpperCase() }),
    ).then((response) => {
      if (response.type === "closeCaseView/fulfilled") dispatch(apiSuccess());
      else if (response.type === "closeCaseView/rejected") dispatch(apiFails());
    });
  }, [dispatch, id, order, orderBy]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      <Box className="closeCase-main-container">
        <Container maxWidth="lg" className="closeCase-main-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
            gap={2}
            pb={2}
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Close Case</b>
              </Typography>
            </Box>
            <Button
              name="Back"
              variant="outlined"
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => navigate(-1)}
            />
          </Box>
          <Paper>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              p={2}
            >
              <Box>
                <Typography variant="caption">Patient Name</Typography>
                <Typography variant="h6">
                  <b className="patient-name">
                    {closeCaseData?.patientFirstName}
                    {closeCaseData?.patientLastName}
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
            <Typography variant="h6" gutterBottom mt={4} pl={2} pr={2}>
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
                      <TableCell>{row?.fileName}</TableCell>
                      <TableCell>{row?.createdAt}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => handleDownload(row?.fileName)}
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
            <Typography variant="h6" mt={5} mb={3} pl={2} pr={2}>
              Patient Information
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={{ xs: 1, md: 2 }} p={2}>
                <Grid item xs={12} md={6}>
                  <Input
                    label="First Name"
                    value={closeCaseData?.patientFirstName}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Last Name"
                    value={closeCaseData?.patientLastName}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    name="date"
                    label="Date Of Birth"
                    inputFormat="DD/MM/YYYY"
                    disabled
                    sx={{ width: "100%" }}
                    value={
                      closeCaseData?.dob ? dayjs(closeCaseData?.dob) : null
                    }
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
                p={2}
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
