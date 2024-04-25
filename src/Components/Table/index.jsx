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
import { viewCase } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/viewReservationAPI";
import { viewNotes } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/viewNotesAPI";
import { getPatientName } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/getPatientNameAPI";
import { newState } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/newStateAPI";
import { getSendAgreement } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/sendAgreementAPI";
import { closeCaseView } from "../../redux/halloAPIs/adminAPIs/dashboardAPIs/closeCaseAPI";
import { getDashboardByState } from "../../redux/halloAPIs/providerAPIs/dashboardAPIs/getDashboardByStateAPI";
import { acceptRequest } from "../../redux/halloAPIs/providerAPIs/dashboardAPIs/acceptRequestAPI";
import { getProviderDashboardCount } from "../../redux/halloAPIs/providerAPIs/dashboardAPIs/getProviderDashboardCount";
import { houseCallType } from "../../redux/halloAPIs/providerAPIs/dashboardAPIs/encounterAPI";

const MyTable = ({
  accountType,
  counts,
  stateColumns,
  stateDropDown,
  indicator,
  onClick,
  activeState,
}) => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState(stateColumns);
  const [dropdown, setDropdown] = useState(stateDropDown);
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [requestType, setRequestType] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [copiedStates, setCopiedStates] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowId, setRowId] = useState(null);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("Requested Date");
  const [pageNo, setPageNo] = useState(1);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  useEffect(() => {
    setPage(0);
    setPageNo(1);
    setRowsPerPage(10);
  }, [activeState]);

  useEffect(() => {
    setColumns(
      stateColumns?.filter((column) =>
        column.accountTypes.includes(accountType),
      ),
    );
  }, [accountType, stateColumns]);

  useEffect(() => {
    setDropdown(
      stateDropDown?.filter((dropdown) =>
        dropdown.accountTypes?.includes(accountType),
      ),
    );
  }, [accountType, stateDropDown]);

  const { stateData } = useSelector((state) => state.root.newState);
  const { providerStateData } = useSelector(
    (state) => state.root.dashboardByState,
  );

  const { regions } = useSelector((state) => state.root.getRegionPhysician);

  useEffect(() => {
    accountType === "Admin"
      ? setTableData(stateData?.rows)
      : setTableData(providerStateData?.rows);
  }, [accountType, providerStateData, stateData]);

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
    dispatch(getPatientName(rowId)).then((response) => {
      if (response.type === "getPatientName/fulfilled") {
        setAnchorEl(null);
        switch (action) {
          case "Accept":
            dispatch(acceptRequest(rowId)).then((response) => {
              if (response.type === "acceptRequest/fulfilled") {
                toast.success(response.payload.message);
                dispatch(getProviderDashboardCount());
              }
            });
            break;
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
          case "Type Of Care":
            onClick(action, rowId);
            break;
          case "Conclude Care":
            navigate(AppRoutes.CONCLUDE_CARE);
            break;
          case "Encounter Form":
            navigate(AppRoutes.ENCOUNTER_FORM);
            break;
          case "Encounter Modal":
            onClick(action, rowId);
            break;
          default:
            break;
        }
      }
    });
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
    if (newPage > page) setPageNo(pageNo + 1);
    else if (newPage < page) setPageNo(pageNo - 1);
    else setPageNo(1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (accountType === "Admin") {
      dispatch(
        newState({
          state: activeState,
          search: searchTerm,
          sortBy: orderBy,
          orderBy: order.toUpperCase(),
          region: regionFilter,
          requestType: requestType,
          page: pageNo,
          pageSize: rowsPerPage,
        }),
      );
    } else if (accountType === "Physician") {
      dispatch(
        getDashboardByState({
          state: activeState,
          search: searchTerm,
          requestType: requestType,
          page: pageNo,
          pageSize: rowsPerPage,
        }),
      );
    }
  }, [
    accountType,
    activeState,
    counts,
    dispatch,
    order,
    orderBy,
    pageNo,
    regionFilter,
    requestType,
    rowsPerPage,
    searchTerm,
  ]);

  return (
    <Paper className="my-table-container">
      <Grid
        container={true}
        alignItems="center"
        justifyContent="space-between"
        className="table-head"
        flexWrap="wrap"
        spacing={{ xs: 2, md: 2 }}
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
            {accountType === "Admin" ? (
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
                    <MenuItem key={region?.id} value={region?.name}>
                      {region?.name}
                    </MenuItem>
                  );
                })}
              </Input>
            ) : null}
          </Box>
        </Grid>
        <Grid
          container
          justifyContent="flex-end"
          item
          xs={12}
          md={8}
          lg={6}
          pb={2}
          gap={2}
        >
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <Button
              name="All"
              variant="outlined"
              onClick={() => setRequestType("all")}
            />
            {indicator?.map((value, index) => {
              return (
                <Box
                  key={index}
                  className="indicators"
                  onClick={() => setRequestType(value.name)}
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
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) =>
                  column.id === "requestedDate" ||
                  column.id === "dateOfService" ? (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.maxWidth,
                        backgroundColor: "#f6f6f6",
                      }}
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
                      style={{
                        minWidth: column.maxWidth,
                        backgroundColor: "#f6f6f6",
                      }}
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
                  <TableRow
                    key={row?.id}
                    className={`requestor-${row?.["Requestor Type"]?.toLowerCase()}`}
                  >
                    {columns.map((column) => {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className={`${column.id}`}
                        >
                          {column.id === "mail" ? (
                            <EmailOutlinedIcon
                              fontSize="large"
                              sx={{
                                border: "1px solid white",
                                padding: "3px",
                                borderRadius: "4px",
                              }}
                            />
                          ) : column.label === "Phone" ? (
                            <>
                              <Button
                                className="phone-btn"
                                name={row?.Phone}
                                variant="outlined"
                                color="inherit"
                                startIcon={<LocalPhoneOutlinedIcon />}
                                onClick={(e) => copyButtonText(row?.id, e)}
                              />
                              <div>(Patient)</div>
                              {row?.["Requestor Type"] !== "Patient" && (
                                <>
                                  <Button
                                    className="phone-btn"
                                    name={row?.requestorPhoneNumber}
                                    variant="outlined"
                                    color="inherit"
                                    startIcon={<LocalPhoneOutlinedIcon />}
                                    onClick={(e) => copyButtonText(row?.id, e)}
                                  />
                                  <div>({row?.["Requestor Type"]})</div>
                                </>
                              )}
                              {copiedStates[row?.id]}
                            </>
                          ) : column.id === "callType" ? (
                            row?.callType ? (
                              <Button
                                name={row?.callType}
                                onClick={() =>
                                  dispatch(houseCallType(row.id)).then(
                                    (response) => {
                                      if (
                                        response.type ===
                                        "houseCallType/fulfilled"
                                      ) {
                                        dispatch(getProviderDashboardCount());
                                      }
                                    },
                                  )
                                }
                              />
                            ) : (
                              " - "
                            )
                          ) : column.label === "Actions" ? (
                            <>
                              <Button
                                className="phone-btn"
                                name={
                                  column.id === "chatWith"
                                    ? "Provider"
                                    : column.label
                                }
                                startIcon={
                                  column.id === "chatWith" && (
                                    <PersonOutlineOutlinedIcon />
                                  )
                                }
                                variant="outlined"
                                color="inherit"
                                onClick={(e) => {
                                  column.id === "action" &&
                                    handleClick(e, row.id);
                                }}
                              />
                              {column.id === "action" && (
                                <Menu
                                  id="fade-menu"
                                  MenuListProps={{
                                    "aria-labelledby": "fade-button",
                                  }}
                                  anchorEl={anchorEl}
                                  open={open && row?.id === rowId}
                                  onClose={handleClose}
                                  TransitionComponent={Fade}
                                >
                                  {dropdown?.map((data) => {
                                    return (
                                      <MenuItem
                                        key={data.id}
                                        onClick={() => {
                                          data.name === "Encounter"
                                            ? accountType === "Admin"
                                              ? handleClose("Encounter Form")
                                              : row?.medicalReport?.isFinalize
                                                ? handleClose("Encounter Modal")
                                                : row?.callType
                                                  ? handleClose(
                                                      "Encounter Form",
                                                    )
                                                  : handleClose("Type Of Care")
                                            : handleClose(data.name);
                                        }}
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
                            row?.physician ? (
                              row?.physician?.["Physician Name"]
                            ) : (
                              " - "
                            )
                          ) : column.label === "Notes" ? (
                            activeState === "new" ? (
                              row?.["Patient Note"] === null ? (
                                " - "
                              ) : (
                                row?.["Patient Note"]
                              )
                            ) : row?.["Transfer Note"] === null ? (
                              " - "
                            ) : (
                              row?.["Transfer Note"]
                            )
                          ) : (
                            row?.[column.label]
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
          count={
            (accountType === "Admin"
              ? stateData?.count
              : providerStateData?.count) || 0
          }
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Paper>
  );
};

export default MyTable;
