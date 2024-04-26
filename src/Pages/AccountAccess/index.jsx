import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import "./accountAccess.css";
import { Button } from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/routes";
import { useSelector, useDispatch } from "react-redux";
import { accountAccess } from "../../redux/halloAPIs/adminAPIs/accessAPIs/accountAccessAPI";
import {
  deleteRole,
  viewRole,
} from "../../redux/halloAPIs/adminAPIs/accessAPIs/createAccessAPI";
import { toast } from "react-toastify";
import { apiPending, apiSuccess } from "../../redux/halloSlices/apiStatusSlice";

const columns = [
  {
    id: "Name",
    label: "Name",
  },

  {
    id: "accountType",
    label: "Account Type",
  },
  {
    id: "actions",
    label: "Actions",
  },
];

const AccountAccess = () => {
  const [orderBy, setOrderBy] = useState("accountType");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { accessAccount } = useSelector((state) => state.root.accountAccess);
  useEffect(() => setTableData(accessAccount?.rows), [accessAccount]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (newPage > page) setPageNo(pageNo + 1);
    else setPageNo(pageNo - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    dispatch(apiPending());
    dispatch(
      accountAccess({
        sortBy: orderBy,
        orderBy: order.toUpperCase(),
        page: pageNo,
        pageSize: rowsPerPage,
      }),
    ).then((response) => {
      if (response.type === "accountAccess/fulfilled") dispatch(apiSuccess());
    });
  }, [dispatch, order, orderBy, pageNo, rowsPerPage]);

  return (
    <>
      <Box className="access-main-container">
        <Container maxWidth="lg" className="access-wrapper-container">
          <Typography variant="h5" gutterBottom>
            <b>Account Access</b>
          </Typography>
          <Paper>
            <Box display="flex" justifyContent="end" pt={4.5} pb={3} pr={3}>
              <Button
                name="Create Access"
                variant="outlined"
                onClick={() => navigate(AppRoutes.CREATE_ROLE)}
              />
            </Box>

            <TableContainer sx={{ maxHeight: "none" }} component={Paper}>
              <Table>
                <TableHead style={{ backgroundColor: "#f6f6f6" }}>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align="center"
                        style={{ minWidth: column.minWidth }}
                        className="table-head-label"
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

                <TableBody align="left">
                  {tableData?.map((row) => {
                    return (
                      <TableRow key={row?.id}>
                        {columns.map((column) => {
                          return (
                            <TableCell key={column.id} align="center">
                              {column.id === "actions" ? (
                                <Box
                                  display="flex"
                                  gap={1}
                                  justifyContent="center"
                                >
                                  <Button
                                    name="Edit"
                                    variant="outlined"
                                    size="small"
                                    onClick={() => {
                                      dispatch(apiPending());
                                      dispatch(viewRole(row?.id)).then(
                                        (response) => {
                                          if (
                                            response.type ===
                                            "viewRole/fulfilled"
                                          )
                                            dispatch(apiSuccess());
                                        },
                                      );
                                      navigate(AppRoutes.CREATE_ROLE);
                                    }}
                                  />
                                  <Button
                                    name="Delete"
                                    variant="outlined"
                                    size="small"
                                    onClick={() => {
                                      dispatch(apiPending());
                                      dispatch(deleteRole(row.id)).then(
                                        (response) => {
                                          if (
                                            response.type ===
                                            "deleteRole/fulfilled"
                                          ) {
                                            dispatch(accountAccess());
                                            dispatch(apiSuccess());
                                            toast.success(
                                              response.payload.message,
                                            );
                                          }
                                        },
                                      );
                                    }}
                                  />
                                </Box>
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
              count={accessAccount?.count || 0}
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

export default AccountAccess;
