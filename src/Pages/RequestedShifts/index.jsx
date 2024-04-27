import {
  Box,
  Checkbox,
  Container,
  InputAdornment,
  MenuItem,
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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./requestedShifts.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/TextField/Input";
import {
  approveShift,
  deleteShift,
  unApprovedShift,
} from "../../redux/halloAPIs/adminAPIs/providerAPIs/schedulingAPI";
import { toast } from "react-toastify";
import { AppRoutes } from "../../constants/routes";
import {
  apiFails,
  apiPending,
  apiSuccess,
} from "../../redux/halloSlices/apiStatusSlice";

const RequestedShifts = () => {
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("firstName");
  const [selectRegion, setSelectRegion] = useState("all");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [tableData, setTableData] = useState([]);
  const { regions } = useSelector((state) => state.root.getRegionPhysician);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiPending());
    dispatch(
      unApprovedShift({
        regions: selectRegion,
        sortBy: orderBy,
        orderBy: order.toUpperCase(),
        page: pageNo,
        pageSize: rowsPerPage,
      }),
    ).then((response) => {
      if (response.type === "unApprovedShift/fulfilled") dispatch(apiSuccess());
      else if (response.type === "unApprovedShift/rejected")
        dispatch(apiFails());
    });
  }, [dispatch, order, orderBy, pageNo, rowsPerPage, selectRegion]);

  const { unApprovedShiftData } = useSelector((state) => state.root.scheduling);
  useEffect(
    () => setTableData(unApprovedShiftData?.rows),
    [unApprovedShiftData],
  );

  const handleAdditionalFilterChange = (event) => {
    setSelectRegion(event.target.value);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = tableData?.map((row) => row?.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

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
      <Box className="requested-shifts-main-container">
        <Container maxWidth="lg" className="requested-container-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Requested Shifts</b>
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
            <Box
              display="flex"
              justifyContent="space-between"
              pb={4}
              pt={2}
              pr={2}
              pl={2}
            >
              <Input
                className="search-text drop-list"
                select
                placeholder="All Regions"
                value={selectRegion}
                onChange={handleAdditionalFilterChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="all">All Regions</MenuItem>
                {regions?.map((region) => {
                  return (
                    <MenuItem key={region?.id} value={region?.name}>
                      {region?.name}
                    </MenuItem>
                  );
                })}
              </Input>
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button
                  name="View Current Month Shifts"
                  color="success"
                  onClick={() => navigate(AppRoutes.SCHEDULING)}
                />
                <Button
                  name="Approved Selected"
                  color="success"
                  onClick={() => {
                    dispatch(apiPending());
                    dispatch(approveShift({ shiftIds: selected })).then(
                      (response) => {
                        if (response.type === "approveShift/fulfilled") {
                          setSelected([]);
                          dispatch(
                            unApprovedShift({
                              sortBy: orderBy,
                              orderBy: order.toUpperCase(),
                              page: pageNo,
                              pageSize: rowsPerPage,
                            }),
                          );
                          dispatch(apiSuccess());
                          toast.success(response.payload.message);
                        } else if (response.type === "approveShift") {
                          dispatch(apiFails());
                          toast.error("Please select shifts");
                        }
                      },
                    );
                  }}
                />
                <Button
                  name="Delete Selected"
                  color="error"
                  onClick={() => {
                    dispatch(apiPending());
                    dispatch(deleteShift({ shiftIds: selected }))
                      .then((response) => {
                        if (response.type == "deleteShift/fulfilled") {
                          setSelected([]);
                          dispatch(
                            unApprovedShift({
                              sortBy: orderBy,
                              orderBy: order.toUpperCase(),
                              page: pageNo,
                              pageSize: rowsPerPage,
                            }),
                          );
                          dispatch(apiSuccess());
                          toast.success(response.payload.message);
                        } else if (response.type === "deleteShift/rejected") {
                          dispatch(apiFails());
                          toast.error("Please select shifts");
                        }
                      })
                      .catch((error) => {
                        console.error("Delete action failed:", error);
                        toast.error("Failed to delete shifts.");
                        dispatch(apiFails());
                      });
                  }}
                />
              </Box>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead style={{ background: "#f6f6f6" }}>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={
                          selected?.length > 0 &&
                          selected?.length < tableData?.length
                        }
                        checked={selected?.length === tableData?.length}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    <TableCell className="staff-cl">
                      <TableSortLabel
                        active={orderBy === "firstName"}
                        direction={order}
                        onClick={() => handleRequestSort("firstName")}
                      >
                        Staff
                      </TableSortLabel>
                    </TableCell>
                    <TableCell className="date-cl">Day</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Region</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData?.map((row) => (
                    <TableRow key={row?.id} hover>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected(row?.id)}
                          onClick={(event) => handleClick(event, row?.id)}
                        />
                      </TableCell>
                      <TableCell>{row?.physician["Physician Name"]}</TableCell>
                      <TableCell>{row?.shiftDate}</TableCell>
                      <TableCell>
                        {`${row?.startTime} - ${row?.endTime}`}
                      </TableCell>
                      <TableCell>{row?.region}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={unApprovedShiftData?.count || 0}
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

export default RequestedShifts;
