import React, { useEffect, useState } from "react";
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
  TablePagination,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Input } from "../../Components/TextField/Input";
import { Button } from "../../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "../../constants/partnersDummyData";
import "./partners.css";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/routes";
import {
  deleteBusiness,
  getVendor,
  viewBusiness,
} from "../../redux/halloAPIs/adminAPIs/partnerAPIs/partnersAPI";
import { toast } from "react-toastify";
import { apiPending, apiSuccess } from "../../redux/halloSlices/apiStatusSlice";

const Partners = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [professionFilter, setProfessionFilter] = useState("all");
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(apiPending());
    dispatch(
      getVendor({
        page: pageNo,
        pageSize: rowsPerPage,
        search: searchTerm,
        professions: professionFilter,
      }),
    ).then((response) => {
      if (response.type === "getVendor/fulfilled") dispatch(apiSuccess());
    });
  }, [dispatch, pageNo, professionFilter, rowsPerPage, searchTerm]);

  const { vendorData } = useSelector((state) => state.root.partners);
  const { professions } = useSelector(
    (state) => state.root.getProfessionsBusiness,
  );

  useEffect(() => setTableData(vendorData?.rows), [vendorData]);

  const handleDeleteBusiness = (id) => {
    dispatch(apiPending());
    dispatch(deleteBusiness(id)).then((response) => {
      if (response.type === "deleteBusiness/fulfilled") {
        toast.success(response.payload.message);
        dispatch(getVendor({ page: pageNo, pageSize: rowsPerPage }));
        dispatch(apiSuccess());
      }
    });
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
      <Box className="partner-main-container">
        <Container maxWidth="80%" className="partner-wrapper-container">
          <Typography variant="h5" gutterBottom pt={4}>
            <b>Vendor(s)</b>
          </Typography>
          <Paper>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              mb={2}
              p={2}
              gap={2}
            >
              <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
                <Input
                  className="search-text"
                  placeholder="Vendor"
                  variant="outlined"
                  value={searchTerm}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Input
                  className="search-text drop-list"
                  placeholder="Search"
                  variant="outlined"
                  value={professionFilter}
                  select
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setProfessionFilter(e.target.value)}
                >
                  <MenuItem value="all">All Professions</MenuItem>
                  {professions?.map((profession, index) => {
                    return (
                      <MenuItem key={index} value={profession?.profession}>
                        {profession?.profession}
                      </MenuItem>
                    );
                  })}
                </Input>
              </Box>

              <Button
                name="Add Business"
                variant="outlined"
                startIcon={<AddOutlinedIcon />}
                onClick={() => navigate(AppRoutes.ADD_BUSINESS)}
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
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tableData?.map((row) => {
                    return (
                      <TableRow key={row?.id}>
                        {columns?.map((column) => {
                          return (
                            <TableCell key={column.id} align="center">
                              {column.id === "actions" ? (
                                <Box display="flex" gap={1}>
                                  <Button
                                    name="Edit"
                                    variant="outlined"
                                    onClick={() => {
                                      dispatch(viewBusiness(row?.id));
                                      navigate(AppRoutes.ADD_BUSINESS);
                                    }}
                                  />
                                  <Button
                                    name="Delete"
                                    variant="outlined"
                                    onClick={() =>
                                      handleDeleteBusiness(row?.id)
                                    }
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
              count={vendorData?.count || 0}
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

export default Partners;
