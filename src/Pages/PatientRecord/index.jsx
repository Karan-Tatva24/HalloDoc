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
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { Button } from "../../Components/Button";
import { columns, rows } from "../../constants/patientRecordData";
import "./patientRecord.css";
import { useNavigate } from "react-router-dom";

const PatientRecord = () => {
  const [tableData, setTableData] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  useEffect(() => setTableData(rows), []);

  const handleClick = (event, id) => {
    setRowId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
                                {column.id === "actions" ? (
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
                                      open={open && row.id === rowId}
                                      onClose={handleClose}
                                      TransitionComponent={Fade}
                                    >
                                      <MenuItem
                                        disableRipple
                                        onClick={handleClose}
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
                                        onClick={handleClose}
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
                                ) : (
                                  row[column.id]
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

export default PatientRecord;
