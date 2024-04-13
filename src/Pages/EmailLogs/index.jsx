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
import { useFormik } from "formik";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/TextField/Input";
import { columns } from "../../constants/emailLogsData";
import { emailLog } from "../../redux/halloAPIs/adminAPIs/recordsAPIs/emailAndsmsLogAPI";
import { getRoles } from "../../redux/halloAPIs/adminAPIs/commonAPIs/getRoleAPI";
import "./emailLogs.css";

const EmailLogs = () => {
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { emailLogData } = useSelector((state) => state.root.records);
  const { roles } = useSelector((state) => state.root.getRoles);

  useEffect(() => {
    dispatch(getRoles({ accountType: "all" }));
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      role: "all",
      receiverName: "",
      email: "",
      createDate: "",
      sentDate: "",
    },
    onSubmit: (values) => {
      dispatch(
        emailLog({
          receiverName: values.receiverName,
          createdDate: values.createDate,
          sentDate: values.sentDate,
          email: values.email,
          roleName: values.role,
          sortBy: orderBy,
          orderBy: order.toUpperCase(),
          page: pageNo,
          pageSize: rowsPerPage,
        }),
      );
      formik.resetForm();
    },
  });

  useEffect(() => {
    dispatch(
      emailLog({
        sortBy: orderBy,
        orderBy: order.toUpperCase(),
        page: pageNo,
        pageSize: rowsPerPage,
      }),
    );
  }, [dispatch, order, orderBy, pageNo, rowsPerPage]);

  useEffect(() => setTableData(emailLogData?.rows), [emailLogData]);

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
      <Box className="email-logs-main-container">
        <Container maxWidth="80%" className="email-logs-wrapper-container">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
            pt={4}
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Email Logs (Gmail)</b>
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
          <Paper className="email-logs-paper">
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={{ xs: 1, md: 2 }} pb={5}>
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
                    label="Email id"
                    name="email"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <Input
                    label="Created Date"
                    name="createDate"
                    type="date"
                    fullWidth
                    value={formik.values.createDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <Input
                    label="Sent Date"
                    name="sentDate"
                    type="Date"
                    fullWidth
                    value={formik.values.sentDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                          emailLog({
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
                          active={orderBy === column.id}
                          direction={order}
                          onClick={() => handleRequestSort(column.id)}
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
                            <TableCell key={column?.id} align="center">
                              {row[column.id] !== null
                                ? column.id === "recipient"
                                  ? `${row.receiver.firstName} ${row?.receiver?.lastName}`
                                  : column.id === "roleName"
                                    ? row?.receiver?.role?.Name
                                    : column.id === "sent"
                                      ? row?.isEmailSent
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
              count={emailLogData?.count}
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

export default EmailLogs;
