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
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Input } from "../../Components/TextField/Input";
import { Button } from "../../Components/Button";
import { useSelector } from "react-redux";
import { columns, rows } from "../../constants/partnersDummyData";
import "./partners.css";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/routes";

const Partners = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [professionFilter, setProfessionFilter] = useState("all");
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("");
  const navigate = useNavigate();
  const { professions } = useSelector(
    (state) => state.root.getProfessionsBusiness,
  );
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
      <Box className="partner-main-container">
        <Container maxWidth="80%" className="partner-wrapper-container">
          <Typography variant="h5" gutterBottom pt={4}>
            <b>Vendor(s)</b>
          </Typography>
          <Paper className="partner-paper">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              mb={2}
            >
              <Box display="flex" alignItems="center" gap={3}>
                <Input
                  className="search-text"
                  placeholder="Search"
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
                      <MenuItem key={index} value={profession.profession}>
                        {profession.profession}
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
                                {column.label === "Actions" ? (
                                  <Box display="flex" gap={1}>
                                    <Button
                                      name="Edit"
                                      variant="outlined"
                                      onClick={() =>
                                        navigate(AppRoutes.ADD_BUSINESS)
                                      }
                                    />
                                    <Button name="Delete" variant="outlined" />
                                  </Box>
                                ) : (
                                  row[column.label]
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

export default Partners;
