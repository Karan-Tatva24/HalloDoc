import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import { Button } from "../../Components/Button";
import { cards } from "../../constants/cardConst";
import MyTable from "../../Components/Table";
import {
  newColumns,
  newDropdown,
  indicator,
  pendingColumns,
  pendingDropdown,
  activeColumns,
  activeDropdown,
  concludeColumns,
  concludeDropdown,
  toCloseColumns,
  toCloseDropdown,
  unpaidColumns,
  unpaidDropdown,
} from "../../constants/tableData";
import "./dashboard.css";
import CancelModal from "../../Components/Modal/CancelModal";
import AssignModal from "../../Components/Modal/AssignModal";
import ConfirmBlockModal from "../../Components/Modal/ConfirmBlockModal";
import TransferRequest from "../../Components/Modal/TransferRequest";
import ClearCaseModal from "../../Components/Modal/ClearCaseModal";
import SendAgreementModal from "../../Components/Modal/SendAgreementModal";
import RequestSupportModal from "../../Components/Modal/RequestSupportModal";
import SendLinkModal from "../../Components/Modal/SendLinkModal";
import { useDispatch, useSelector } from "react-redux";
import { newState } from "../../redux/halloAPIs/newStateAPI";
import { getRegions } from "../../redux/halloAPIs/getRegionPhysicianAPI";
import { dashboardCount } from "../../redux/halloAPIs/dashboardCountAPI";
import { getProfession } from "../../redux/halloAPIs/getProfessionsBusinessAPI";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/routes";
import { exportAll, exportByState } from "../../redux/halloAPIs/exportAPI";
import { toast } from "react-toastify";

