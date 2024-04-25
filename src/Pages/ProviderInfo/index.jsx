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
import { columns } from "../../constants/providerData";
import ContactProviderModal from "../../Components/Modal/ContactProviderModal";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import {
  physicianProfile,
  providerInfo,
  updateNotification,
} from "../../redux/halloAPIs/adminAPIs/providerAPIs/providerInfoAPI";
import "./providerInfo.css";

const ProviderInfo = () => {
  const [searchTerm, setSearchTerm] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("firstName");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(-1);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { regions } = useSelector((state) => state.root.getRegionPhysician);
  const { providerInfoData } = useSelector((state) => state.root.providerInfo);

  useEffect(() => setTableData(providerInfoData?.rows), [providerInfoData]);

  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const initialSelectedIds = providerInfoData?.rows
      ?.filter((data) => data?.stopNotification)
      ?.map((data) => data?.id);
    setSelectedIds(initialSelectedIds);
  }, [providerInfoData]);

  const handleCheckboxChange = (id) => {
    if (selectedIds?.includes(id)) {
      setSelectedIds(selectedIds?.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
    setShowSaveButton(true);
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
      providerInfo({
        sortBy: orderBy,
        orderBy: order.toUpperCase(),
        regions: searchTerm,
        page: pageNo,
        pageSize: rowsPerPage,
      }),
    );
  }, [dispatch, order, orderBy, pageNo, rowsPerPage, searchTerm]);

  return (
    <>
      <Box className="provider-main-container">
        <Container maxWidth="lg" className="provider-wrapper-container">
          <Typography variant="h5" gutterBottom pt={4} pb={2}>
            <b>Provider Information</b>
          </Typography>
          <Paper>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={4}
              flexWrap="wrap"
              gap={2}
              p={2}
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
                    <MenuItem key={region?.id} value={region?.name}>
                      {region?.name}
                    </MenuItem>
                  );
                })}
              </Input>
              <Box display="flex" gap={2}>
                <Button
                  name="Create Provider Account"
                  onClick={() => navigate(AppRoutes.CREATE_PROVIDER_ACCOUNT)}
                />
                {showSaveButton && (
                  <Button
                    name="Save"
                    onClick={() => {
                      dispatch(updateNotification(selectedIds)).then(
                        (response) => {
                          if (
                            response.type === "updateNotification/fulfilled"
                          ) {
                            dispatch(providerInfo({ regions: searchTerm }));
                            setShowSaveButton(false);
                          }
                        },
                      );
                    }}
                  />
                )}
              </Box>
            </Box>
            <TableContainer sx={{ maxHeight: "none" }} component={Paper}>
              <Table>
                <TableHead style={{ backgroundColor: "#f6f6f6" }}>
                  <TableRow>
                    {columns.map((column) =>
                      column.id === "providerName" ? (
                        <TableCell
                          key={column.id}
                          align="center"
                          style={{ maxWidth: column.maxWidth }}
                        >
                          <TableSortLabel
                            active={orderBy === "firstName"}
                            direction={order}
                            onClick={() => handleRequestSort("firstName")}
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
                              {column.id === "stopNotification" ? (
                                <Checkbox
                                  checked={selectedIds?.includes(row?.id)}
                                  onChange={() => handleCheckboxChange(row?.id)}
                                />
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
                                    onClick={() => handleOpen(row?.id)}
                                  />
                                  <Button
                                    name="Edit"
                                    variant="outlined"
                                    size="small"
                                    onClick={() => {
                                      dispatch(physicianProfile(row?.id)).then(
                                        (response) => {
                                          if (
                                            response.type ===
                                            "physicianProfile/fulfilled"
                                          ) {
                                            navigate(AppRoutes.EDIT_PHYSICIAN);
                                          }
                                        },
                                      );
                                    }}
                                  />
                                </Box>
                              ) : column.id === "providerName" ? (
                                `${row?.["firstName"]} ${row?.["lastName"]}`
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
              count={providerInfoData?.count || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      </Box>
      <ContactProviderModal open={open} handleClose={handleClose} id={id} />
    </>
  );
};

export default ProviderInfo;
