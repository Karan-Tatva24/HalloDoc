import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  MenuItem,
  TablePagination,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { Box } from "@mui/system";
import { Input } from "../TextField/Input";
import { Button } from "../Button/Button";
import "./table.css";

const MyTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("name");
  const [filterCategory, setFilterCategory] = useState("");
  const [additionalFilter, setAdditionalFilter] = useState("all");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [copied, setCopied] = useState(false);

  const copyButtonText = (event) => {
    const textToCopy = event.target.innerText;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setTimeout(() => setCopied(false), 1000);
      })
      .catch((err) => console.error("Error copying text: ", err));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterRows = (rows, term) => {
    return rows.filter((row) =>
      Object.values(row).some(
        (value) =>
          value && value.toString().toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const rows = [
    {
      name: `John Doe`,
      mail: <MarkEmailUnreadOutlinedIcon />,
      dateOfBirth: "Jun 16, 2023 (0)",
      requestor: "Patient John Doe",
      requestedDate: "Nov 20, 2023 335h 2m 02m ",
      phoneNumber: (
        <>
          <Button
            className="phone-btn"
            name="+1287834888"
            startIcon={<LocalPhoneOutlinedIcon />}
            variant="outlined"
            color="inherit"
            onClick={copyButtonText}
          />
          {copied && <p>copied!</p>}
        </>
      ),
      address: "Room location : 101",
      notes: "- ",
      chatWith: (
        <Button
          className="phone-btn"
          name="Provider"
          startIcon={<PersonOutlineOutlinedIcon />}
          variant="outlined"
          color="inherit"
        />
      ),
      action: (
        <Button
          name="Actions"
          variant="outlined"
          color="inherit"
          className="phone-btn"
        />
      ),
    },
    {
      name: "Jane Smith",
      mail: <MarkEmailUnreadOutlinedIcon />,
      dateOfBirth: "1985-08-22",
      requestor: "Patient",
      requestedDate: "2024-02-14",
      phoneNumber: (
        <>
          <Button
            className="phone-btn"
            name="+1287834888"
            startIcon={<LocalPhoneOutlinedIcon />}
            variant="outlined"
            color="inherit"
            onClick={copyButtonText}
          />
          {copied && <p>copied!</p>}
        </>
      ),
      address: "456 Oak St, Townsville",
      notes: "- ",
      chatWith: (
        <Button
          className="phone-btn"
          name="Provider"
          startIcon={<PersonOutlineOutlinedIcon />}
          variant="outlined"
          color="inherit"
        />
      ),
      action: (
        <Button
          name="Actions"
          variant="outlined"
          color="inherit"
          className="phone-btn"
        />
      ),
    },
    {
      name: "Bob Johnson",
      mail: <MarkEmailUnreadOutlinedIcon />,
      dateOfBirth: "1978-11-30",
      requestor: "business Department",
      requestedDate: "2024-02-13",
      phoneNumber: (
        <>
          <Button
            className="phone-btn"
            name="+1287834888"
            startIcon={<LocalPhoneOutlinedIcon />}
            variant="outlined"
            color="inherit"
            onClick={copyButtonText}
          />
          {copied && <p>copied!</p>}
        </>
      ),
      address: "789 Pine St, Villagetown",
      notes: "- ",
      chatWith: (
        <Button
          className="phone-btn"
          name="Provider"
          startIcon={<PersonOutlineOutlinedIcon />}
          variant="outlined"
          color="inherit"
        />
      ),
      action: (
        <Button
          name="Actions"
          variant="outlined"
          color="inherit"
          className="phone-btn"
        />
      ),
    },
    {
      name: "Alice Brown",
      mail: <MarkEmailUnreadOutlinedIcon />,
      dateOfBirth: "1995-04-18",
      requestor: "concierge Department",
      requestedDate: "2024-02-12",
      phoneNumber: (
        <>
          <Button
            className="phone-btn"
            name="+1287834888"
            startIcon={<LocalPhoneOutlinedIcon />}
            variant="outlined"
            color="inherit"
            onClick={copyButtonText}
          />
          {copied && <p>copied!</p>}
        </>
      ),
      address: "101 Elm St, Hamletville",
      notes: "Client-related request",
      chatWith: (
        <Button
          className="phone-btn"
          name="Provider"
          startIcon={<PersonOutlineOutlinedIcon />}
          variant="outlined"
          color="inherit"
        />
      ),
      action: (
        <Button
          name="Actions"
          variant="outlined"
          color="inherit"
          className="phone-btn"
        />
      ),
    },
    {
      name: "Charlie Davis",
      mail: <MarkEmailUnreadOutlinedIcon />,
      dateOfBirth: "1982-07-25",
      requestor: "vip Department",
      requestedDate: "2024-02-11",
      phoneNumber: (
        <>
          <Button
            className="phone-btn"
            name="+1287834888"
            startIcon={<LocalPhoneOutlinedIcon />}
            variant="outlined"
            color="inherit"
            onClick={copyButtonText}
          />
          {copied && <p>copied!</p>}
        </>
      ),
      address: "202 Maple St, Countryside",
      notes: "- ",
      chatWith: (
        <Button
          className="phone-btn"
          name="Provider"
          startIcon={<PersonOutlineOutlinedIcon />}
          variant="outlined"
          color="inherit"
        />
      ),
      action: (
        <Button
          name="Actions"
          variant="outlined"
          color="inherit"
          className="phone-btn"
        />
      ),
    },
  ];

  const columns = [
    { id: "name", label: "Name", minWidth: 200 },
    { id: "mail", label: "", minWidth: 10 },
    { id: "dateOfBirth", label: "Date Of Birth", minWidth: 100 },
    {
      id: "requestor",
      label: "Requestor",
      align: "right",
      maxWidth: 100,
    },
    {
      id: "requestedDate",
      label: "Requested Date",
      maxWidth: 95,
      align: "right",
    },
    {
      id: "phoneNumber",
      label: "Phone",
      maxWidth: 175,
      align: "right",
    },
    {
      id: "address",
      label: "Address",
      minWidth: 250,
      align: "right",
    },
    {
      id: "notes",
      label: "Notes",
      minWidth: 130,
      align: "right",
    },
    {
      id: "chatWith",
      label: "Chat With",
      minWidth: 100,
      align: "right",
    },
    {
      id: "action",
      label: "Actions",
      minWidth: 100,
      align: "right",
    },
  ];

  const indicator = [
    { name: "Patient", color: "green" },
    { name: "Family/Freind", color: "orange" },
    { name: "Business", color: "Pink" },
    { name: "Concierge", color: "blue" },
    { name: "VIP", color: "purple" },
  ];

  const filteredData = filterRows(rows, searchTerm);

  const handleCategoryChange = (event, newFilterCategory) => {
    setFilterCategory(newFilterCategory);
  };

  const handleAdditionalFilterChange = (event) => {
    setAdditionalFilter(event.target.value);
  };

  return (
    <div className="my-table-container">
      <Grid
        container={true}
        alignItems="center"
        justifyContent="space-between"
        className="table-head"
        flexWrap="wrap"
      >
        <Grid item xs={12} md={4} lg={6}>
          <Box className="search-dropdown">
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
              select
              placeholder="All Regions"
              onChange={handleAdditionalFilterChange}
              value={additionalFilter}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="address">Address</MenuItem>
              <MenuItem value="notes">Notes</MenuItem>
            </Input>
          </Box>
        </Grid>
        <Grid container justifyContent={"flex-end"} item xs={12} md={8} lg={6}>
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <Button name="All" variant="outlined" />

            {indicator.map((value, index) => {
              return (
                <React.Fragment key={index}>
                  <span
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: value.color,
                      display: "inline-block",
                      marginLeft: "30px",
                    }}
                  ></span>
                  <Typography ml={1}>{value.name}</Typography>
                </React.Fragment>
              );
            })}
          </Box>
        </Grid>
      </Grid>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    className={`requestor-${row.requestor.toLowerCase()}`}
                  >
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={index} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default MyTable;
