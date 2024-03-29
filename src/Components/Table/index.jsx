import React, { useEffect, useState } from "react";
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
  Menu,
  Fade,
  TableSortLabel,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/system";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import "./table.css";
import { AppRoutes } from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { viewCase } from "../../redux/halloAPIs/viewReservationAPI";
import { viewNotes } from "../../redux/halloAPIs/viewNotesAPI";
import { getPatientName } from "../../redux/halloAPIs/getPatientNameAPI";
import { viewUpload } from "../../redux/halloAPIs/viewUploadAPI";
import { newState } from "../../redux/halloAPIs/newStateAPI";
import { getSendAgreement } from "../../redux/halloAPIs/sendAgreementAPI";
import { closeCaseView } from "../../redux/halloAPIs/closeCaseAPI";

const MyTable = ({ columns, dropDown, indicator, onClick, activeState }) => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [copiedStates, setCopiedStates] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rowId, setRowId] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Requested Date");
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const state = useSelector((state) => state.root.newState);
  const rows = state?.stateData;

  const { regions } = useSelector((state) => state.root.getRegionPhysician);

  useEffect(() => {
    setTableData(rows);
  }, [rows]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    setRowId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action) => {
    dispatch(getPatientName(rowId));
    setAnchorEl(null);
    switch (action) {
      case "Assign Case":
        onClick(action);
        break;
      case "Cancel Case":
        onClick(action);
        break;
      case "View Case":
        dispatch(viewCase(rowId));
        navigate(AppRoutes.VIEW_CASE);
        break;
      case "View Notes":
        dispatch(viewNotes(rowId));
        navigate(AppRoutes.VIEW_NOTES);
        break;
      case "Block Patient":
        onClick(action);
        break;
      case "View Upload":
        dispatch(
          viewUpload({ id: rowId, sortBy: "createdAt", orderBy: "ASC" }),
        );
        navigate(AppRoutes.VIEW_UPLOAD);
        break;
      case "Orders":
        navigate(AppRoutes.SEND_ORDER);
        break;
      case "Transfer":
        onClick(action);
        break;
      case "Clear Case":
        onClick(action, rowId);
        break;
      case "Send Agreement":
        dispatch(getSendAgreement(rowId));
        onClick(action);
        break;
      case "Close Case":
        dispatch(
          closeCaseView({ id: rowId, sortBy: "createdAt", orderBy: "ASC" }),
        );
        navigate(AppRoutes.CLOSE_CASE);
        break;
      default:
        break;
    }
  };

  const copyButtonText = (btnId, event) => {
    const textToCopy = event.target.innerText;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopiedStates((prev) => ({ ...prev, [btnId]: true }));
        toast.success("Copied Successfully");
        setTimeout(() => {
          setCopiedStates((prev) => ({ ...prev, [btnId]: false }));
        }, 1000);
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

  useEffect(() => {
    dispatch(
      newState({
        state: activeState,
        search: searchTerm,
        sortBy: orderBy,
        orderBy: order.toUpperCase(),
        region: regionFilter,
      }),
    );
  }, [activeState, dispatch, order, orderBy, regionFilter, searchTerm]);

  const filterByIndicator = (indicatorValue) => {
    if (indicatorValue === "all") return setTableData(rows);
    else {
      const filteredData = rows.filter((row) => {
        const lowerCaseString = row.Requestor.toLowerCase();
        return lowerCaseString.includes(indicatorValue.toLowerCase())
          ? true
          : false;
      });
      setTableData(filteredData);
    }
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
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
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
          </Box>
        </Grid>
        <Grid container justifyContent="flex-end" item xs={12} md={8} lg={6}>
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <Button
              name="All"
              variant="outlined"
              onClick={() => filterByIndicator("all")}
            />
            {indicator.map((value, index) => {
              return (
                <Box
                  key={index}
                  className="indicators"
                  onClick={() => filterByIndicator(value.name)}
                >
                  <span
                    className="indicator-point"
                    style={{
                      backgroundColor: value.color,
                    }}
                  ></span>
                  <Typography ml={1}>{value.name}</Typography>
                </Box>
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
                {columns.map((column) =>
                  column.id === "requestedDate" ||
                  column.id === "dateOfService" ? (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      <TableSortLabel
                        key={column.id}
                        active={orderBy === column.label}
                        direction={order}
                        onClick={() => handleRequestSort(column.label)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ) : (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ),
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row) => {
                  return (
                    <TableRow
                      key={row.id}
                      className={`requestor-${row.Requestor.toLowerCase()}`}
                    >
                      {columns.map((column) => {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "mail" ? (
                              <EmailOutlinedIcon
                                fontSize="medium"
                                sx={{
                                  border: "1px solid white",
                                  padding: "3px",
                                  borderRadius: "4px",
                                }}
                              />
                            ) : ["Phone", "Chat With", "Actions"].includes(
                                column.label,
                              ) ? (
                              <>
                                <Button
                                  className="phone-btn"
                                  name={
                                    column.label === "Phone"
                                      ? row[column.label]
                                      : column.id === "chatWith"
                                        ? "Provider"
                                        : column.label
                                  }
                                  startIcon={
                                    (column.id === "phoneNumber" && (
                                      <LocalPhoneOutlinedIcon />
                                    )) ||
                                    (column.id === "chatWith" && (
                                      <PersonOutlineOutlinedIcon />
                                    ))
                                  }
                                  variant="outlined"
                                  color="inherit"
                                  onClick={(e) => {
                                    column.id === "phoneNumber" &&
                                      copyButtonText(row.id, e);
                                    column.id === "action" &&
                                      handleClick(e, row.id);
                                  }}
                                />
                                {column.id === "phoneNumber" && (
                                  <div>({row.Requestor.split(" ")[0]})</div>
                                )}
                                {column.id === "phoneNumber" &&
                                  copiedStates[row.id]}
                                {column.id === "action" && (
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
                                    {dropDown.map((data) => {
                                      return (
                                        <MenuItem
                                          key={data.id}
                                          onClick={() => handleClose(data.name)}
                                          disableRipple
                                        >
                                          {data.icon}&nbsp;{data.name}
                                        </MenuItem>
                                      );
                                    })}
                                  </Menu>
                                )}
                              </>
                            ) : column.label === "Physician Name" ? (
                              row?.physician?.["Physician Name"]
                            ) : column.label === "Notes" ? (
                              activeState === "new" ? (
                                row["Patient Note"] === null ? (
                                  " - "
                                ) : (
                                  row["Patient Note"]
                                )
                              ) : row["Transfer Note"] === null ? (
                                " - "
                              ) : (
                                row["Transfer Note"]
                              )
                            ) : (
                              row[column.label]
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
          count={tableData?.length}
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
