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
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/TextField/Input";
import { columns, rows } from "../../constants/smsLogsData";
import "./smsLogs.css";

const SMSLogs = () => {
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const navigate = useNavigate();

  useEffect(() => setTableData(rows), []);

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

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>SMS Logs (Twilio)</b>
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
          <Paper className="sms-logs-paper">
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
                <Input label="Mobile Number" name="mobileNumber" fullWidth />
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
                  {stableSort(tableData, getComparator(order, orderBy))?.map(
                    (row) => {
                      return (
                        <TableRow key={row.id}>
                          {columns?.map((column) => {
                            return (
                              <TableCell key={column.id} align="center">
                                {row[column.id] !== null
                                  ? row[column.id]
                                  : " - "}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    },
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default SMSLogs;
