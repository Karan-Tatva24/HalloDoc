import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/TextField/Input";
import { columns } from "../../constants/searchRecordsData";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRecord,
  exportRecord,
  searchRecord,
} from "../../redux/halloAPIs/adminAPIs/recordsAPIs/searchRecordsAPI";
import "./searchRecords.css";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const SearchRecords = () => {
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("acceptedDate");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const dispatch = useDispatch();
  const { searchRecordData } = useSelector((state) => state.root.records);

  const formik = useFormik({
    initialValues: {
      requestStatus: "",
      name: "",
      requestType: "",
      fromDate: "",
      toDate: "",
      providerName: "",
      email: "",
      phoneNumber: "",
    },
    onSubmit: (values) => {
      dispatch(
        searchRecord({
          requestStatus: values.requestStatus,
          patientName: values.name,
          requestType: values.requestType,
          fromDate: values.fromDate,
          toDate: values.toDate,
          physicianName: values.providerName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          sortBy: orderBy,
          orderBy: order.toUpperCase(),
          page: pageNo,
          pageSize: rowsPerPage,
        }),
      );
    },
  });

  useEffect(() => {
    dispatch(
      searchRecord({
        sortBy: orderBy,
        orderBy: order.toUpperCase(),
        page: pageNo,
        pageSize: rowsPerPage,
      }),
    );
  }, [dispatch, order, orderBy, pageNo, rowsPerPage]);

  useEffect(() => setTableData(searchRecordData?.rows), [searchRecordData]);

  const handleExportToExcel = () => {
    dispatch(exportRecord())
      .then((response) => {
        if (response.type === "exportRecord/fulfilled") {
          const blob = new Blob([response.payload], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `Search-Records.xlsx`;
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          link.remove();
          toast.success(response.payload.message);
        } else {
          toast.error("File download failed.");
        }
      })
      .catch((error) => {
        toast.error("Error downloading file:", error);
      });
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
      <Box className="search-record-main-container">
        <Container maxWidth="80%" className="search-record-wrapper-container">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
            pt={4}
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Search Records</b>
              </Typography>
            </Box>
            <Button
              name="Export Data To Excel"
              startIcon={<RedoOutlinedIcon />}
              color="primary"
              onClick={handleExportToExcel}
            />
          </Box>
          <Paper className="search-record-paper">
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={3}>
                  <Input
                    label="Select Request Status"
                    name="requestStatus"
                    select
                    fullWidth
                    value={formik.values.requestStatus}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="closed">Closed</MenuItem>
                  </Input>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Input
                    label="Patient Name"
                    name="name"
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Input
                    label="Select Request Type"
                    name="requestType"
                    select
                    fullWidth
                    value={formik.values.requestType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value="patient">Patient</MenuItem>
                    <MenuItem value="family/friend">Family/Friend</MenuItem>
                    <MenuItem value="business">Business</MenuItem>
                  </Input>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Input
                    label="From Date Of Service"
                    name="fromDate"
                    type="date"
                    fullWidth
                    value={formik.values.fromDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Input
                    label="To Date Of Service"
                    name="toDate"
                    type="date"
                    fullWidth
                    value={formik.values.toDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Input
                    label="Provider Name"
                    name="providerName"
                    fullWidth
                    value={formik.values.providerName}
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
                      searchRecord({
                        sortBy: orderBy,
                        orderBy: order.toUpperCase(),
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
                    {columns.map((column) =>
                      column.id === "acceptedDate" ||
                      column.id === "updatedAt" ? (
                        <TableCell
                          key={column.id}
                          align="center"
                          style={{ maxWidth: column.maxWidth }}
                        >
                          <TableSortLabel
                            active={orderBy === column.label}
                            direction={order}
                            onClick={() => handleRequestSort(column.id)}
                          >
                            {column.label}
                          </TableSortLabel>
                        </TableCell>
                      ) : (
                        <TableCell
                          key={column.id}
                          align="center"
                          style={{ maxWidth: column.maxWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ),
                    )}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tableData?.map((row) => {
                    return (
                      <TableRow key={row?.id}>
                        {columns?.map((column) => {
                          return (
                            <TableCell key={column.id} align="center">
                              {column.id === "patientName" ? (
                                `${row?.patientFirstName} ${row?.patientLastName}`
                              ) : column.id === "physician" ? (
                                row?.physician === null ? (
                                  " - "
                                ) : (
                                  `${row?.physician?.firstName} ${row?.physician?.lastName}`
                                )
                              ) : column.id === "address" ? (
                                `${row?.street}, ${row?.city}, ${row?.state}`
                              ) : column.id === "delete" ? (
                                <Button
                                  name="Delete"
                                  variant="outlined"
                                  size="small"
                                  onClick={() => {
                                    dispatch(deleteRecord(row?.id)).then(
                                      (response) => {
                                        if (
                                          response.type ===
                                          "deleteRecord/fulfilled"
                                        ) {
                                          dispatch(
                                            searchRecord({
                                              sortBy: orderBy,
                                              orderBy: order.toUpperCase(),
                                              page: pageNo,
                                              pageSize: rowsPerPage,
                                            }),
                                          );
                                          toast.success(
                                            response.payload.message,
                                          );
                                        }
                                      },
                                    );
                                  }}
                                />
                              ) : row?.[column.id] ? (
                                row?.[column.id]
                              ) : (
                                " - "
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
              count={searchRecordData?.count}
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

export default SearchRecords;
