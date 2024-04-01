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
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/TextField/Input";
import { columns, rows } from "../../constants/searchRecordsData";
import "./searchRecords.css";

const SearchRecords = () => {
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

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
            />
          </Box>
          <Paper className="search-record-paper">
            <Grid container spacing={{ xs: 1, md: 2 }}>
              <Grid item xs={12} md={3}>
                <Input
                  label="Select Request Status"
                  name="requestStatus"
                  select
                  fullWidth
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                </Input>
              </Grid>
              <Grid item xs={12} md={3}>
                <Input label="Patient Name" name="patientName" fullWidth />
              </Grid>
              <Grid item xs={12} md={3}>
                <Input
                  label="Select Request Type"
                  name="requestType"
                  select
                  fullWidth
                >
                  <MenuItem value="patient">Patient</MenuItem>
                  <MenuItem value="family/friend">Family/Friend</MenuItem>
                  <MenuItem value="business">Business</MenuItem>
                </Input>
              </Grid>
              <Grid item xs={12} md={3}>
                <Input
                  label="From Date Of Service"
                  name="fromDOS"
                  type="date"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Input
                  label="To Date Of Service"
                  name="toDOS"
                  type="date"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Input label="Provider Name" name="providerName" fullWidth />
              </Grid>
              <Grid item xs={12} md={3}>
                <Input label="Email" name="email" fullWidth />
              </Grid>
              <Grid item xs={12} md={3}>
                <Input label="Phone Number" name="phoneNumber" fullWidth />
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
              <Button name="Clear" variant="outlined" />
              <Button name="Search" />
            </Box>
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
                  {stableSort(tableData, getComparator(order, orderBy))?.map(
                    (row) => {
                      return (
                        <TableRow key={row.id}>
                          {columns?.map((column) => {
                            return (
                              <TableCell key={column.id} align="center">
                                {column.id === "delete" ? (
                                  <Button
                                    name="Delete"
                                    variant="outlined"
                                    size="small"
                                  />
                                ) : (
                                  row[column.id]
                                )}
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

export default SearchRecords;
