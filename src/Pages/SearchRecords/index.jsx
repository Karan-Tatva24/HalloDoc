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
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const SearchRecords = () => {
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("acceptedDate");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const dispatch = useDispatch();
  const { searchRecordData } = useSelector((state) => state.root.records);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };

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
      dispatch(apiPending());
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
      ).then((response) => {
        if (response.type === "searchRecord/fulfilled") dispatch(apiSuccess());
        else if (response.type === "searchRecord/rejected")
          dispatch(apiFails());
      });
    },
  });

  useEffect(() => {
    dispatch(apiPending());
    dispatch(
      searchRecord({
        sortBy: orderBy,
        orderBy: order.toUpperCase(),
        page: pageNo,
        pageSize: rowsPerPage,
      }),
    ).then((response) => {
      if (response.type === "searchRecord/fulfilled") dispatch(apiSuccess());
      else if (response.type === "searchRecord/rejected") dispatch(apiFails());
    });
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
            pb={2}
            gap={2}
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
          <Paper>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={{ xs: 1, md: 2 }} p={1.5}>
                <Grid item xs={12} md={3}>
                  <Input
                    label="Select Request Status"
                    name="requestStatus"
                    select
                    fullWidth
                    value={formik.values.requestStatus}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    MenuProps={MenuProps}
                  >
                    <MenuItem value="Unassigned">Unassigned</MenuItem>
                    <MenuItem value="Processing">Processing</MenuItem>
                    <MenuItem value="Accepted">Accepted</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                    <MenuItem value="Reserving">Reserving</MenuItem>
                    <MenuItem value="MDOnRoute">MDOnRoute</MenuItem>
                    <MenuItem value="Conclude">Conclude</MenuItem>
                    <MenuItem value="MDOnSite">MDOnSite</MenuItem>
                    <MenuItem value="FollowUp">FollowUp</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                    <MenuItem value="Locked">Locked</MenuItem>
                    <MenuItem value="Declined">Declined</MenuItem>
                    <MenuItem value="Consult">Consult</MenuItem>
                    <MenuItem value="Cleared">Cleared</MenuItem>
                    <MenuItem value="Blocked">Blocked</MenuItem>
                    <MenuItem value="Unpaid">Unpaid</MenuItem>
                    <MenuItem value="CancelledByProvider">
                      CancelledByProvider
                    </MenuItem>
                    <MenuItem value="CancelledByAdmin">
                      CancelledByAdmin
                    </MenuItem>
                    <MenuItem value="CCUploadedByClient">
                      CCUploadedByClient
                    </MenuItem>
                    <MenuItem value="CCApprovedByAdmin">
                      CCApprovedByAdmin
                    </MenuItem>
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
                    <MenuItem value="concierge">Concierge</MenuItem>
                  </Input>
                </Grid>
                <Grid item xs={12} md={3}>
                  <DatePicker
                    name="fromDate"
                    label="From Date Of Service"
                    sx={{ width: "100%" }}
                    inputFormat="DD/MM/YYYY"
                    value={
                      formik.values.fromDate
                        ? dayjs(formik.values.fromDate)
                        : null
                    }
                    onChange={(newValue) => {
                      const formattedDate = newValue ? newValue : null;
                      formik.setFieldValue("fromDate", formattedDate);
                    }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.fromDate && Boolean(formik.errors.fromDate)
                    }
                    helperText={
                      formik.touched.fromDate && formik.errors.fromDate
                    }
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <DatePicker
                    name="toDate"
                    label="To Date Of Service"
                    sx={{ width: "100%" }}
                    inputFormat="DD/MM/YYYY"
                    value={
                      formik.values.toDate ? dayjs(formik.values.toDate) : null
                    }
                    onChange={(newValue) => {
                      const formattedDate = newValue ? newValue : null;
                      formik.setFieldValue("toDate", formattedDate);
                    }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.toDate && Boolean(formik.errors.toDate)
                    }
                    helperText={formik.touched.toDate && formik.errors.toDate}
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
                pr={1.25}
                pl={1.25}
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
              count={searchRecordData?.count || 0}
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
