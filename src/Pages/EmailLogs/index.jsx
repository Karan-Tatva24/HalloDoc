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
import { Button } from "../../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import "./emailLogs.css";
import { Input } from "../../Components/TextField/Input";
import { columns } from "../../constants/emailLogsData";
import { emailLog } from "../../redux/halloAPIs/emailAndsmsLogAPI";

const EmailLogs = () => {
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const dispatch = useDispatch();
  const { emailLogData } = useSelector((state) => state.root.records);
  const navigate = useNavigate();

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

  useEffect(() => setTableData(emailLogData?.rows), [emailLogData?.rows]);

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
            <Grid container spacing={{ xs: 1, md: 2 }} pb={5}>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <Input
                  label="Search By Role"
                  select
                  name="role"
                  value="all"
                  fullWidth
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="provider">Provider</MenuItem>
                  <MenuItem value="patient">Patient</MenuItem>
                </Input>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <Input label="Receiver Name" name="receiverName" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <Input label="Email id" name="email" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <Input
                  label="Created Date"
                  name="createdDate"
                  type="date"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <Input
                  label="Sent Date"
                  name="sentDate"
                  type="Date"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <Box display="flex" justifyContent="flex-end" gap={2} pt={1}>
                  <Button name="Search" />
                  <Button name="Clear" variant="outlined" />
                </Box>
              </Grid>
            </Grid>
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
                      <TableRow key={row.id}>
                        {columns?.map((column) => {
                          return (
                            <TableCell key={column.id} align="center">
                              {row[column.id] !== null
                                ? column.id === "recipient"
                                  ? `${row.receiver.firstName} ${row.receiver.lastName}`
                                  : row[column.id]
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
