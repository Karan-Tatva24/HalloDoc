import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import { Button } from "../../Components/Button";
import { cards } from "../../constants/cardConst";
import MyTable from "../../Components/Table";
import {
  rows,
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

const DashBoard = () => {
  const [isActive, setIsActive] = useState(true);
  const [activeButton, setActiveButton] = useState(0);
  const [columns, setColumns] = useState(newColumns);
  const [dropDown, setDropDown] = useState(newDropdown);
  const [modalName, setModalName] = useState("");
  const [open, setOpen] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [filterRows, setFilterRows] = useState(rows);

  const handleOpen = (name, id) => {
    setModalName(name);
    setRowId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalName("");
  };

  const handleClear = (id) => {
    setFilterRows((prevRows) => prevRows.filter((row) => id !== row.id));
    handleClose();
  };

  const handleClick = (index) => {
    setActiveButton(index);
    setIsActive(true);
  };

  useEffect(() => {
    switch (activeButton) {
      case 0:
        setColumns(newColumns);
        setDropDown(newDropdown);
        break;
      case 1:
        setColumns(pendingColumns);
        setDropDown(pendingDropdown);
        break;
      case 2:
        setColumns(activeColumns);
        setDropDown(activeDropdown);
        break;
      case 3:
        setColumns(concludeColumns);
        setDropDown(concludeDropdown);
        break;
      case 4:
        setColumns(toCloseColumns);
        setDropDown(toCloseDropdown);
        break;
      case 5:
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
                      isActive && activeButton === index
                        ? "contained"
                        : "outlined"
                    }
                    className="card-btn"
                    fullWidth
                    onClick={() => handleClick(index)}
                  >
                    <Box className="card-content-heading">
                      {card.icon}
                      <Typography variant="body1">
                        {card.applicationState}
                      </Typography>
                    </Box>
                    <Typography variant="h5">
                      <b>{card.figure}</b>
                    </Typography>
                  </Button>
                  {isActive && activeButton === index ? (
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
                  Patients<span className="state">(New)</span>
                </Typography>
              </Grid>
              <Grid item xs={12} lg={7}>
                <Box className="deshboard-btn">
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
                  />
                  <Button
                    name="Export"
                    variant="contained"
                    startIcon={<SendOutlinedIcon />}
                  />
                  <Button
                    name="Export All"
                    variant="contained"
                    startIcon={<SendOutlinedIcon />}
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
            rows={filterRows}
            columns={columns}
            dropDown={dropDown}
            indicator={indicator}
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
        handleClear={handleClear}
        rowId={rowId}
      />
    </>
  );
};

export default DashBoard;
