import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/TextField/Input";
import { columns } from "../../constants/patientHistoryData";
import { AppRoutes } from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  patientHistory,
  patientRecord,
} from "../../redux/halloAPIs/adminAPIs/recordsAPIs/patientRecordsAPI";
import "./patientHistory.css";

const PatientHistory = () => {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const dispatch = useDispatch();
  const { patientHistoryData } = useSelector((state) => state.root.records);
  const navigate = useNavigate();

  useEffect(() => setTableData(patientHistoryData?.rows), [patientHistoryData]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
    onSubmit: (values) => {
      dispatch(
        patientHistory({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phoneNumber,
          page: pageNo,
          pageSize: rowsPerPage,
        }),
      );
    },
  });

  useEffect(() => {
    dispatch(
      patientHistory({
        page: pageNo,
        pageSize: rowsPerPage,
      }),
    );
  }, [dispatch, pageNo, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (newPage > page) setPageNo(pageNo + 1);
    else setPageNo(pageNo - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Box className="patient-history-main-container">
        <Container maxWidth="80%" className="patient-history-wrapper-container">
          <Typography variant="h5" gutterBottom pt={4}>
            <b>Patient History</b>
          </Typography>
          <Paper className="patient-history-paper">
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={3}>
                  <Input
                    label="First Name"
                    name="firstName"
                    fullWidth
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Input
                    label="Last Name"
                    name="lastName"
                    fullWidth
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Input
                    label="Email"
                    name="email"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Input
                    label="Phone Number"
                    name="phoneNumber"
                    fullWidth
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
              </Grid>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                gap={2}
                pt={2}
                pb={2}
              >
                <Button
                  name="Clear"
                  variant="outlined"
                  onClick={() => {
                    formik.resetForm();
                    dispatch(
                      patientHistory({
                        page: pageNo,
                        pageSize: rowsPerPage,
                      }),
                    );
                  }}
                />
                <Button name="Search" type="submit" />
              </Box>
            </form>
            <TableContainer sx={{ maxHeight: "none" }} component={Paper}>
              <Table>
                <TableHead style={{ backgroundColor: "#f6f6f6" }}>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align="center"
                        style={{ maxWidth: column.maxWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tableData?.map((row) => {
                    return (
                      <TableRow key={row?.id}>
                        {columns?.map((column) => {
                          return (
                            <TableCell key={column.id} align="center">
                              {column.id === "address" ? (
                                `${row?.street} ,${row?.city} ,${row?.state} ,${row?.zipCode}`
                              ) : column.id === "actions" ? (
                                <Button
                                  name="Explore"
                                  variant="outlined"
                                  onClick={() => {
                                    dispatch(
                                      patientRecord({ id: row?.userId }),
                                    ).then((response) => {
                                      if (
                                        response?.type ===
                                        "patientRecord/fulfilled"
                                      ) {
                                        navigate(AppRoutes.PATIENTS_RECORDS);
                                      }
                                    });
                                  }}
                                />
                              ) : (
                                row?.[column.id]
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={patientHistoryData?.count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default PatientHistory;