const DashBoard = () => {
  const [isActive, setIsActive] = useState(true);
  const [activeButton, setActiveButton] = useState("New");
  const [columns, setColumns] = useState(newColumns);
  const [dropDown, setDropDown] = useState(newDropdown);
  const [modalName, setModalName] = useState("");
  const [open, setOpen] = useState(false);
  const [rowId, setRowId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.root.dashboardCount);
  const counts = state?.dashboardCount;
  const handleOpen = (name, id) => {
    setModalName(name);
    setRowId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalName("");
  };

  const handleClick = (name) => {
    setActiveButton(name);
    setIsActive(true);
  };

  useEffect(() => {
    dispatch(getRegions());
    dispatch(dashboardCount());
    dispatch(getProfession());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      newState({
        state: activeButton.toLowerCase(),
        search: "",
        sortBy: "id",
        orderBy: "DESC",
        region: "all",
        page: 1,
        pageSize: 10,
      }),
    );
  }, [activeButton, dispatch, counts]);

  useEffect(() => {
    switch (activeButton) {
      case "New":
        setColumns(newColumns);
        setDropDown(newDropdown);
        break;
      case "Pending":
        setColumns(pendingColumns);
        setDropDown(pendingDropdown);
        break;
      case "Active":
        setColumns(activeColumns);
        setDropDown(activeDropdown);
        break;
      case "Conclude":
        setColumns(concludeColumns);
        setDropDown(concludeDropdown);
        break;
      case "To Close":
        setColumns(toCloseColumns);
        setDropDown(toCloseDropdown);
        break;
      case "UnPaid":
        setColumns(unpaidColumns);
        setDropDown(unpaidDropdown);
        break;
      default:
        setColumns(newColumns);
        setDropDown(newDropdown);
    }
  }, [activeButton]);

  return (
    <>
      <Box>
        <Box className="dashboard-container">
          <Grid container spacing={{ xs: 2, sm: 3, md: 3, lg: 4 }}>
            {cards.map((card, index) => {
              return (
                <Grid
                  key={index}
                  container
                  justifyContent="center"
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={2}
                >
                  <Button
                    color={card.color}
                    variant={
                      isActive && activeButton === card.applicationState
                        ? "contained"
                        : "outlined"
                    }
                    className="card-btn"
                    fullWidth
                    onClick={() => handleClick(card.applicationState)}
                  >
                    <Box className="card-content-heading">
                      {card.icon}
                      <Typography variant="body1">
                        {card.applicationState}
                      </Typography>
                    </Box>
                    {counts?.map((count, index) => {
                      return (
                        <Typography variant="h5" key={index}>
                          {count.caseTag === card.applicationState && (
                            <b>{count.count}</b>
                          )}
                        </Typography>
                      );
                    })}
                  </Button>
                  {isActive && activeButton === card.applicationState ? (
                    <img
                      src={card.toolTip}
                      alt="triangle"
                      className="btn-triangle"
                    />
                  ) : null}
                </Grid>
              );
            })}
          </Grid>
          <Box className="dashboard-text-btn">
            <Grid
              container
              justifyContent="space-between"
              alignItems="baseline"
              spacing={{ xs: 2, sm: 3, md: 3, lg: 4 }}
            >
              <Grid item xs={12} lg={5}>
                <Typography variant="h5">
                  Patients<span className="state">({activeButton})</span>
                </Typography>
              </Grid>
              <Grid item xs={12} lg={7}>
                <Box className="dashboard-btn">
                  <Button
                    name="Send Link"
                    variant="contained"
                    startIcon={<SendOutlinedIcon />}
                    onClick={() => handleOpen("Send Link")}
                  />
                  <Button
                    name="Create Request"
                    variant="contained"
                    startIcon={<RequestPageOutlinedIcon />}
                    onClick={() =>
                      navigate(AppRoutes.CREATE_REQUEST_ADMIN_PHYSICIAN)
                    }
                  />
                  <Button
                    name="Export"
                    variant="contained"
                    startIcon={<SendOutlinedIcon />}
                    onClick={() => {
                      dispatch(exportByState(activeButton.toLowerCase()))
                        .then((response) => {
                          if (response.type === "exportByState/fulfilled") {
                            const blob = new Blob([response.payload], {
                              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            });
                            const url = window.URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = url;
                            link.download = `${activeButton}State-patients.xlsx`;
                            document.body.appendChild(link);
                            link.click();
                            window.URL.revokeObjectURL(url);
                            link.remove();
                            toast.success(response.payload.message);
                          } else {
                            toast.error("File download failed.");
                          }
                        })
                        .catch((error) => {
                          toast.error("Error downloading file:", error);
                        });
                    }}
                  />
                  <Button
                    name="Export All"
                    variant="contained"
                    startIcon={<SendOutlinedIcon />}
                    onClick={() =>
                      dispatch(exportAll())
                        .then((response) => {
                          if (response.type === "exportAll/fulfilled") {
                            const blob = new Blob([response.payload], {
                              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            });
                            const url = window.URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = url;
                            link.download = `all-patients.xlsx`;
                            document.body.appendChild(link);
                            link.click();
                            window.URL.revokeObjectURL(url);
                            link.remove();
                            toast.success(response.payload.message);
                          } else {
                            toast.error("File download failed.");
                          }
                        })
                        .catch((error) => {
                          toast.error("Error downloading file:", error);
                        })
                    }
                  />
                  <Button
                    name="Request DTY Support"
                    variant="contained"
                    startIcon={<SendOutlinedIcon />}
                    onClick={() => handleOpen("Request Support")}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <MyTable
            columns={columns}
            dropDown={dropDown}
            indicator={indicator}
            activeState={activeButton.toLowerCase()}
            onClick={handleOpen}
          />
        </Box>
      </Box>
      <RequestSupportModal
        open={open && modalName === "Request Support"}
        handleClose={handleClose}
      />
      <SendLinkModal
        open={open && modalName === "Send Link"}
        handleClose={handleClose}
      />
      <CancelModal
        open={open && modalName === "Cancel Case"}
        handleClose={handleClose}
      />
      <ConfirmBlockModal
        open={open && modalName === "Block Patient"}
        handleClose={handleClose}
      />
      <AssignModal
        open={open && modalName === "Assign Case"}
        handleClose={handleClose}
      />
      <TransferRequest
        open={open && modalName === "Transfer"}
        handleClose={handleClose}
      />
      <SendAgreementModal
        open={open && modalName === "Send Agreement"}
        handleClose={handleClose}
      />
      <ClearCaseModal
        open={open && modalName === "Clear Case"}
        handleClose={handleClose}
        rowId={rowId}
      />
    </>
  );
};

export default DashBoard;
