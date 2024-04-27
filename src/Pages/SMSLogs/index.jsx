import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/TextField/Input";
import { columns } from "../../constants/smsLogsData";
import "./smsLogs.css";
import { smsLog } from "../../redux/halloAPIs/adminAPIs/recordsAPIs/emailAndsmsLogAPI";
import { useFormik } from "formik";
import { getRoles } from "../../redux/halloAPIs/adminAPIs/commonAPIs/getRoleAPI";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const SMSLogs = () => {
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { smsLogData } = useSelector((state) => state.root.records);
  const { roles } = useSelector((state) => state.root.getRoles);

  useEffect(() => {
    dispatch(getRoles({ accountType: "All" }));
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      role: "all",
      receiverName: "",
      phoneNumber: "",
      createdDate: "",
      sentDate: "",
    },
    onSubmit: (values) => {
      dispatch(apiPending());
      dispatch(
        smsLog({
          receiverName: values.receiverName,
          createdDate: values.createdDate,
          sentDate: values.sentDate,
          phoneNumber: values.phoneNumber,
          roleName: values.role,
          sortBy: orderBy,
          orderBy: order.toUpperCase(),
          page: pageNo,
          pageSize: rowsPerPage,
        }),
      ).then((response) => {
        if (response.type === "smsLog/fulfilled") dispatch(apiSuccess());
        else if (response.type === "smsLog/rejected") dispatch(apiFails());
      });
      formik.resetForm();
    },
  });

  useEffect(() => {
    dispatch(apiPending());
    dispatch(
      smsLog({
        sortBy: orderBy,
        orderBy: order.toUpperCase(),
        page: pageNo,
        pageSize: rowsPerPage,
      }),
    ).then((response) => {
      if (response.type === "smsLog/fulfilled") dispatch(apiSuccess());
      else if (response.type === "smsLog/rejected") dispatch(apiFails());
    });
  }, [dispatch, order, orderBy, pageNo, rowsPerPage]);

  useEffect(() => setTableData(smsLogData?.rows), [smsLogData]);

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
      <Box className="sms-logs-main-container">
        <Container maxWidth="80%" className="sms-logs-wrapper-container">
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
                <b>SMS Logs (Twilio)</b>
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
            <form onSubmit={formik.handleSubmit}>
              <Grid
                container
                spacing={{ xs: 1, md: 2 }}
                p="1rem 1.25rem 1.5rem 1.25rem"
              >
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <Input
                    label="Search By Role"
                    select
                    name="role"
                    fullWidth
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value="all">All</MenuItem>
                    {roles?.map((role) => (
                      <MenuItem key={role?.id} value={role?.Name}>
                        {role?.Name}
                      </MenuItem>
                    ))}
                  </Input>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <Input
                    label="Receiver Name"
                    name="receiverName"
                    fullWidth
                    value={formik.values.receiverName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <Input
                    label="Mobile Number"
                    name="phoneNumber"
                    fullWidth
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <DatePicker
                    name="createdDate"
                    label="Created Date"
                    sx={{ width: "100%" }}
                    inputFormat="DD/MM/YYYY"
                    value={
                      formik.values.createdDate
                        ? dayjs(formik.values.createdDate)
                        : null
                    }
                    onChange={(newValue) => {
                      const formattedDate = newValue ? newValue : null;
                      formik.setFieldValue("createdDate", formattedDate);
                    }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.createdDate &&
                      Boolean(formik.errors.createdDate)
                    }
                    helperText={
                      formik.touched.createdDate && formik.errors.createdDate
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <DatePicker
                    name="sentDate"
                    label="Sent Date"
                    sx={{ width: "100%" }}
                    inputFormat="DD/MM/YYYY"
                    value={
                      formik.values.sentDate
                        ? dayjs(formik.values.sentDate)
                        : null
                    }
                    onChange={(newValue) => {
                      const formattedDate = newValue ? newValue : null;
                      formik.setFieldValue("sentDate", formattedDate);
                    }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.sentDate && Boolean(formik.errors.sentDate)
                    }
                    helperText={
                      formik.touched.sentDate && formik.errors.sentDate
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <Box display="flex" justifyContent="flex-end" gap={2} pt={1}>
                    <Button name="Search" type="submit" />
                    <Button
                      name="Clear"
                      variant="outlined"
                      onClick={() => {
                        formik.resetForm();
                        dispatch(
                          smsLog({
                            sortBy: orderBy,
                            orderBy: order.toUpperCase(),
                            page: pageNo,
                            pageSize: rowsPerPage,
                          }),
                        );
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
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
                        <TableSortLabel
                          active={orderBy === column.label}
                          direction={order}
                          onClick={() => handleRequestSort(column.label)}
                        >
                          {column.label}
                        </TableSortLabel>
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
                              {row[column.id] !== null
                                ? column.id === "recipient"
                                  ? `${row?.receiver?.patientFirstName} ${row?.receiver?.patientLastName}`
                                  : column.id === "roleName"
                                    ? row?.receiver?.user?.role?.Name
                                    : column.id === "sent"
                                      ? row?.isSMSSent
                                        ? "Yes"
                                        : "No"
                                      : row?.[column.id]
                                : " - "}
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
              count={smsLogData?.count || 0}
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

export default SMSLogs;
