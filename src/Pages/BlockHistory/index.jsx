import React, { useEffect, useState } from "react";
import { columns } from "../../constants/blockHistoryData";
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
  TablePagination,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../Components/TextField/Input";
import { Button } from "../../Components/Button";
import {
  blockHistory,
  unblockPatient,
} from "../../redux/halloAPIs/adminAPIs/recordsAPIs/blockHistoryAPI";
import { toast } from "react-toastify";
import { useFormik } from "formik";

const BlockHistory = () => {
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const dispatch = useDispatch();
  const { blockHistoryData } = useSelector((state) => state.root.records);

  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
      email: "",
      phone: "",
    },
    onSubmit: (values) => {
      dispatch(
        blockHistory({
          name: values.name,
          date: values.date,
          email: values.email,
          phone: values.phone,
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
      blockHistory({
        sortBy: orderBy,
        orderBy: order.toUpperCase(),
        page: pageNo,
        pageSize: rowsPerPage,
      }),
    );
  }, [dispatch, order, orderBy, pageNo, rowsPerPage]);

  useEffect(() => setTableData(blockHistoryData?.rows), [blockHistoryData]);

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
      <Box className="block-history-main-container">
        <Container maxWidth="80%" className="block-history-wrapper-container">
          <Typography variant="h5" gutterBottom pt={4} pb={3}>
            <b>Block History</b>
          </Typography>
          <Paper>
            <form onSubmit={formik.handleSubmit}>
              <Grid
                container
                spacing={{ xs: 1, md: 2 }}
                p="1rem 1.2rem 0.8rem 1.25rem"
              >
                <Grid item xs={12} md={3}>
                  <Input
                    label="Name"
                    name="name"
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Input
                    label="Date"
                    name="date"
                    type="date"
                    fullWidth
                    value={formik.values.date}
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
                    name="phone"
                    fullWidth
                    value={formik.values.phone}
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
                p={2}
              >
                <Button
                  name="Clear"
                  variant="outlined"
                  onClick={() => {
                    formik.resetForm();
                    dispatch(
                      blockHistory({
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
                <TableHead style={{ backgroundColor: "#f0f0f0" }}>
                  <TableRow>
                    {columns.map((column) =>
                      column.id === "createdAt" ? (
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
                              ) : column.id === "action" ? (
                                <Button
                                  name="Unblock"
                                  variant="outlined"
                                  onClick={() => {
                                    dispatch(unblockPatient(row?.id)).then(
                                      (response) => {
                                        if (
                                          response.type ===
                                          "unblockPatient/fulfilled"
                                        ) {
                                          dispatch(
                                            blockHistory({
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
                              ) : column.id === "isActive" ? (
                                <Checkbox
                                  size="medium"
                                  color="primary"
                                  checked={row?.isActive}
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
              count={blockHistoryData?.count || 0}
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

export default BlockHistory;
