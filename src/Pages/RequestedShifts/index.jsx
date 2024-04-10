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
import { useSelector } from "react-redux";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/TextField/Input";

const rows = [
  {
    id: 1,
    staff: "Nikung Agola",
    day: "Dec 09, 2023",
    time: "8:15 PM- 9:15 PM",
    region: "New York",
  },
  {
    id: 2,
    staff: "Bhavesh bhai Agola",
    day: "Dec 10, 2023",
    time: "8:15 PM- 9:15 PM",
    region: "USA",
  },
  {
    id: 3,
    staff: "Chagan bhai Agola",
    day: "Dec 11, 2023",
    time: "8:15 PM- 9:15 PM",
    region: "Thailand",
  },
];

const RequestedShifts = () => {
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("staff");
  const [selectRegion, setSelectRegion] = useState("all");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = useState([]);
  const { regions } = useSelector((state) => state.root.getRegionPhysician);
  const navigate = useNavigate();

  useEffect(() => setTableData(rows), []);

  const handleAdditionalFilterChange = (event) => {
    setSelectRegion(event.target.value);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row.id);
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

  const descendingComparator = (a, b) => {
    if (b < a) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
              size="small"
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => navigate(-1)}
              className="back-btn"
            />
          </Box>

          <Paper className="request-shifts-container">
            <Box display="flex" justifyContent="space-between" pb={4}>
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
                    <MenuItem key={region.id} value={region.name}>
                      {region.name}
                    </MenuItem>
                  );
                })}
              </Input>
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button name="View Current Month Shifts" color="success" />
                <Button name="Approved Selected" color="success" />
                <Button name="Delete Selected" color="error" />
              </Box>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={
                          selected.length > 0 && selected.length < rows.length
                        }
                        checked={selected.length === rows.length}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    <TableCell className="staff-cl">
                      <TableSortLabel
                        active={orderBy === "staff"}
                        direction={order}
                        onClick={() => handleRequestSort("staff")}
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
                  {stableSort(rows, getComparator(order, orderBy)).map(
                    (row) => (
                      <TableRow key={row.id} hover>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected(row.id)}
                            onClick={(event) => handleClick(event, row.id)}
                          />
                        </TableCell>
                        <TableCell>{row.staff}</TableCell>
                        <TableCell>{row.day}</TableCell>
                        <TableCell>{row.time}</TableCell>
                        <TableCell>{row.region}</TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={tableData?.length}
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
