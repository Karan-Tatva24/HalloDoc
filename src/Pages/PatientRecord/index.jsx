import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Fade,
  Menu,
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
import { columns } from "../../constants/patientRecordData";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./patientRecord.css";
import { patientRecord } from "../../redux/halloAPIs/patientRecordsAPI";
import { viewCase } from "../../redux/halloAPIs/viewReservationAPI";
import { AppRoutes } from "../../constants/routes";
import { viewUpload } from "../../redux/halloAPIs/viewUploadAPI";
import { getPatientName } from "../../redux/halloAPIs/getPatientNameAPI";

const PatientRecord = () => {
  const [tableData, setTableData] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const dispatch = useDispatch();
  const { patientRecordData } = useSelector((state) => state.root.records);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  useEffect(() => {
    dispatch(
      patientRecord({
        id: patientRecordData?.id,
        sortBy: orderBy,
        orderBy: order.toUpperCase(),
        page: pageNo,
        pageSize: rowsPerPage,
      }),
    );
  }, [dispatch, order, orderBy, pageNo, patientRecordData?.id, rowsPerPage]);

  useEffect(
    () => setTableData(patientRecordData?.patients?.rows),
    [patientRecordData],
  );

  const handleClick = (event, id) => {
    setRowId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      <Box className="patient-record-main-container">
        <Container maxWidth="80%" className="patient-record-wrapper-container">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
            pt={4}
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Patient Record</b>
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
          <Paper className="patient-record-paper">
            <TableContainer sx={{ maxHeight: "none" }} component={Paper}>
              <Table>
                <TableHead style={{ backgroundColor: "#f6f6f6" }}>
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
                              {column.id === "client" ? (
                                `${row?.patientFirstName} ${row?.patientLastName}`
                              ) : column.id === "providerName" ? (
                                row?.physician ? (
                                  `${row?.physician?.firstName} ${row?.physician?.lastName}`
                                ) : (
                                  " - "
                                )
                              ) : column.id === "actions" ? (
                                <>
                                  <Button
                                    name="Action"
                                    variant="outlined"
                                    onClick={(e) => handleClick(e, row.id)}
                                  />
                                  <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                      "aria-labelledby": "fade-button",
                                    }}
                                    anchorEl={anchorEl}
                                    open={open && row?.id === rowId}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                  >
                                    <MenuItem
                                      disableRipple
                                      onClick={() => {
                                        dispatch(viewCase(row?.id)).then(
                                          (response) => {
                                            if (
                                              response.type ===
                                              "viewCase/fulfilled"
                                            ) {
                                              navigate(AppRoutes.VIEW_CASE);
                                            }
                                          },
                                        );
                                        handleClose();
                                      }}
                                    >
                                      View Case
                                    </MenuItem>
                                    <MenuItem
                                      disableRipple
                                      onClick={handleClose}
                                    >
                                      Chat
                                    </MenuItem>
                                    <MenuItem
                                      disableRipple
                                      onClick={() => {
                                        dispatch(getPatientName(rowId));
                                        dispatch(
                                          viewUpload({ id: row?.id }),
                                        ).then((response) => {
                                          if (
                                            response.type ===
                                            "viewUpload/fulfilled"
                                          ) {
                                            navigate(AppRoutes.VIEW_UPLOAD);
                                          }
                                        });
                                        handleClose();
                                      }}
                                    >
                                      0 Documents
                                    </MenuItem>
                                  </Menu>
                                </>
                              ) : column.id === "finalReport" ? (
                                row.status === "Closed" ? (
                                  <Button name="view" variant="outlined" />
                                ) : (
                                  " - "
                                )
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
              count={patientRecordData?.patients?.count}
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

export default PatientRecord;
