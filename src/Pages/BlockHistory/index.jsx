import React, { useEffect, useState } from "react";
import { columns, rows } from "../../constants/blockHistoryData";
import "./blockHistory.css";
import {
  Box,
  Checkbox,
  Container,
  Grid,
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
import { Input } from "../../Components/TextField/Input";
import { Button } from "../../Components/Button";

const BlockHistory = () => {
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
      <Box className="block-history-main-container">
        <Container maxWidth="80%" className="block-history-wrapper-container">
          <Typography variant="h5" gutterBottom pt={4}>
            <b>Block History</b>
          </Typography>
          <Paper className="block-history-paper">
            <Grid container spacing={{ xs: 1, md: 2 }}>
              <Grid item xs={12} md={3}>
                <Input label="Name" name="name" fullWidth />
              </Grid>
              <Grid item xs={12} md={3}>
                <Input label="Date" name="date" type="date" fullWidth />
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
                                {column.id === "action" ? (
                                  <Button name="Unblock" variant="outlined" />
                                ) : column.id === "isActive" ? (
                                  <Checkbox
                                    size="large"
                                    color="primary"
                                    checked={row.isActive}
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

export default BlockHistory;
