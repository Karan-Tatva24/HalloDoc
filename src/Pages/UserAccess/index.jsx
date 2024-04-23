import { useEffect, useState } from "react";
import {
  Box,
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
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { Input } from "../../Components/TextField/Input";
import { columns } from "../../constants/userAccess";
import { Button } from "../../Components/Button";
import "./userAccess.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAccess } from "../../redux/halloAPIs/adminAPIs/accessAPIs/userAccessAPI";
import { physicianProfile } from "../../redux/halloAPIs/adminAPIs/providerAPIs/providerInfoAPI";
import { AppRoutes } from "../../constants/routes";
import { adminProfile } from "../../redux/halloAPIs/adminAPIs/profileAPIs/adminProfileAPI";

const UserAccess = () => {
  const [orderBy, setOrderBy] = useState("accountType");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [selectedRole, setSelectedRole] = useState("All");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userAccount } = useSelector((state) => state.root.userAccess);

  useEffect(() => setTableData(userAccount?.rows), [userAccount]);

  const handleEditClick = (id, accountType) => {
    if (accountType === "Physician") {
      dispatch(physicianProfile(id)).then((response) => {
        if (response.type === "physicianProfile/fulfilled") {
          navigate(AppRoutes.EDIT_PHYSICIAN);
        }
      });
    } else if (accountType === "Admin") {
      dispatch(adminProfile()).then((response) => {
        if (response.type === "adminProfile/fulfilled") {
          navigate(AppRoutes.MY_PROFILE);
        }
      });
    }
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

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    dispatch(
      userAccess({
        accountType: selectedRole,
        sortBy: orderBy,
        orderBy: order.toUpperCase(),
        page: pageNo,
        pageSize: rowsPerPage,
      }),
    );
  }, [dispatch, order, orderBy, pageNo, rowsPerPage, selectedRole]);

  return (
    <>
      <Box className="user-access-main-container">
        <Container maxWidth="lg" className="user-access-wrapper-container">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>User Access</b>
              </Typography>
            </Box>
            <Button
              name="Back"
              variant="outlined"
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => navigate(-1)}
              className="back-btn"
            />
          </Box>
          <Paper className="user-access-full-paper">
            <Box pb={1}>
              <Input
                select
                value={selectedRole}
                className="drop-list search-text"
                onChange={(e) => setSelectedRole(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="physician">Physician</MenuItem>
              </Input>
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
                                    onClick={() =>
                                      handleEditClick(row?.id, row?.accountType)
                                    }
                                  />
                                </Box>
                              ) : column.id === "accountPOC" ? (
                                `${row?.firstName}, ${row?.lastName}`
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
              count={userAccount?.count}
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

export default UserAccess;
