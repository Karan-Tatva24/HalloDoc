import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import { medicalHistory } from "../../redux/halloAPIs/patientAPIs/medicalHistoryAPI";
import { getPatientName } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/getPatientNameAPI";
import { Button } from "../Button";
import { AppRoutes } from "../../constants/routes";
import { apiPending, apiSuccess } from "../../redux/halloSlices/apiStatusSlice";

const MedicalHistory = ({ handleOpen }) => {
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { medicalHistoryData } = useSelector(
    (state) => state.root.medicalHistory,
  );

  useEffect(() => setTableData(medicalHistoryData?.rows), [medicalHistoryData]);

  useEffect(() => {
    dispatch(apiPending());
    dispatch(
      medicalHistory({
        sortBy: orderBy,
        orderBy: order.toUpperCase(),
        page: pageNo,
        pageSize: rowsPerPage,
      }),
    ).then((response) => {
      if (response.type === "medicalHistory/fulfilled") dispatch(apiSuccess());
    });
  }, [dispatch, order, orderBy, pageNo, rowsPerPage]);

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
      <Box pt={7} sx={{ backgroundColor: "#f6f6f6" }}>
        <Container maxWidth="70%" sx={{ padding: "1rem 3rem" }}>
          <Typography variant="h5" pb={3}>
            <b>Medical History</b>
          </Typography>
          <Paper sx={{ borderRadius: 5 }}>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              p={4}
            >
              <Button
                name="Create New Request"
                variant="outlined"
                onClick={() => handleOpen("Create New Request")}
              />
            </Box>
            <TableContainer>
              <Table>
                <TableHead style={{ backgroundColor: "#f6f6f6" }}>
                  <TableRow>
                    <TableCell align="left">
                      <TableSortLabel
                        active={orderBy === "createdAt"}
                        direction={order}
                        onClick={() => handleRequestSort("createdAt")}
                      >
                        Created Date
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left">Document</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData?.map((row) => {
                    return (
                      <TableRow key={row?.id}>
                        <TableCell>{row?.createdAt}</TableCell>
                        <TableCell>{row?.requestStatus}</TableCell>
                        <TableCell>
                          {row?.filesCount !== 0 ? (
                            <Button
                              name={`(${row.filesCount}) documents`}
                              variant="outlined"
                              onClick={() => {
                                dispatch(getPatientName(row?.id));
                                navigate(AppRoutes.VIEW_UPLOAD);
                              }}
                            />
                          ) : null}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={medicalHistoryData?.count || 0}
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

export default MedicalHistory;
