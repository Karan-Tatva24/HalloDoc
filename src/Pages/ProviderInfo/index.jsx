import React, { useEffect, useState } from "react";
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
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Input } from "../../Components/TextField/Input";
import { Button } from "../../Components/Button";
import { columns, rows } from "../../constants/providerData";
import "./providerInfo.css";
import ContectProviderModal from "../../Components/Modal/ContectProviderModal";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/routes";
import { useSelector } from "react-redux";

const ProviderInfo = () => {
  const [searchTerm, setSearchTerm] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("providerName");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { regions } = useSelector((state) => state.root.getRegionPhysician);

  useEffect(() => setTableData(rows), []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
      <Box className="provider-main-container">
        <Container maxWidth="lg" className="provider-wrapper-container">
          <Typography variant="h5" gutterBottom pt={4} pb={2}>
            <b>Provider Information</b>
          </Typography>
          <Paper className="provider-paper">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={4}
            >
              <Input
                className="large-drop-list"
                placeholder="Search"
                variant="outlined"
                value={searchTerm}
                select
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                {regions?.map((region) => {
                  return (
                    <MenuItem key={region.id} value={region.name}>
                      {region.name}
                    </MenuItem>
                  );
                })}
              </Input>
              <Button
                name="Create Provider Account"
                onClick={() => navigate(AppRoutes.CREATE_PROVIDER_ACCOUNT)}
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
                  {stableSort(tableData, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map((row) => {
                      return (
                        <TableRow key={row.id}>
                          {columns?.map((column) => {
                            return (
                              <TableCell key={column.id} align="center">
                                {column.id === "stopNotification" ? (
                                  <Checkbox />
                                ) : column.id === "actions" ? (
                                  <Box
                                    display="flex"
                                    gap={1}
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    <Button
                                      name="Contact"
                                      variant="outlined"
                                      size="small"
                                      onClick={handleOpen}
                                    />
                                    <Button
                                      name="Edit"
                                      variant="outlined"
                                      size="small"
                                      onClick={() =>
                                        navigate(AppRoutes.EDIT_PHYSICIAN)
                                      }
                                    />
                                  </Box>
                                ) : (
                                  row[column.id]
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
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      </Box>
      <ContectProviderModal open={open} handleClose={handleClose} />
    </>
  );
};

export default ProviderInfo;
